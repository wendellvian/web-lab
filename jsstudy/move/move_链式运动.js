// 获取元素内部样式
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}

// 获取内部样式及设置样式
function css(obj, attr, value){
	if(arguments.length == 2){
		return getStyle(obj, attr);
	}else if(arguments.length == 3){
		return obj.style[attr] = value;
	}
}

// 获取元素类
function getByClass(oParent, sClass){
	var aEle = oParent.getElementsByTagName("*");
	var i = 0;
	var aResult = [];
	for(i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

// 运动框架
function startMove(obj, attr, iTarget, fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCur = 0;
		if(attr == "opacity"){
			iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
		}else{
			iCur = parseInt(getStyle(obj,attr));
		}
		var iSpeed = (iTarget-iCur)/8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(iCur == iTarget){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}else{
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")";
				obj.style.opacity = (iCur+iSpeed)/100;
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
	},30);
}