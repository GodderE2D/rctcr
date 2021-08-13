import { CommandInteraction, Client, MessageEmbed } from 'discord.js';

export const name = 'ping';
export const description = 'Returns all commands or information on a specific command.';
export const category = 'General';
export const guildOnly = false;
export const cooldown = 10;
export const data = {
    type: 'CHAT_INPUT',
    name: 'help',
    description: 'Get external resources on RCTCR.',
};
export const execute = async (interaction: CommandInteraction, client: Client) => {
    const embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setAuthor('RCTCR Resources')
        .addField('Website', '**[Website](https://www.rctcr.tk)**\n**[Documentation](https://www.rctcr.tk/docs)**\n**[Guide](https://www.rctcr.tk/guide)**', true)
        .addField('Bot', '**[Invite](https://www.rctcr.tk/invite)**\n**[Discord Server](https://www.rctcr.tk/discord)**', true)
        .addField('External', '**[GitHub](https://www.rctcr.tk/github)**\n**[GH Issues](https://www.github.com/GodderE2D/rctcr/issues)**\n**[GH Pull Requests](https://www.github.com/GodderE2D/rctcr/pulls)**', true);
    
    if (interaction.user) {};
};