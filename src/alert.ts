export const createAlert = (title: string, content: string): Promise<void> => {
	return new Promise((res) => {
		const x = Math.floor(Math.random() * width() - width() * 0.5)
		const y = Math.floor(Math.random() * height() - height() * 0.5)
		const div = document.createElement('div')
		div.innerHTML = `
      <div class="window prout" style="width: 300px; left:calc(50% + ${x}px); top:calc(50% + ${y}px)">
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
		div.querySelectorAll('button')?.forEach((el) => {
			el.addEventListener('click', () => {
				div.remove()
				document.querySelector('canvas')?.focus()
				res()
			})
		})
	})
}

export const closeAllAlerts = () => {
	document.querySelectorAll('.prout').forEach((el) => el.remove())
}
