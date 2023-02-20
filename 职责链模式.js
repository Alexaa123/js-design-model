// 职责链模式定义： 职责链模式的定义是：使多个对象都有机会处理请求，
// 从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，
// 并沿着这条链传递该请求，直到有一个对象处理它为止。

// 例子1： 商场优惠券发放存在不同的情况，需要链式将不同情况串起来

let order500 = function( orderType, pay, stock ){
    if ( orderType === 1 && pay === true ){
      console.log( '500元定金预购，得到100优惠券' );
    }else{
      return 'nextSuccessor';   
    }
};

var order200 = function( orderType, pay, stock ){
    if ( orderType === 2 && pay === true ){
      console.log( '200元定金预购，得到50优惠券' );
    }else{
      return 'nextSuccessor';    // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var orderNormal = function( orderType, pay, stock ){
    if ( stock > 0 ){
      console.log( '普通购买，无优惠券');
    }else{
      console.log( '手机库存不足' );
    }
};

// let Chain = function (fn) { 
//     this.fn = fn;
//     this.successor = null;
// }

// Chain.prototype.setNextSuccessor = function (successor) { 
//     this.successor = successor;
// }

// Chain.prototype.passRequest = function () { 
//     var ret = this.fn.apply(this, arguments);
//     if (ret === 'nextSuccessor') { 
//         return this.successor && this.successor.passRequest.apply(this.successor, arguments)
//     }
//     return ret
// }

// let chainOrder500 = new Chain(order500)
// let chainOrder200 = new Chain(order200)
// let chainOrderNormal = new Chain(orderNormal)

// chainOrder500.setNextSuccessor(chainOrder200);
// chainOrder200.setNextSuccessor(chainOrderNormal);

// chainOrder500.passRequest(1, true, 500)  // 500元定金预购，得到100优惠券

// 例子2： 用AOP实现职责链,这个比较麻烦，需要多看几遍
Function.prototype.after = function( fn ){
    var self = this;
    return function(){
        var ret = self.apply(this, arguments);
        console.log('333', ret)
      if ( ret === 'nextSuccessor' ){
          return fn.apply( this, arguments );
      }

      return ret;
    }
};

var order = order500.after(order200).after(orderNormal);
console.log(order, '66')

order( 1, true, 500 );    // 输出：500元定金预购，得到100优惠券
order( 2, true, 500 );    // 输出：200元定金预购，得到50优惠券
order( 1, false, 500 );   // 输出：普通购买，无优惠券