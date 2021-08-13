require('dotenv').config();
import db from 'quick.db';
import fs from 'fs';
import path from 'path';
import { Client, Collection } from 'discord.js';
const client = new Client({ intents: 0, partials: [] });

// Event handler
const eventFiles = fs.readdirSync(path.join(__dirname, `/events`)).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    };
};

client.login(process.env.TOKEN);