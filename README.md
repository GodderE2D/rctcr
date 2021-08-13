# RCTCR - Right Click Then Click Report
## About
RCTCR is an advanced Discord bot that collects reports from server members using context menus then sending it to a staff channel.

**⚠️ Warning:** If your server receives more than 500 reports in a day, your server will be blacklisted and you need to follow self-hosting instructions below. Contact GodderE2D for more details.

## How it works
1. User right click then click report.
1. Select rules on how many rules the message has violated. (Optional)
1. RCTCR sends a nicely formatted embed in a staff-only channel.

## Features
* Select up to 24 roles required to report a message, or select a minimum role required based on roles hierarchy.
* Select up to 24 'immune' roles which messages cannot be reported.
* Select up to 24 disabled role that cannot submit reports.
* Select up to 24 disabled channels where messages can't be reported.
    * By default, if the user can't talk in that channel, they can't report any messages in it. This can be changed.
* Register up to 25 server rules for members to choose when reporting a message.
    * Set minimum and maximum rules for members to choose when reporting.
    * This option can be disabled by setting no server rules.
* Select a channel for reports to come in.
* Select which roles (or @everyone/@here) to ping when a report comes in.
* Notifies member when a report has been resolved.
* Rewards members with a role if report has been successful.

## Contributing
You can contribute by opening a pull request. PRs will be reviewed within 7 days of when they are created.

Found a bug? Please report them by opening an issue. Thanks!

## Self Hosting
Self-hosting is encouraged if your server is large (over 50,000 members) or you want customize the bot further.

### Steps
1. Clone the repository with your preferred tool.
1. Run `yarn install`.
1. Fill in the following fields in `.env`:
    * `TOKEN` (string): Your Discord bot token (required)
1. Run one of the following commands:
    * `yarn start`: Basically `dev` without watching files, slightly higher performance since you don't need to constantly watch files in the background
    * `yarn dev`: Recommended for development use with Nodemon, watches files

### Notes
* RCTCR uses [quick.db](https://www.npmjs.com/package/quick.db) to store server data. You **cannot** use the following hosts:
    * Glitch
    * Repl.it
    * Heroku
    * And any other hosts that clears process-made files regularly

## Developers
Made by [GodderE2D]#7290.  
[Website](https://www.godder.ga) | [Email](mailto:main@godder.ga)

The fastest way to contact me is either through Discord or Twitter DMs. These will be checked almost daily.
