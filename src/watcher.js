import Dep from './dep'

class Watcher {
    constructor({ vm, expOrFn, cb }) {
        this.vm = vm
        this.expOrFn = expOrFn
        this.cb = cb
        this.deps = []
        this.depIds = new Set()

        // 触发依赖收集
        this.value = this.get()
    }

    getter() {
        return this.vm[this.expOrFn]
    }

    get() {
        Dep.target = this
        // 触发 observer 的 defineReactive 依赖收集
        const value = this.getter()
        Dep.target = null
        return value
    }

    // 由上面的 get 触发 
    // wather.get -> Object.defineProperty::get 
    // -> dep.depend -> wather.addDep -> dep.addSub
    addDep(dep) {
        if (this.depIds.has(dep.id)) {
            return
        }
        this.deps.push(dep)
        this.depIds.add(dep.id)
        dep.addSub(this)
    }

    setter(value) {
        this.vm[this.expOrFn] = value
    }

    set(value) {
        this.setter(value)
    }

    update() {
        const value = this.get()
        const oldValue = this.value

        if (value !== oldValue) {
            this.cb(value, oldValue)
        }
    }

}

export default Watcher