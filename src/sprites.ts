export const bombsSprites = [
	'facebook',
	'insta',
	'mail',
	'pinterest',
	'snap',
	'spotify',
	'tiktok',
	'youtube',
	'twitch',
	'x',
]

export const loadSprites = () => {
	for (let index = 0; index < bombsSprites.length; index++) {
		const element = bombsSprites[index]
		loadSprite(element, `/assets/${element}.png`)
	}
	loadSprite('bird', '/assets/mouette.png', {
		sliceX: 2,
		anims: {
			fly: { from: 0, to: 1, loop: true, speed: 4 },
		},
	})
	loadSprite('gun', '/assets/canon.png')
	loadSprite('boat', '/assets/boat.png')
	loadSprite('bullet', '/assets/missile.png')
	loadSprite('fish', '/assets/poisson.png')
}
