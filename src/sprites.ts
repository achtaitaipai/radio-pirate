export const bombsSprites = [
	'facebook',
	'insta',
	'mail',
	'pinterest',
	'radio',
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
}
