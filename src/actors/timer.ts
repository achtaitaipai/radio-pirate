export const createTimer = (duration: number) => {
	let lastTime = Date.now()

	return () => {
		const now = Date.now()
		if (now - lastTime < duration) return false
		lastTime = now
		return true
	}
}
