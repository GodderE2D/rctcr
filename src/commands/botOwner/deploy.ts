import { CommandInteraction, Client, MessageEmbed } from 'discord.js';
import fs from 'fs';
import path from 'path';

export const name = 'deploy';
export const description = 'Deploys slash commands using slash commands.';
export const category = 'Bot Owner';
export const guildOnly = false;
export const cooldown = 1;
// export const data = {
//     type: 'CHAT_INPUT',
//     name: 'deploy',
//     description: 'Deploys slash commands using slash commands.',
// };
export const execute = async (interaction: CommandInteraction, client: Client) => {
    if (!client.application?.owner) await client.application?.fetch();

    const data = [];
    const commandsDeployed = [];
    
    const commandFolders = fs.readdirSync(path.join(__dirname, '/../../commands'));
    
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `/../../commands/${folder}`)).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            let noErrors = true;
            let command: any;
            try {
                command = require(`../../commands/${folder}/${file}`);
            } catch (error) {
                noErrors = false;
                console.info(`${folder}/${file} is not a module, and has been skipped! ${noErrors} ${error}`);
            };
            if (noErrors === true && command.data) {
                data.push(command.data);
                commandsDeployed.push(command.name);
            };
        };
    };

    try {
        const commands = await client?.application?.commands.set(data);
        console.log('Deployment successful!', commands);

        const embed = new MessageEmbed()
            .setColor('#00a693')
            .setDescription('<:greentick:869473395937513473> Deployment has been successful! You can now use all commands listed below as slash commands.')
            .addField(`Deployed Commands (${commandsDeployed.length})`, `\`${commandsDeployed.join('`, `')}\``);

        interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Deployment failed!', error);
        const errorEmbed = new MessageEmbed()
            .setColor('#e32636')
            .setDescription('<:redtick:869473456218058772> There was an error when attempting to deploy slash commands.')
            .addField(`Deployment Queue (${commandsDeployed.length})`, `\`${commandsDeployed.join('`, `')}\``)
            .addField('Error Message', `\`\`\`js\n${error}\`\`\``);

        interaction.reply({ embeds: [errorEmbed] });
    };
};