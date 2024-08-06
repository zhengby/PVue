import Dep from './dep'

class Observer {
    constructor(data) {
        this.data = data
    }
    observe() {
        for (const key in this.data) {
            this.defineReactive(this.data, key, this.data[key])
        }
    }
    defineReactive(obj, key, value) {
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get: () => {
                // 依赖收集, 由 watcher 的初始化触发
                // Dep.target 对应一个 watcher
                // 结合 wather.js 一起看
                if (Dep.target) {
                    dep.depend()
                }
                return value
            },
            set: (newValue) => {
                if (value === newValue) {
                    return
                }
                value = newValue
                // 值变化，通知回调
                dep.notify()
            }
        })
    }
}

export default Observer