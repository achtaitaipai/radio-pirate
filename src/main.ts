import kaplay from 'kaplay'
import { createBird } from './actors/bird'
import { createFish } from './actors/fish'
import { createGun } from './actors/player'
import { createTimer } from './actors/timer'
import { CONFIG } from './config'
import './style.css'

kaplay({
	width: 800,
	height: 600,
})
//debug.inspect = true

scene('main', () => {
	setGravity(1800)
	createGun()
	const birdTimer = createTimer(CONFIG.BIRD_TIME)
	const fishTimer = createTimer(CONFIG.FISH_TIME)
	createBird()
	onUpdate(() => {
		if (birdTimer()) createBird()
		if (fishTimer()) createFish()
	})
})

go('main')
