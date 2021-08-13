import { Client, Collection, Interaction, MessageEmbed } from 'discord.js';
import fs from 'fs';
import path from 'path';

export const name = 'ready';
export const once = 'true';
export const execute = async (client: Client) => {
    // @ts-expect-error
    client.commands = new Collection();
    // @ts-expect-error
    client.cooldowns = new Collection();

    const commandFolders = fs.readdirSync(path.join(__dirname, `../commands`));
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${folder}`)).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            // @ts-expect-error
            if (command.name) client.commands.set(command.name, command);
        };
    };

    client.on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        // @ts-expect-error
        const command = client.commands.get(interaction.commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(interaction.commandName));

        if (!command) {
            const errorEmbed = new MessageEmbed()
                .setColor('#e32636')
                .setDescription('<:redtick:875528770356904016> This command does not exist.')
                .setFooter('404 Not Found');
            
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        };

        if (command.guildOnly && interaction.channel?.type === 'DM') {
            const errorEmbed = new MessageEmbed()
                .setColor('#e32636')
                .setDescription('<:redtick:875528770356904016> This command cannot be ran in DMs.')
                .setFooter('403 Forbidden');
            
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        };

        // @ts-expect-error
        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 0) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
    
                const errorEmbed = new MessageEmbed()
                    .setColor('#e32636')
                    .setDescription(`<:redtick:875528770356904016> You are on cooldown for this command.\n**Cooldown Left:** ${timeLeft.toFixed(1)} second(s)\n**Command Cooldown:** ${command.cooldown} second(s)`)
                    .setFooter('429 Too Many Requests');
    
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            };
        };

        timestamps.set(interaction.user.id, now);

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            const errorEmbed = new MessageEmbed()
                .setColor('#e32636')
                .setDescription("<:redtick:875528770356904016> An internal error occured. We're sorry for any inconvenience caused.")
                .setFooter('500 Internal Server Error');
    
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        };
    });
};