export const mapVal = (
	min1: number,
	max1: number,
	value: number,
	min2: number,
	max2: number,
) => {
	const delta1 = max1 - min1
	const delta2 = max2 - min2
	const factor = (value - min1) / delta1
	return factor * delta2 + min2
}
