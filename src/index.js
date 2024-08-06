import Vue from './Vue'

const vm = new Vue({
    el: '#root',
    data: {
      count: 0,
      message: 'hello',
      break10: false,
      break20: false,
    },
    methods: {
      increase () {
        this.count += 1
        if (this.count >= 10) {
          this.break10 = true
        }
        if (this.count >= 20) {
          this.break20 = true
        }
      }
    }
})
console.log("vm: ", vm)
console.log(vm.count)
console.log("=============")