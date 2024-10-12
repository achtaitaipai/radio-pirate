import { CONFIG } from '../config'
import { createTimer } from './timer'

export const createGun = () => {
	const gun = add([
		sprite('gun'),
		pos(width() * 0.5, 400),
		anchor(vec2(-0.5, 0)),
		rotate(-90),
		area({ shape: new Rect(vec2(-30, 0), 130, 133) }),
		z(2),
		'player',
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
	const base = add([
		sprite('boat'),
		pos(width() * 0.5 + 5, 495),
		anchor('center'),
		z(1),
		area(),
		'player',
	])
	base.onCollide('enemy', (enemy) => {
		destroy(enemy)
		addKaboom(enemy.pos.add(vec2(enemy.width * 0.5, enemy.height * 0.5)))
		shake()
	})
	gun.onCollide('enemy', (enemy) => {
		destroy(enemy)
		addKaboom(enemy.pos.add(vec2(enemy.width * 0.5, enemy.height * 0.5)))
		shake()
	})
	return gun
}

export const createBullet = (gun: ReturnType<typeof createGun>) => {
	const bullet = add([
		sprite('bullet'),
		area(),
		pos(gun.pos.add(Vec2.fromAngle(gun.angle).scale(gun.width * 0.8))),
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
		addKaboom(enemy.pos.add(vec2(enemy.width * 0.5, enemy.height * 0.15)))
	})
}
