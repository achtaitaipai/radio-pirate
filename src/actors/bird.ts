import { CONFIG } from '../config'
import { pickInArray } from '../lib/random'
import { bombsSprites } from '../sprites'

export const createBird = () => {
	const dir = Math.sign(Math.random() - 0.5)
	const bird = add([
		rect(50, 20),
		pos(dir > 0 ? 0 : width(), Math.random() * 60 + 50),
		move(dir > 0 ? RIGHT : LEFT, 100),
		offscreen({ destroy: true }),
		area(),
		z(1),
		{ hasBomb: true },
		'enemy',
	])

	const posTarget =
		Math.random() * CONFIG.BOMB_ZONE - CONFIG.BOMB_ZONE * 0.5 + width() * 0.5
	bird.onUpdate(() => {
		const inZone = dir > 0 ? bird.pos.x < posTarget : bird.pos.x < posTarget
		if (!bird.hasBomb || inZone) return
		createBomb(bird)
		bird.hasBomb = false
	})
	return bird
}

const createBomb = (bird: ReturnType<typeof createBird>) => {
	return add([
		sprite(pickInArray(bombsSprites)),
		pos(bird.pos.add(vec2(0, bird.height))),
		move(DOWN, CONFIG.BULLET_SPEED),
		offscreen({ destroy: true }),
		area(),
		z(1),
		'enemy',
	])
}
