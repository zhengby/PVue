import Directive from './directive'
import directiveText from './directives/text'
import directiveModel from './directives/model'
import directiveOn from './directives/on'
import directiveIf from './directives/if'

class Compiler {
    constructor(vm) {
        this.vm = vm
    }
    compileSingleNode(el) {
        const attributes = el.attributes
        if (!attributes) {
            return
        }
        const onRE = /^v-on:|^@/
        const modelRE = /^v-model/
        const textRE = /^v-text/
        const ifRE = /^v-if/
        const directiveAttrRE = /^v-([^:]+)(?:$|:(.*)$)/

        const len = attributes.length
        let index = 0

    
        while (index < len) {
            const attribute = attributes[index++]
            const { name, value } = attribute || {}
            if (name.match(directiveAttrRE)) {
                const directiveBase = {
                    vm: this.vm,
                    el,
                    attrName: name,
                    attrValue: value,
                }
                if (textRE.test(name)) {
                    this.vm.directives.push(new Directive({
                        ...directiveBase,
                        ...directiveText
                    }))
                }
                if (modelRE.test(name)) {
                    this.vm.directives.push(new Directive({
                        ...directiveBase,
                        ...directiveModel
                    }))
                }
                if (onRE.test(name)) {
                    this.vm.directives.push(new Directive({
                        ...directiveBase,
                        args: name.replace(onRE, ''),
                        ...directiveOn,
                    }))
                }
                if (ifRE.test(name)) {
                    this.vm.directives.push(new Directive({
                        ...directiveBase,
                        ...directiveIf,
                    }))
                }
            }
        }
    }


    compile() {
        const { el } = this.vm
        this._compile(el)
        this.vm.directives.forEach(directive => {
            directive.bind()
        })
    }

    _compile(el) {
        this.compileSingleNode(el)
        el.childNodes.forEach(child => {
            this._compile(child)
        })
    }

}



export default Compiler