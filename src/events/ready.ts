import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

export const name = 'ready';
export const once = true;
export const execute = async (client: Client) => {
    console.log(`RCTCR is now online as ${client.user?.tag} (${client.user?.id})!`);
    client.user?.setPresence({ activities: [{ name: 'Right Click Then Click Report! | /help', type: 'WATCHING' }], status: 'dnd' });

    // if (!client.application?.owner) await client.application?.fetch();

    // try {
    //     const guild = client.guilds.cache.get('875328807966494731');
    //     // const commands = await guild?.commands.set([{
    //     //     name: 'deploy',
    //     //     description: 'Deploys slash commands in slash commands.',
    //     //     type: 1,
    //     //     defaultPermission: false,
    //     // }]);

    //     const commands = await guild?.commands?.permissions?.add({ command: '875546130748944444', permissions: [
    //         {
    //           id: '525248423310524416',
    //           type: 'USER',
    //           permission: true,
    //         },
    //       ]});
    //     console.log('Deployment successful!', commands);
    // } catch (error) {
    //     console.error('Deployment failed!', error);
    // };
};