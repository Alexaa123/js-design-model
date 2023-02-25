// AOP的定义： 在不改变原函数逻辑的情况下，在原函数执行前或者
// 执行后增加相应逻辑，

// 例子1： 实现一个before和after

Function.prototype.before = function (fn) { 
    let _that = this;
    return function () { 
        fn.apply(this, arguments);
        return _that.apply(this, arguments)
    }
}

Function.prototype.after = function (fn) { 
    let _that = this;
    return function () { 
        let temp = _that.apply(this, arguments);
        fn.apply(this, arguments);
        return temp

    }
}

const a = function () { 
    console.log('2')
}

const b = a.before(function () { 
    console.log('1')
}).after(function () { 
    console.log('3')
}).after(function () { 
    console.log('4')
})

b()

// AOP和职责链有异曲同工的作用，可以参考职责链的使用

// 例子2： 假如不想直接污染原型，可以将原函数和新函数都传入生成一个新函数

const after = function (fn, callback) { 
    return function () { 
        let temp = fn.apply(this, arguments);
        callback.apply(this, arguments);
        return temp
    }
}
const a = after(function () { 
    console.log('11')
}, function () { 
    console.log('22')
})

a()

// 例子3： 使用before更改原函数传入的参数

Function.prototype.before = function (fn) { 
    let _that = this;
    return function () { 
        fn.apply(this, arguments);
        return _that.apply(this, arguments)
    }
}
let func = function( param ){
    console.log( param );    // 输出： {a: "a", b: "b"}
}

func1 = func.before( function( param ){
    param.b = 'b';
});

func1( {a: 'a'} );

