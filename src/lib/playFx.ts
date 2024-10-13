import { playSound, Sound } from 'pfxr'

const audioContext = new AudioContext()

const gainNode = new GainNode(audioContext)
gainNode.connect(audioContext.destination)
export const playFx = async (fx: Sound, gain?: number) => {
	gainNode.gain.value = gain ?? 1
	return playSound(fx, audioContext, gainNode)
}
