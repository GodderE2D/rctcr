import { CommandInteraction, Client, MessageEmbed } from 'discord.js';

export const name = 'ping';
export const description = 'Pong! Returns my response time to Discord.';
export const category = 'General';
export const guildOnly = false;
export const cooldown = 10;
export const data = {
    type: 'CHAT_INPUT',
    name: 'ping',
    description: 'Pong! Returns my response time to Discord.',
};
export const execute = async (interaction: CommandInteraction, client: Client) => {
    const firstEmbed = new MessageEmbed()
        .setColor('BLURPLE')
        .setDescription(`🏓 **Pong!**\nWebsocket heartbeat: \`${client.ws.ping}ms\``)
        .setFooter('Awaiting roundtrip latency...');

    await interaction.reply({ embeds: [firstEmbed], fetchReply: true });
    const sent = await interaction.fetchReply();

    const secondEmbed = new MessageEmbed()
    .setColor('BLURPLE')
    // @ts-expect-error
    .setDescription(`🏓 **Pong!**\nWebsocket heartbeat: \`${client.ws.ping}ms\`\nRoundtrip latency: \`${Math.floor(new Date(sent.timestamp) - interaction.createdTimestamp)}ms\``);

    interaction.editReply({ embeds: [secondEmbed] });
};