export const createAlert = (title: string, content: string) => {
	const x = Math.floor(Math.random() * 20 - 10 + 50)
	const y = Math.floor(Math.random() * 20 - 10 + 50)
	const div = document.createElement('div')
	div.innerHTML = `
		<div class="window" style="width: 300px; left:${x}%; top:${y}%">
			<div class="title-bar">
				<div class="title-bar-text">${title}</div>
				<div class="title-bar-controls">
					<button aria-label="Close"></button>
				</div>
			</div>
			<div class="window-body">
				<p>${content}</p>
				<section class="field-row" style="justify-content: flex-end">
					<button>OK</button>
					<button>Cancel</button>
				</section>
			</div>
		</div>
`
	document.body.append(div)
	document.querySelectorAll('button')?.forEach((el) => {
		el.addEventListener('click', () => {
			div.remove()
			document.querySelector('canvas')?.focus()
		})
	})
}
