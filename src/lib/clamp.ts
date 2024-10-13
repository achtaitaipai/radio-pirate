export const clamp = (min: number, max: number, value: number) =>
	Math.min(Math.max(min, value), max)
