import { CONFIG } from '../config'

export const createFish = () => {
	const dir = Math.sign(Math.random() - 0.5)
	const fish = add([
		circle(10),
		pos(dir > 0 ? 50 : width() - 50, 400),
		area(),
		body({ gravityScale: 1 }),
		move(RIGHT, dir * CONFIG.FISH_SPEED),
		offscreen({ destroy: true }),
		'enemy',
	])
	fish.jump(CONFIG.FISH_JUMP_FORCE)
	return fish
}
