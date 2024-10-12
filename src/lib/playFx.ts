import { playSound, Sound } from 'pfxr'

const audioContext = new AudioContext()

export const playFx = (fx: Sound) => {
	playSound(fx, audioContext, audioContext.destination)
}
