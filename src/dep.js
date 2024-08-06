let uid = 0

class Dep {
    constructor() {
        this.id = uid++
        //  subscriber 列表
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    depend() {
        Dep.target.addDep(this)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

// 当前的 watcher
Dep.target = null

export default Dep