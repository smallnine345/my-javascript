// 该方法用来区分数据的类型
// string、number、boolean、undefined、function、object
// 对null和object进行细分和重新区分
//  null（object->null） 
// object-> object、array
// 包装类
function myTypeof(origin){
    var obj = {
        "[object Object]":"object",
        "[object Array]":"array",
        "[object Number]":"number-object",
        "[object Boolean]":"boolean-object",
        "[object String]":"string-object",
    }
    if(typeof(origin) != 'object'){
        return typeof(origin)
    }else{
        if(origin == null){
            return 'null'
        }else {
            return obj[Object.prototype.toString.call(origin)]
        }
    }

}



// deepClone的对象是数组或者对象
// 判断每一项是不是原始值,或者undefined，或者null 。 是的话直接赋值，这个也是递归的出口。
// 不是原始值就根据object array设置新的空数组或空对象
// 递归
function deepClone(origin,target){
    target = target || (myTypeof(origin)==='object' ? {} : []);//给了值就用，没有给就判断是数组还是对象
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){ //判断该属性是否是原型上的属性，若不是，返回true
            if(typeof(origin[prop]) != 'object' || origin[prop] == undefined || origin[prop] == null){//判断是否是原始值，null，undefined
                target[prop] = origin[prop] //直接赋值
            }else{
               target[prop] = myTypeof(origin[prop]) === 'object' ? {} : []; // 是对象，就赋值target，是数组，就赋值[]
               deepClone(origin[prop],target[prop]) // 递归
            }
        }
    }
    return target
}

// unique 数组去重 
Array.prototype.unique = function(){
    var len = this.length,
        temp = {},
        result = [];
    for(var i = 0 ; i < len ; i++ ){
        if( !temp[this[i]] ){
            temp[this[i]] = 'i';
            result.push(this[i])
        }
    }
    return result
}

// 圣杯模式

var inherit = (function(){
    function F(){};
    return function(Origin,Target){
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}())

