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


// 获取滚动条滚动的距离
function getScrollOffset(){
    if(window.pageXoffset){
        return {
            x : window.pageXoffset,
            y : window.pageYoffset
        }
    }else{
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 利用childNodes方法筛选出子元素节点
Element.prototype.retElementChild = function(){
    var child = this.childNodes,
        len = child.length,
        i,
        arr = [];
        for(i = 0 ; i < len;i++){
            if(child[i].nodeType == 1){
                arr.push(child[i])
            }
        }
    return arr
}

// 查看视口的尺寸
function getViewportOffset(){
    if(window.innerWidth){
        return {
            'width' : window.innerWidth, 
            'height': window.innerHeight
        }
    }else{
        if(document.compatMode === 'BackCompat'){
            return {
                'width' : document.body.clientWidth,  //怪异模式
                'height': document.body.clientHeight  //怪异模式
            }
        }else{
            return {
                'width' : document.documentElement.clientWidth , //标准模式
                'height': document.documentElement.clientHeight  //标准模式
            }
        }

    }
}

//  查看元素相对于文档的坐标

HTMLElement.prototype.getElementPosition = function(){
    var obj = {
        x:0,
        y:0
    },
        that = this;
    while(that.offsetParent){
        obj.x += that.offsetLeft;
        obj.y += that.offsetTop;
        that = that.offsetParent
    }
    obj.x += that.offsetLeft;
    obj.y += that.offsetTop;
    return obj
}


// 获取元素的css样式  getComputeStyle 只读
HTMLElement.prototype.getStyle = function(prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(this,null)[prop]  //返回的值是计算过的
    }else{
        return this.currentStyle[prop]  // 返回的值不是计算的
    }
}

// 运动函数
// getStyle
function move(dom,obj){
    var l = parseInt( dom.getStyle.left ),
        prop,
        key = true,
        iCur,
        speed,
        timer;
    timer = setInterval(()=>{
        if(key){
            key = false
            for(prop in obj){
                if(obj.hasOwnProperty(prop)){
                        iCur = parseInt(dom.getStyle(prop));
                        // console.log(iCur)
                        speed = ( obj[prop] - iCur ) / 7;
                        speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed)
                        dom.style[prop] = iCur + speed + 'px'
                    }
                if(obj[prop] != iCur + speed){
                    key = true
                }
            }
        }
        if(!key){
            clearInterval(timer);
        }
    },10)
}

