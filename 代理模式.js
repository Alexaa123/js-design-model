// 代理模式：代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象

// 保护代理： 请求不合适，代理会筛选掉
// 虚拟代理： 将开销大的操作，延迟到真正需要它的时候创建

// 代理对象和本题需要有相同的接口 （规范）

// 注意：
// 1、一般立即执行函数和闭包在一起使用，这样适合存储变量；
// 2、高阶函数（一个函数的返回是一个函数）一般和apply，bind一起使用


// 例子1  虚拟代理实现图片预加载

let myImage = (function () { 
    let img = document.createElement('img');
    document.body.appendChild(img);
    return {
        setImgSrc: function (src) { 
            img.src = src
        }
    }
})()

// 创建一个虚拟代理，在图片加载完成前使用一个gif图占位

let proxyMyImage = (function () { 
    let img = new Image();
    img.onLoad = function () { 
        myImage.setImgSrc(this.src)
    }
    return {
        setSrc: function (src) { 
            myImage.setImgSrc('C://file.gif');
            img.src = src
        }
    }
})()

// 代理做了两件事：
// 1：将占位图给之前的标签；
// 2：创建一个image标签，将图片下载到本地
// 3、监听image标签onLoad事件，将之前的image标签的src替换

// 什么是单一职责原则： 单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。
// 如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可能会有多个
// 代理模式存在的原因在于： 编码需要符合单一职责原则

// 例子2： 该例子实现了一个miniConsole代理对象
// 1、每次miniConsole.console 会在cache中push一个函数；
// 2、立即执行函数监听控制台打开时机，并执行cache中的函数

var miniConsole = (function(){
    var cache = [];
    var handler = function( ev ){
      if ( ev.keyCode === 113 ){
          var script = document.createElement( 'script' );
          script.onload = function(){
              for ( var i = 0, fn; fn = cache[ i++ ]; ){
                  fn();
              }
          };
          script.src = 'miniConsole.js';
          document.getElementsByTagName( 'head' )[0].appendChild( script );
          document.body.removeEventListener( 'keydown', handler ); // 只加载一次miniConsole.js
      }
    };

    document.body.addEventListener( 'keydown', handler, false );

    return {
      log: function(){
          var args = arguments;
              cache.push( function(){
                  return miniConsole.log.apply( miniConsole, args );
              });
        }
    }
})();

miniConsole.log( 11 );      // 开始打印log

// 例子3： 缓存代理
// 将结果存储在cache中，假如有cache中有，则不需要再重新计算

const product = function () { 
    let sum = 1
    for (let i = 0; i < arguments.length; i++) { 
        sum = sum * arguments[i]
    }
    return sum
}

const proxyProduct = (function () { 
    let cache = {}
    return function () { 
        let arg = Array.prototype.join.call(arguments, ';')
        if (!cache[arg]) { 
            cache[arg] = product.apply(this, arguments)
        }
        return cache[arg]
    }
})()

console.log(proxyProduct(1,2,3))

