import { CONFIG } from '../config'

export const createFish = () => {
	const dir = Math.sign(Math.random() - 0.5)
	const fish = add([
		sprite('fish', {
			flipX: dir < 0,
		}),
		rotate(0),
		pos(dir > 0 ? 0 : width(), 400),
		anchor('center'),
		area(),
		body({ gravityScale: 1 }),
		move(RIGHT, dir * CONFIG.FISH_SPEED),
		offscreen({ destroy: true }),
		'enemy',
	])
	fish.jump(CONFIG.FISH_JUMP_FORCE)
	fish.onUpdate(() => (fish.angle = fish.vel.y > 0 ? 90 * dir : 0))
	return fish
}
