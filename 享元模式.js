// 享元模式定义： 享元模式的核心是运用共享技术来有效支持大量细粒度的对象

// 享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）

// ❏ 内部状态存储于对象内部。
// ❏ 内部状态可以被一些对象共享。
// ❏ 内部状态独立于具体的场景，通常不会改变。
// ❏ 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享
// 基于内部状态定义对象（相同内部状态共用一个对象），外部状态在必要时被传入共享对象来组装成一个完整的对象

// 享元模式使用场景： 
// ❏ 一个程序中使用了大量的相似对象。
// ❏ 由于使用了大量对象，造成很大的内存开销。
// ❏ 对象的大多数状态都可以变为外部状态。
// ❏ 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。

// 什么是对象工厂？
// 使用立即执行函数 + 闭包 + 返回对象 就是对象工厂
var toolTipFactory = (function(){
    var toolTipPool = [];    // toolTip对象池

    return {
      create: function(){
          if ( toolTipPool.length === 0 ){    // 如果对象池为空
              var div = document.createElement( 'div' );    // 创建一个dom
              document.body.appendChild( div );
              return div;
          }else{    // 如果对象池里不为空
              return toolTipPool.shift();  // 则从对象池中取出一个dom
          }
      },
      recover: function( tooltipDom ){
          return toolTipPool.push( tooltipDom );    // 对象池回收dom
      }
    }
})();

// 例子1: 男女两种模特，都要试穿五十件不同衣服
//  不使用享元模式会创建100个对象
// 使用享元模式只需要创建2个对象

var Model = function( sex ){
    this.sex = sex;
};

Model.prototype.takePhoto = function(){
    console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
};

var maleModel = new Model('male');
var femaleModel = new Model('female');

for ( var i = 1; i <= 50; i++ ){
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
};

for ( var j = 1; j <= 50; j++ ){
    femaleModel.underwear = 'underwear' + j;
    femaleModel.takePhoto();
};