import Watcher from "./watcher"

function noop() {}
class Directive {
    constructor({ vm, el, attrName, attrValue, bind, update, args }) {
        this.vm = vm
        this.el = el
        this.attrName = attrName
        this.attrValue = attrValue
        this._bind = bind || noop
        this._update = update || noop
        this.args = args
    }

    bind() {
        const self = this
        this._bind.call(this)
        this.watcher = new Watcher({
            vm: this.vm,
            expOrFn: this.attrValue,
            cb: this._update.bind(self)
        })
        this._update(this.watcher.value)
    }
}

export default Directive