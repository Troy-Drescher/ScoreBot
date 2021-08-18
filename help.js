module.exports = {
  'help': {
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'say': {
    aliases: ['repeat'],
    description: 'Repeats whatever is said.',
    format: 'say <message>'
  },
  'ha': {
    description: 'sends haha',
    format: 'ha'
  },
  'creator': {
    descripton: 'responds with who made this bot',
    format: 'creator'
  },
	'rank': {
    aliases: ['ss'],
    description: 'shows ScoreSaber rank.',
    format: 'rank'
	},
		'ScoreSaber-Link': {
    aliases: ['SSL'],
    description: 'Link scoresaber profile and discord profile, if sending scoresaber profile link do not include https://',
    format: 'ScoreSaber-Link <ScoreSaber-ID>'
}
}