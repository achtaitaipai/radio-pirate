import { CONFIG } from '../config'
import { createTimer } from './timer'

export const createGun = () => {
	const gun = add([
		rect(50, 30),
		pos(370, 400),
		anchor('left'),
		rotate(0),
		area(),
		z(1),
	])
	onKeyDown('left', () => {
		gun.angle -= CONFIG.GUN_ROTATE_SPEED * dt()
	})

	onKeyDown('right', () => {
		gun.angle += CONFIG.GUN_ROTATE_SPEED * dt()
	})
	const bulletTimer = createTimer(CONFIG.BULLET_TIME)
	gun.onUpdate(() => {
		if (bulletTimer()) createBullet(gun)
	})
	return gun
}

export const createBullet = (gun: ReturnType<typeof createGun>) => {
	const bullet = add([
		rect(20, 6),
		area(),
		pos(gun.pos.add(Vec2.fromAngle(gun.angle).scale(gun.width))),
		anchor('center'),
		color(127, 127, 255),
		outline(4),
		move(gun.angle, CONFIG.BULLET_SPEED),
		rotate(gun.angle),
		offscreen({ destroy: true }),
		z(1),
		'bullet',
	])
	bullet.onCollide('enemy', (enemy) => {
		destroy(enemy)
		addKaboom(enemy.pos)
	})
}
