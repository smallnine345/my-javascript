// 该方法用来区分数据的类型
// string、number、boolean、undefined、function、object
// 对null和object进行细分和重新区分
//  null（object->null） 
// object-> object、array
function myTypeof(origin){
    var prop = typeof(origin)
    var str = '';
    if(prop != 'object'){
        str = prop
    }else{
        if(("" + origin) == "null"){
            str = 'null'
        }else if(Object.prototype.toString.call(origin) === '[object Array]'){
            str = 'array'
        }else if(Object.prototype.toString.call(origin) === '[object Object]'){ 
            str = 'object'
        }
    }
    return str
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




