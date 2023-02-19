// 模板方法模式定义： 模板方法模式由两部分结构组成，第一部分是抽象父类，
// 第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，
// 包括实现一些公共方法以及封装子类中所有方法的执行顺序。
// 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

// 例子1： 父类定义执行顺序（算法框架），子类重写父类的方法，来定义每个算法的细节

var Coffee = function(){};
Coffee.prototype.boilWater = function(){
    console.log( ’把水煮沸’ );
};

Coffee.prototype.brewCoffeeGriends = function(){
    console.log( ’用沸水冲泡咖啡’ );
};

Coffee.prototype.pourInCup = function(){
    console.log( ’把咖啡倒进杯子’ );
};

Coffee.prototype.addSugarAndMilk = function(){
    console.log( ’加糖和牛奶’ );
};

Coffee.prototype.init = function(){
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
};

var coffee = new Coffee();
coffee.init();


// 例子2： 假如我们不使用继承该如何实现呢？

var Beverage = function( param ){
    var boilWater = function(){
      console.log( ’把水煮沸’ );
    };

    var brew = param.brew || function(){
      throw new Error( ’必须传递brew方法’ );
    };

    var pourInCup = param.pourInCup || function(){
      throw new Error( ’必须传递pourInCup方法’ );
    };

    var addCondiments = param.addCondiments || function(){
      throw new Error( ’必须传递addCondiments方法’ );
    };

    var F = function(){};

    F.prototype.init = function(){
      boilWater();
      brew();
      pourInCup();
      addCondiments();
    };

    return F;
};

var Coffee = Beverage({
    brew: function(){
      console.log( ’用沸水冲泡咖啡’ );
    },
    pourInCup: function(){
        console.log( ’把咖啡倒进杯子’ );
    },
    addCondiments: function(){
        console.log( ’加糖和牛奶’ );
    }
});
var Tea = Beverage({
    brew: function(){
      console.log( ’用沸水浸泡茶叶’ );
    },
    pourInCup: function(){
        console.log( ’把茶倒进杯子’ );
    },
    addCondiments: function(){
        console.log( ’加柠檬’ );
    }
});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();