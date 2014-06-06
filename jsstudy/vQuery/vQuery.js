//------------------事件绑定方法
function myAddEvent(obj, sEv, fn){
	if(obj.attachEvent){
		obj.attachEvent("on"+sEv, function (){
			fn.call(obj);
		});
	}else{
		obj.addEventListener(sEv, fn, false);
	}
}

//--------------------------查找class方法
function getByClass(oParent, sClass){
	var aEle = oParent.getElementsByTagName("*");
	var aResult = [];
	var i = 0;

	for(i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

//----------------- 获取元素内部样式(非行间)
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}

//-------------------------
function vQuery(vArg){
	// 用来保存选中的元素
	this.elements = [];

	switch(typeof vArg)
	{
		case "function":             // 函数
			// window.onload = vArg;
			myAddEvent(window, "load", vArg);
			break;
		case "string":
			switch(vArg.charAt(0)){
				case "#":           // ID
					var obj = document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case ".":           // class
					this.elements = getByClass(document, vArg.substring(1));
					break;
				default:            // tagName
					this.elements = document.getElementsByTagName(vArg);
			}
			break;
		case "object":              // 对象
			this.elements.push(vArg);
			break;
	}
}

//------------------- click方法
vQuery.prototype.click = function (fn){
	var i = 0;
	for(i=0;i<this.elements.length;i++){
		myAddEvent(this.elements[i], "click", fn);
	}
};
//--------------------show方法
vQuery.prototype.show = function (){
	var i = 0;
	for(i=0;i<this.elements.length;i++){
		this.elements[i].style.display = "block";
	}
}
//--------------------hide方法
vQuery.prototype.hide = function (){
	var i = 0;
	for(i=0;i<this.elements.length;i++){
		this.elements[i].style.display = "none";
	}
}
//--------------------hover方法
vQuery.prototype.hover = function (fnOver, fnOut){
	var i=0;
	for(i=0;i<this.elements.length;i++){
		myAddEvent(this.elements[i], "mouseover", fnOver);
		myAddEvent(this.elements[i], "mouseout", fnOut);
	}
}
//--------------------css方法
vQuery.prototype.css = function (attr, value){
	if(arguments.length == 2){                    // 设置样式
		var i = 0;
		for(i=0;i<this.elements.length;i++){
			this.elements[i].style[attr] = value;
		}
	}else{
		// return this.elements[0].style[attr];
		return getStyle(this.elements[0], attr);
	}
}
//-----------------toggle方法
vQuery.prototype.toggle = function (fn1, fn2){
	
}

//-------------------------
function $(vArg){
	return new vQuery(vArg);
}