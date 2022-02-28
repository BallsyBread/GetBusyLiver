# GetBusyLiver
This is a Discord bot that originated in the Warfame CLan Get Busy Living. It's main purpose is to add a pupose to Warframe Clans by enhancing Clan's Discord experience with a bunch of features.
It is a node.js project with the discord.js library.
To use this bot, simply create a config.json in the downloaded project folder, with an object that has a field called token, and write your Bot token into it. Then, simply run npm install and then run index.js with Node.JS and the bot will be up and running.
## Features
Currently, the following features are intended to be implemented:
### WARFRAME IGN (in-game name) to nick
As people's Discord names do in no way represent their Warframe in-game name, it is sometimes hard to find out, who is who. This feature should solve this issue by doing the following:
- people that join the server should be promted to enter their Warframe IGN
- people that haven't entered their Warframe IGN should not be able to see any of the Discord Server's content, such as other commands or channels
- When someone provides a Warframe IGN, it should update their presence to show their Warframe IGN
- After the presence is set, the person should recieve the member role and get access to all other server commands and channels
### Service Channels
There should be a place for people to either request or provide services, and should be able to find a group this way.
Currently intended are the following services:
- Kuva Larvling farm
- Parvos Sister Candidate Farm
- Credit Farm
- Node Taxi (Travel to locked Nodes)
- Eidolon Farm
- Isolation Vault Farm
- Profit Taker Farm
- Prime Parts Farm
- Sorties
- Arbitrations
- Steel Path
- Sanctuary Onslaught
- Railjack missions
- Mastery Farm / XP Farm
### Reputation System
People should be able to use a command to retrieve either the people with the most reputation, so the people that provided the most services or the rank of a specific guild member.
This system should also include a way to thank someone for their service and therefore rasing their reputation.
### scheduled Events
If there is people that are looking for a specific service, the Bot should automatically schedule events for people that are interested in finding groups
## Milestones
This Bot is under heavy development. The milestones that are planned include all the features. The roadmap is the following:
### Version 0.1.0 (Authenticator)
This milestone is achieved when the feature Warframe IGN is implemented.
### Version 0.2.0 (Groufinder)
This milestone is achieved when the feature Service Channels is implemented.
### Version 0.3.0 (Reputation)
This milestone is achieved when the feature Reputation System is implemented.
### Version 0.4.0 (Events)
This milestone is achieved when the feature Scheduled Events is implemented.
