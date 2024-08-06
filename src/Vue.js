import Observer from './observer'
import Compiler from './compiler'

class Vue {
    constructor(options) {
        this.init(options)
    }
    init (options) {
        this.directives = []
        this.$options = options
        this.mergeData()
        this.mergeMethods()
        this.observe()
        this.el = document.querySelector(options.el)
        this.compile()

    }
    // this[key] == options.data[key]
    mergeData() {
        this.$data = this.$options.data
        for (const key in this.$options.data) {
            this.proxy(key)
        }
    }
    // this[method] = options.methods[method]
    mergeMethods() {
        for (const method in this.$options.methods) {
            this[method] = this.$options.methods[method]
        }
    }
    observe() {
        const observer = new Observer(this.$data)
        observer.observe()
    }
    proxy(key) {
        Object.defineProperty(this, key, {
            get: () => {
                return this.$data[key]
            },
            set: (value) => {
                this.$data[key] = value
            }
        })
    }

    compile() {
        const compiler = new Compiler(this)
        compiler.compile()
    }
}

export default Vue
