import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";

const testCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command")
        .addStringOption(option => {
            return option
                .setName("content")
                .setDescription("this is a parameter for a command")
                .setRequired(false);
        }),
    execute: async (interaction) => {
        const options: { [key: string]: string | number | boolean } = {};
        for (let i = 0; i < interaction.options.data.length; i++) {
            const element = interaction.options.data[i];
            if (element.name && element.value) options[element.name] = element.value;
        }

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Response Title" })
                    .setDescription(`👋 Hi! 
                    Your ping: ${interaction.client.ws.ping}
                    Your input: ${options.content}`)
            ]
        })
    },
    cooldown: 3
}

export default testCommand;