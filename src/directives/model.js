export default {
    bind() {
        const { el } = this
        el.addEventListener('input', () => {
            this.watcher.set(el.value)
        })
    },
    update(value) {
        const { el } = this
        el.value = value
    }
}