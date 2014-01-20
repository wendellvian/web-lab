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
function startMove(obj, json, fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;	// 标志运动结束，所有值都到达
		for(attr in json){
			// 1.取当前的值
			var iCur = 0;
			if(attr == "opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			// 2.算速度
			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			// 3.检测停止
			if(iCur != json[attr]){
				bStop = false;
			}
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")";
				obj.style.opacity = (iCur+iSpeed)/100;
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
		}
		// 整个循环里的值都到了才停止运动
		if(bStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30);
}




				