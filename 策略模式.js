// 策略模式定义：定义： 定义一系列的算法，把它们各自封装成策略类，算法被封装在策略类内部的方法里。在客户对Context发起请求的时候，Context 总是把请求委托给这些策略对象中间的某一个进行计算。

// 使用场景： 在有大量可替代的算法需要执行时，大量if else需要执行

// 使用目的： 减少if else 的使用，将if中的选择项全部用一个对象封装

// 策略模式不仅可以封装算法，业务规则，等一切可以替换的东西

var strategies = {
    "S": function( salary ){
      return salary * 4;
    },
    "A": function( salary ){
      return salary * 3;
    },
    "B": function( salary ){
      return salary * 2;
    }
};

var calculateBonus = function( level, salary ){
    return strategies[ level ]( salary );
};

console.log( calculateBonus( 'S', 20000 ) );     // 输出：80000
console.log(calculateBonus('A', 10000));  // 输出 3000


// 例子2  使用策略模式实现一个表单校验规则

<html>
<body>
  <form action="http://xxx.com/register" id="registerForm" method="post">
      请输入用户名：<input type="text" name="userName"/ >
      请输入密码：<input type="text" name="password"/ >
      请输入手机号码：<input type="text" name="phoneNumber"/ >
      <button>提交</button>
  </form>
<script>

  var strategies = {
      isNonEmpty: function( value, errorMsg ){
          if ( value === '' ){
              return errorMsg;
          }
      },
      minLength: function( value, length, errorMsg ){
          if ( value.length < length ){
              return errorMsg;
          }
      },
      isMobile: function( value, errorMsg ){
          if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
              return errorMsg;
          }
      }
  };

  /***********************Validator类**************************/

  var Validator = function(){
      this.cache = [];
  };

  Validator.prototype.add = function( dom, rules ){

      var self = this;

      for ( var i = 0, rule; rule = rules[ i++ ]; ){
          (function( rule ){
              var strategyAry = rule.strategy.split( ':' );
              var errorMsg = rule.errorMsg;

              self.cache.push(function(){
                var strategy = strategyAry.shift();
                    strategyAry.unshift( dom.value );
                    strategyAry.push(errorMsg);
                  // 使用高阶函数封装
                    return strategies[ strategy ].apply( dom, strategyAry );
                });
              })( rule )
          }

      };

      Validator.prototype.start = function(){
          for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
              var errorMsg = validatorFunc();
              if ( errorMsg ){
                return errorMsg;
              }
          }
      };

    /***********************客户调用代码**************************/

      var registerForm = document.getElementById( 'registerForm' );

      var validataFunc = function(){
          var validator = new Validator();

          validator.add( registerForm.userName, [{
              strategy: 'isNonEmpty',
              errorMsg: ’用户名不能为空’
          }, {
              strategy: 'minLength:10',
              errorMsg: ’用户名长度不能小于10位’
          }]);

          validator.add( registerForm.password, [{
              strategy: 'minLength:6',
              errorMsg: ’密码长度不能小于6位’
          }]);

          validator.add( registerForm.phoneNumber, [{
              strategy: 'isMobile',
              errorMsg: ’手机号码格式不正确’
          }]);

          var errorMsg = validator.start();
          return errorMsg;
      }

      registerForm.onsubmit = function(){
          var errorMsg = validataFunc();

          if ( errorMsg ){
              alert ( errorMsg );
              return false;
          }
    };

</script>
</body>
</html>

