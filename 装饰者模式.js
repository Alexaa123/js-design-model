// 装饰者模式定义：在程序开发过程中，通过给已有对象增加功能，可以使用装饰者模式
// 给对象动态地增加职责的方式称为装饰者（decorator）模式

// 装饰者模式核心： 并未真正改变原始对象，而是将原始对象放入一个新对象中，
// 通过原型链引用来实现之前功能，形成聚合对象

// 代理模式和装饰者模式的区别：
// 代理模式和装饰者模式最重要的区别在于它们的意图和设计目的。
// 代理模式的目的是，当直接访问本体不方便或者不符合需要时

// 例子1： 开始飞机只能发射子弹，但是现在需要增加发射导弹

var Plane = function () { }
Plane.prototype.fire = function () { 
    console.log('发射子弹')
}

const plane = new Plane()

var NewPlane = function (plane) {
    this.plane = plane
 }
NewPlane.prototype.fire = function () { 
    this.plane.fire();
    console.log('发射导弹')
}

const newPlane = new NewPlane(plane)

newPlane.fire()

// 核心是创建了一个新的对象，方法和之前的对象保持一致
// 并调用了之前的方法

// 例子2： 对于js中而言，因为可以直接定义对象，因此写法更加简单

var plane = {
    fire: function(){
      console.log( ’发射普通子弹’ );
    }
}

var missileDecorator = function(){
    console.log( ’发射导弹’ );
}

var atomDecorator = function(){
    console.log( ’发射原子弹’ );
}

var fire1 = plane.fire;

plane.fire = function(){
    fire1();
    missileDecorator();
}

var fire2 = plane.fire;

plane.fire = function(){
    fire2();
    atomDecorator();
}

plane.fire();
// 分别输出：发射普通子弹、发射导弹、发射原子弹

