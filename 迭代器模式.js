// 迭代器模式： 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，
// 而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，
// 在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素

// 迭代器模式的实质： 循环访问对象的各个元素。 比如： forEach, 

// 例子1  实现一个自己的迭代器

let each = function (arr, callback) { 
    for (let i = 0; i < arr.length; i++) { 
        callback.call(this, i, arr[i])
    }
}

each([1, 2, 3], (i, item) => { 
    console.log(i, item)
})



// 例子2 迭代不同的上传方式，直到上传成功为止

// 迭代器模式和策略模式都能解决大量if else的问题

var getActiveUploadObj = function(){
    try{
      return new ActiveXObject( "TXFTNActiveX.FTNUpload" );    // IE上传控件
    }catch(e){
      return false;
    }
};

var getFlashUploadObj = function(){
    if ( supportFlash() ){     // supportFlash函数未提供
      var str = '<object type="application/x-shockwave-flash"></object>';
      return $( str ).appendTo( $('body') );
    }
    return false;
};
var getFormUpladObj = function(){
    var str = '<input name="file" type="file" class="ui-file"/>';  // 表单上传
    return $( str ).appendTo( $('body') );
};

var iteratorUploadObj = function(){
    for ( var i = 0, fn; fn = arguments[ i++ ]; ){
      var uploadObj = fn();
      if ( uploadObj ! == false ){
          return uploadObj;
      }
    }
};

var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUpladObj );