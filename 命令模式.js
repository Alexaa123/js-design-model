// 命令模式定义：和策略模式较为相近，是为了消除接受者和发送者之间的耦合关系

// 命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，
// 也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，
// 使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

// 例子1  核心就是bindClick的存在，将button和事件解耦

var bindClick = function( button, func ){
    button.onclick = func;
};

var MenuBar = {
    refresh: function(){
      console.log( ’刷新菜单界面’ );
    }
};

var SubMenu = {
    add: function(){
      console.log( ’增加子菜单’ );
    },
    del: function(){
      console.log( ’删除子菜单’ );
    }
};

bindClick( button1, MenuBar.refresh );
bindClick( button2, SubMenu.add );
bindClick(button3, SubMenu.del);

// 例子2： 家里有个万能遥控器，想要实现一次性多种操作
//  通过MacroCommand将接受者和发送者解耦

var closeDoorCommand = {
    execute: function(){
      console.log( ’关门’ );
    }
};

var openPcCommand = {
    execute: function(){
      console.log( ’开电脑’ );
    }
};
var openQQCommand = {
    execute: function(){
      console.log( ’登录QQ' );
    }
};

var MacroCommand = function(){
    return {
      commandsList: [],
      add: function( command ){
          this.commandsList.push( command );
      },
      execute: function(){
          for ( var i = 0, command; command = this.commandsList[ i++ ]; ){
              command.execute();
          }
      }
    }
};

var macroCommand = MacroCommand();
macroCommand.add( closeDoorCommand );
macroCommand.add( openPcCommand );
macroCommand.add( openQQCommand );

macroCommand.execute();