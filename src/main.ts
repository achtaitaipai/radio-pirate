import kaplay from 'kaplay'
import { createSoundFromTemplate, TEMPLATES } from 'pfxr'
import 'xp.css/dist/XP.css'
import { createBird } from './actors/bird'
import { createFish } from './actors/fish'
import { createGun } from './actors/player'
import { createTimer } from './actors/timer'
import { closeAllAlerts, createAlert } from './alert'
import { LEVEL1 } from './config'
import { mapVal } from './lib/map'
import { playFx } from './lib/playFx'
import { playAudio, stopAudio } from './playAudio'
import { loadSprites } from './sprites'
import './style.css'
import { createCops } from './actors/cops'

kaplay({
	width: 800,
	height: 600,
})

//debug.inspect = true
loadSprites()
scene('94', () => {
	playAudio()
	closeAllAlerts()
	const levelTimeStart = Date.now()
	setBackground(Color.fromHex('#bf2b4c'))
	setGravity(1800)
	createGun()
	let birdsStarted = false
	const startBirdTimer = createTimer(LEVEL1.START_BIRD_TIME)
	const copsTimer = createTimer(LEVEL1.COP_TIME)
	const birdTimer = createTimer(LEVEL1.BIRD_TIME[0])
	const fishTimer = createTimer(LEVEL1.FISH_TIME[0])
	const alertTimer = createTimer(LEVEL1.ALERT_TIME[0])
	onUpdate(async () => {
		const difficultyFactor = (Date.now() - levelTimeStart) / LEVEL1.DURATION
		const getTime = ([time1, time2]: number[]) =>
			clamp(time1, difficultyFactor * (time2 - time1) + time1, time2)

		if (!birdsStarted && startBirdTimer()) birdsStarted = true
		if (birdTimer(getTime(LEVEL1.BIRD_TIME)) && birdsStarted) createBird()
		if (fishTimer(getTime(LEVEL1.FISH_TIME))) createFish()
		if (alertTimer(getTime(LEVEL1.ALERT_TIME)))
			createAlert('Important', 'Pour devenir riche cliquez sur prout')
		if (copsTimer()) {
			createCops()
			setTimeout(() => {
				go('radio')
			}, 10000)
		}
	})

	add([sprite('wave', { anim: '1' }), pos(100, 400), z(1)])
	add([sprite('wave', { anim: '1' }), pos(300, 300), z(1)])
	add([sprite('wave', { anim: '2' }), pos(600, 400), z(1)])
	add([sprite('wave', { anim: '3' }), pos(200, 500), z(1)])
	add([sprite('wave', { anim: '1' }), pos(700, 550), z(1)])

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

scene('gameover', () => {
	stopAudio()
	closeAllAlerts()
	setBackground(rgb(0, 0, 0))
	add([sprite('gameover')])
	playFx(createSoundFromTemplate(TEMPLATES.FALL, 666))
	onKeyDown(() => {
		go('radio')
	})
	onMouseDown(() => {
		go('radio')
	})
})

scene('radio', () => {
	stopAudio()
	closeAllAlerts()
	const MINCURSOR = 223
	const MAXCURSOR = 670
	setBackground(rgb(0, 0, 0))
	add([sprite('radio')])
	const btn = add([
		sprite('radioBtn'),
		pos(575, 390),
		anchor('center'),
		rotate(0),
	])
	const cursor = add([
		sprite('cursor'),
		anchor('center'),
		scale(0.25),
		pos(MINCURSOR, 174),
	])

	let timeId: number | undefined = undefined

	const updateCursor = () => {
		cursor.pos.x = mapVal(0, 360, btn.angle, MINCURSOR, MAXCURSOR)
		const hz = Math.round(mapVal(0, 360, btn.angle, 88, 110))
		const level = LEVEL1.FREQUENCIES.find((el) => Math.abs(el - hz) < 2)
		if (!level) {
			clearTimeout(timeId)
			timeId = undefined
		} else if (timeId === undefined) {
			timeId = setTimeout(() => {
				go(level.toString())
			}, 2000)
		}
	}
	onKeyDown('left', () => {
		btn.angle = Math.max(0, btn.angle - LEVEL1.BTN_ROTATE_SPEED * dt())
		updateCursor()
	})
	onKeyDown('right', () => {
		btn.angle = Math.min(360, btn.angle + LEVEL1.BTN_ROTATE_SPEED * dt())
		updateCursor()
	})
})
go('radio')
