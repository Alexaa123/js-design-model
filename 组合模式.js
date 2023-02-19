
// 组合模式将对象组合成树形结构，
// 以表示“部分 - 整体”的层次结构。除了用来表示树形结构之外，
// 组合模式的另一个好处是通过对象的多态性表现，
// 使得用户对单个对象和组合对象的使用具有一致性

// 使用场景： 
// 在执行一个顶层队形的execute方法后，会以深度遍历的方式执行子树中的execute方法；
// 采用一致的方法对待所有的叶对象

// 组合模式和命令模式相似，命令模式侧重于将发布者和接受者解耦，而且一般树只有两层；
// 但是组合模式侧重于多层树，顶层对象方法可以遍历整棵树上的对象方法；
// 组合模式可以一致对待组合对象和基本对象


// 例子1：增加一个万能遥控器，可以执行很多命令，并且有些命令是组合命令

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

var openAcCommand = {
    execute: function(){
        console.log( '打开空调' );
    }
};

var openTvCommand = {
    execute: function(){
        console.log( '打开电视' );
    }
};

var openSoundCommand = {
    execute: function(){
        console.log( '打开音响' );
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
macroCommand1.add( openSoundCommand );

/*********关门、打开电脑和打登录QQ的命令****************/

var closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};

var openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};

var openQQCommand = {
  execute: function(){
      console.log( '登录QQ' );
  }
};

var macroCommand2 = MacroCommand();
macroCommand2.add( closeDoorCommand );
macroCommand2.add( openPcCommand );
macroCommand2.add( openQQCommand );

var macroCommand = MacroCommand();
macroCommand.add( openAcCommand );
macroCommand.add( macroCommand1 );
macroCommand.add( macroCommand2 );

// var setCommand = (function( command ){
//   document.getElementById( 'button' ).onclick = function(){
//       command.execute();
//   }
// })(macroCommand);

macroCommand.execute()
