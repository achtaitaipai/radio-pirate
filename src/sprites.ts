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
		loadSprite(element, `./assets/${element}.png`)
	}
	loadSprite('bird', './assets/mouette.png', {
		sliceX: 2,
		anims: {
			fly: { from: 0, to: 1, loop: true, speed: 4 },
		},
	})
	loadSprite('wave', './assets/wave.png', {
		sliceX: 6,
		anims: {
			1: { from: 0, to: 1, loop: true, speed: 6 },
			2: { from: 2, to: 3, loop: true, speed: 6 },
			3: { from: 4, to: 5, loop: true, speed: 6 },
		},
	})
	loadSprite('gun', './assets/canon.png')
	loadSprite('boat', './assets/boat.png')
	loadSprite('bullet', './assets/missile.png')
	loadSprite('fish', './assets/poisson.png')
	loadSprite('gameover', './assets/gameover.png')
	loadSprite('radio', './assets/radio.png')
	loadSprite('radioBtn', './assets/bouton.png')
	loadSprite('cursor', './assets/cursor.png')
	loadSprite('cops', './assets/cops.png')
	loadSprite('intro', './assets/intro.png')
	loadSprite('btns', './assets/btns.png', { sliceX: 4 })
}
