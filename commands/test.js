import { SlashCommandBuilder } from 'discord.js';

// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test');

// Execute function export
export async function execute(interaction) {
    await interaction.reply('Nigger!💖');
}