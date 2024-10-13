const createPhaser = (audioContext: BaseAudioContext, amount: number) => {
	const filter = audioContext.createBiquadFilter()
	filter.type = 'allpass'
	filter.frequency.value = 100

	const lfo = audioContext.createOscillator()
	lfo.type = 'sine'
	lfo.frequency.value = 50

	const lfoGain = audioContext.createGain()
	lfoGain.gain.value = amount

	lfo.connect(lfoGain)
	lfoGain.connect(filter.frequency)

	return {
		node: filter,
		set: (amount: number) => (lfoGain.gain.value = amount),
		start: () => lfo.start(),
		stop: (when?: number) => lfo?.stop(when),
	}
}

const audioContext = new AudioContext()
const audioElement = document.createElement('audio')
audioElement.src = './assets/boatcastaudio.mp3'

const audioNode = new MediaElementAudioSourceNode(audioContext, {
	mediaElement: audioElement,
})

const phaser = createPhaser(audioContext, 50)
audioNode.connect(phaser.node)
phaser.node.connect(audioContext.destination)
phaser.start()

let playing = false

export const playAudio = () => {
	if (audioContext.state === 'suspended') audioContext.resume()
	playing = true
	audioElement.currentTime = 0
	audioElement.play()
}
export const stopAudio = () => {
	if (!playing) return
	playing = false
	audioElement.pause()
	setPhaser(0)
}

export const setPhaser = phaser.set
