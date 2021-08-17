const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
const saber = require('node-scoresaber')

let bot = new Client({
	fetchAllMembers: true, // Remove this if the bot is in large guilds.
	presence: {
		status: 'online',
		activity: {
			name: `${config.prefix}help`,
			type: 'LISTENING'
		}
	}
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Database = require("@replit/database")
const db = new Database()

bot.on('message', async message => {
	// Check for command
	if (message.content.startsWith(config.prefix)) {
		let args = message.content.slice(config.prefix.length).split(' ');
		let command = args.shift().toLowerCase();

		switch (command) {

			case 'ping':
				let msg = await message.reply('Pinging...');
				await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
				break;

			case 'say':
			case 'repeat':
				if (args.length > 0)
					message.channel.send(args.join(' '));
				else
					message.reply('You did not send a message to repeat, cancelling command.')
				break

			/* Unless you know what you're doing, don't change this command. */
			case 'ha':
				message.channel.send('HaHa');
				break

			case 'creator':
				message.channel.send('Bot Made By Troy Drescher(@KingElrond#0001)');
				break

			case 'ss':
			case 'rank':
				let cid = await db.get(message.author.username);
				const myPlayer = await saber.getPlayer(cid)
				console.log(myPlayer.rank)
				message.channel.send('Your Player Rank is: ' + myPlayer.rank);
				break

				case 'scoresaber-link':
				case 'ssl':
					if (args.length > 0) {
						let cinput = args.join(' ');
					var numbers = /^[0-9]+$/;
					if (cinput.match(numbers)) {
						db.set(message.author.username, cinput).then(() => { });
						message.channel.send('Your ScoreSaber profile number has been accepted....');
					} else
					{
						message.channel.send('You did not send a scoresaber profile number to link, cancelling command.');
					}
					} else
					{
						message.channel.send('You did not send a scoresaber profile number to link, cancelling command.');
					}
				break

			case 'help':
				let embed = new MessageEmbed()
					.setTitle('HELP MENU')
					.setColor('GREEN')
					.setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
					.setThumbnail(bot.user.displayAvatarURL());
				if (!args[0])
					embed
						.setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
				else {
					if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
						let command = Object.keys(commands).includes(args[0].toLowerCase()) ? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
						embed
							.setTitle(`COMMAND - ${command}`)

						if (commands[command].aliases)
							embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
						embed
							.addField('DESCRIPTION', commands[command].description)
							.addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
					} else {
						embed
							.setColor('RED')
							.setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
					}
				}
				message.channel.send(embed);
				break;
		}
	}
});

require('./server')();
bot.login(config.token);