// 设计模式一： 单例模式
// 单例模式定义： 保证一个类仅有一个实例，并提供一个访问它的全局访问点

// 举例1
let human = function (name) { 
    this.instance = null
    this.name = name
}

human.getInstance = function (name) { 
    console.log(this)
    if (!this.instance) { 
        this.instance = new human(name)
    }
    return this.instance
}


let a = human.getInstance('tom');
let b = human.getInstance('bob')
console.log(a === b) // 返回true


//  在调用的时候生成对应的对象，这种叫惰性单例模式，并判断对象存在则使用存在的对象

// 例子2： 使用new 实现, 将已经存在的instance存在闭包中;
// 同时将 维护单例的功能 和 创建对象的功能 拆开

const createHumam = function () {}

const human = (function () { 
    let instance = null
    return function (name) { 
        if (!instance) { 
            instance = new createHumam(name)
        }
        return instance
    }
})()

let a = new human('bob')
let b = new human('tom')

console.log(a === b)  // true




