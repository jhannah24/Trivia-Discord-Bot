import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as test from './commands/test.js';
import * as trivia from './commands/trivia.js';
import * as kaicenat from './commands/kaicenat.js';

config();

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// When the client is ready, run this code
client.once(Events.ClientReady, readyDiscord);

// Set up interaction listener after client is initialized
client.on(Events.InteractionCreate, handleInteraction);

// Login to Discord with client token
client.login(process.env.TOKEN);

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'test') {
        await test.execute(interaction);
    } else if (interaction.commandName === 'trivia') {
        await trivia.execute(interaction);
    } else if (interaction.commandName === 'kaicenat') {
        await kaicenat.execute(interaction);
    }
}

function readyDiscord() {
    console.log('💖 Bot is online!');
}