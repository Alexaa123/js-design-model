// 发布订阅模式： 存在发布者和订阅者，订阅者首先订阅好，发布者发布消息
// 时，通知到订阅者，订阅者执行

// 例子1：  实现一个订阅发布模式

let eventTest = {
    subList: {},
    listen: function (key, fn) { 
        if (!this.subList[key]) { 
            this.subList[key] = []
        };
        this.subList[key].push(fn)
    },
    trigger: function () { 
        let key = Array.prototype.shift.apply(arguments);
        if (!this.subList[key]) { 
            return false
        }
        for (let i = 0; i < this.subList[key].length; i++) { 
            fn = this.subList[key][i]
            fn && fn.apply(this, arguments)
        }
    },
    removeSub: function (key, fn) { 
        if (!key) return false;
        if (!fn) { 
            this.subList[key].length = 0
        }
        for (let i = 0; i < this.subList[key].length; i++) { 
            if (fn === this.subList[key][i]) { 
                this.subList[key].splice(i, 1)
            }
        }
    }
}

eventTest.listen('tom', () => { console.log('hello tom') })
eventTest.listen('tom', () => { console.log('hello tom11') })

eventTest.trigger('tom')  

// 上面我们实现了一个发布订阅模式，现在给某个对象都加上这个发布订阅
const addEventTest = function (obj) { 
    for (let key in eventTest) { 
        obj[key] = eventTest[key]
    }
    return obj
}