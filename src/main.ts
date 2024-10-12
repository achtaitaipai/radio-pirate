import kaplay from 'kaplay'
import { createBird } from './actors/bird'
import { createFish } from './actors/fish'
import { createGun } from './actors/player'
import { createTimer } from './actors/timer'
import { CONFIG } from './config'
import './style.css'
import { loadSprites } from './sprites'

kaplay({
	width: 800,
	height: 600,
})
//debug.inspect = true
loadSprites()
scene('main', () => {
	setBackground(Color.fromHex('#bf2b4c'))
	setGravity(1800)
	createGun()
	const birdTimer = createTimer(CONFIG.BIRD_TIME)
	const fishTimer = createTimer(CONFIG.FISH_TIME)
	createBird()
	onUpdate(() => {
		if (birdTimer()) createBird()
		if (fishTimer()) createFish()
	})
	onDraw(() => {
		drawRect({
			width: width(),
			height: 270,
			gradient: [rgb(172, 203, 238), rgb(231, 240, 253)],
		})
		drawRect({
			pos: vec2(0, 270),
			width: width(),
			height: height() - 270,
			gradient: [rgb(80, 125, 160), rgb(37, 58, 75)],
		})
	})
})
go('main')
