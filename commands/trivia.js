import axios from 'axios';
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import he from 'he';
import pkg from 'pg';

const { Client } = pkg;

// Initialize PostgreSQL client
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("sslmode=require") ? { rejectUnauthorized: false } : false
});
client.connect().catch(err => console.error('Database connection error:', err));

// Ensure the scores table exists
client.query(`
    CREATE TABLE IF NOT EXISTS scores (
        user_id TEXT PRIMARY KEY,
        correct_answers INT DEFAULT 0,
        total_questions INT DEFAULT 0
    );
`).catch(err => console.error('Error creating table:', err));

export const data = new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Get a random trivia question');

export async function execute(interaction) {
    await interaction.deferReply();

    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const trivia = response.data.results[0];

        const question = he.decode(trivia.question);
        const correctAnswer = he.decode(trivia.correct_answer);
        const answers = [...trivia.incorrect_answers.map(he.decode), correctAnswer];
        answers.sort(() => Math.random() - 0.5);

        const buttons = answers.map((answer, index) => 
            new ButtonBuilder()
                .setCustomId(`trivia_${index}`)
                .setLabel(answer)
                .setStyle(ButtonStyle.Primary)
        );

        const row = new ActionRowBuilder().addComponents(buttons);
        await interaction.editReply({ content: `**Trivia Question:**\n${question}`, components: [row] });

        const filter = (btnInteraction) => btnInteraction.user.id !== interaction.client.user.id;
        const collected = await interaction.channel.awaitMessageComponent({ filter, time: 15000 }).catch(() => null);

        if (!collected) {
            await interaction.editReply({ content: `⏳ Time's up! The correct answer was: **${correctAnswer}**`, components: [] });
            return;
        }

        const userId = collected.user.id;
        let isCorrect = collected.customId === `trivia_${answers.indexOf(correctAnswer)}`;
        
        // Update user score
        await client.query(
            `INSERT INTO scores (user_id, correct_answers, total_questions)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id) DO UPDATE 
            SET correct_answers = scores.correct_answers + $2,
                total_questions = scores.total_questions + $3;`,
            [userId, isCorrect ? 1 : 0, 1]
        );

        // Fetch updated score
        const scoreResult = await client.query(`SELECT correct_answers, total_questions FROM scores WHERE user_id = $1`, [userId]);
        const { correct_answers = 0, total_questions = 0 } = scoreResult.rows[0] || {};

        // Respond with result
        if (isCorrect) {
            await collected.update({ content: `✅ ${collected.user} answered correctly! The answer was: **${correctAnswer}**\nYour score: **${correct_answers} out of ${total_questions}**`, components: [] });
        } else {
            await collected.update({ content: `❌ ${collected.user} answered wrong! The correct answer was: **${correctAnswer}**\nYour score: **${correct_answers} out of ${total_questions}**`, components: [] });
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply('Oops! Something went wrong fetching the trivia question.');
    }
}