export default {
    bind() {

    },
    update() {
        const { el, vm, attrValue } = this
        if (vm[attrValue]) {
            this.parentNode.appendChild(el)
        } else {
            this.parentNode = el.parentNode
            el.parentNode.removeChild(el)
        }
    }
}