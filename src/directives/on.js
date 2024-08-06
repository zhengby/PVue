export default {
    bind() {
        const { el, args, vm, attrValue } = this
        if (args === 'click') {
            el.addEventListener('click', e => {
                vm[attrValue].call(vm)
            })
        }
    }
}