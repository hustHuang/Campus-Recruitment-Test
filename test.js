/*--阿里巴巴笔试题 ，按name属性给数组排序，并输出为table--*/
var data = [
{
  name:"chuang",
  tel:"123",
  addr:"luoyu"
},{
  name:"aliu",
  tel:"456",
  addr:"yujia"
},{
  name:"zhang",
  tel:"789",
  addr:"nanshan"
}];

function parseData (arr){
   var newArr = arr.sort(function (a,b){
   	    var aStr = a.name,bStr = b.name,i = 0;
   	    for(;i < aStr.length && i < bStr.length; i++){
   	       if (aStr[i] != bStr[i]) {
   	       		return aStr.charCodeAt(i) - bStr.charCodeAt(i);
   	       };
   	    }
   	    return 0;
   });
   return newArr;
}

function makeTable (data){
  var htmlStr;
  $.each(data,function(i,e){
    if(!htmlStr){
    	htmlStr = "<table><tr>";
    	for(var index in e){
    		htmlStr += "<td>"+index+"</td>";
    	}
    	htmlStr += "</tr>";
    }

    htmlStr += "<tr>";
    for(var i in e){
    	htmlStr += "<td>" + e[i] + "</td>";;
    }
    htmlStr += "</tr>";
  });
  htmlStr += "</table>";

  $('body').append(htmlStr);
}

makeTable(parseData(data));

/*--给类里面post开头的方法增加一个check函数后再操作--*/

function transformPagePostFunc() {
    var funcName, originFunc;
    for (funcName in Page.prototype) {
        if (/^post\S+/.test(funcName) && typeof(Page.prototype[funcName]) === typeof(Function)) {
            Page.prototype[funcName] = (function() {
                var originFunc = Page.prototype[funcName];
                return function() {
                    if (check()) {
                        originFunc.apply(this, arguments);
                    }
                };
            })();
        }
    }
}

function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name+'='+value+';expires='+oDate+';path=/';
}

function getCookie(name) {
    var arr = document.cookie.split('; ');
    var i = 0;
    for(i=0; i<arr.length; i++) {
        var arr2 = arr[i].split('=');
        if(arr2[0] == name) {return arr2[1];}
    }
    return '';
}
function removeCookie(name) {
    setCookie(name,'',-1);
}

/*--解析url的参数--*/
function parseParam(url){
    var result = {}, params ;
    params = /\?(.*)/.exec(url)[1];
    params = params.split("&");
    for(var i = 0,len =  params.length; i<len ; i++){
    	var param = params[i].split("=");
    	if(param[0]){
    		result[param[0]] = param[1];
    	}
    }
    
    return result;
}
var url = "www.a.com?a=1&b=2&c=3";
console.log(parseParam(url));


/*--获取网页元素的绝对位置--*/
function getPosition(element){
	var results = {};
	results.elemLeft = (function(elem){
		var actualLeft = elem.offsetLeft,
		 	elemParent = elem.offsetParent;
		while(elemParent != null){
			actualLeft += elemParent.offsetLeft;
			elemParent = elemParent.offsetParent;
		}
		return actualLeft;
	})(element);

	results.elemTop = (function(elem){
		var actualTop = elem.offsetTop,
		    elemParent =  elem.offsetParent;
		while(elemParent != null){
		    actualTop += elemParent.offsetTop;
		    elemParent = elemParent.offsetParent;
		 }
		 return actualTop;
	})(element);
	return results;
}

//简化版
function getPosition(elem){
	var actualLeft = elem.offsetLeft,
		 actualTop = elem.offsetTop,
	 	elemParent = elem.offsetParent;
	while(elemParent != null){
		actualLeft += elemParent.offsetLeft;
		 actualTop += elemParent.offsetTop;
		elemParent = elemParent.offsetParent;
	}
	return {
		left:actualLeft,
		top:actualTop
	};
}

/*--给页面元素增加遮罩,阿里笔试题--*/
function addMask(elem,opacity){
	var position = {
		 left:getPosition(elem).elemLeft,
		 top:getPosition(elem).elemTop,
		 width:elem.offsetWidth,
		 height:elem.offsetHeight,
		 zIndex:elem.style.zIndex 
	};
	var mask = document.createElement("div");
	mask.style.position = "absolute";
	mask.style.left = position.left + "px";
	mask.style.top = position.top + "px";
	mask.style.width = position.width + "px";
	mask.style.height = position.height + "px";
	mask.style.zIndex = position.zIndex + 5;
	mask.style.opacity= opacity;
	mask.style.filter = "alpha(opacity=" + 100 * opacity + ")";
	mask.style.backgroundColor = "#000";
	mask.onclick = function (){
		return false;
	};
	document.body.appendChild(mask);
}

var elem = document.getElementById("site");
addMask(elem,1);


/*--获取网页元素的相对位置---*/

function getElementViewLeft(element){
　　　　var actualLeft = element.offsetLeft,
			 actualTop = element.offsetTop,
			   current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
			 actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　if (document.compatMode == "BackCompat"){//IE6
　　　　　　var elementScrollLeft = document.body.scrollLeft,
				 elementScrollTop = document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollLeft = document.documentElement.scrollLeft, 
				 elementScrollTop = document.documentElement.scrollTop; 
　　　　}
　　　　return {
			left:actualLeft-elementScrollLeft,
			top:actualTop-elementScrollTop
		}
}

//仅仅获取顶部的相对位置
function getElementViewTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　 if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollTop=document.documentElement.scrollTop; 
　　　　}
　　　　return actualTop-elementScrollTop;
}



/*---判断两数字是否互质 ，阿里笔试题---*/
function isPrime(){
	if(a <= 0 || b <= 0 ){
		return false;
	}
	function Prime = function(a, b){
		if(b == 0){
	      return a;
		}
		return Prime(b,a%b);
	}

	if(Prime(a,b) == 1){
	 	return true;
	}else{
	 	return false;
	}
}

	/*--计算页面上停留时间--*/
	function calcTime (){
		var elems = document.getElementsByTagName("div");
		for(var i = 0 ,len = elems.length; i < len ;i++ ){
			if(elems[i].hasAttribute("data-spmid")){
				elems[i].setAttribute("data-time",0);
				elems[i].onmouseover = function (){
					var id = this.getAttribute("data-spmid");
					if(id){
						var startTime = new Date().valueOf()/1000;
						this.setAttribute("st" ,startTime); 
					}
				}

				elems[i].onmouseout = function (){
					var id = this.getAttribute("data-spmid");
					if(id){
						var endTime = new Date().valueOf() /1000,
						 	time = endTime - this.getAttribute("st")  + parseInt(this.getAttribute("data-time"));
						this.setAttribute("data-time",time);
						this.innerHTML = time;
					}
				}
			}
		}
	}

	document.body.onload = function (){
		calcTime();
	}


/*--模拟选择器--*/
var query = function(selector){
	var idReg = /^#\w+/ ,classReg = /^\.\w+/,tagReg = /\w+/,elems = [], elem ; 
	if(idReg.test(selector)){
		elem = document.getElementById(selector.substring(1));
		elems.push(elem);
	}

	if(classReg.test(selector)){
		var allelems = document.getElementsByTagName("*"),
			className = selector.substring(1);
		for(var i = 0;i < allelems.length; i++){
			var item = allelems[i];
			if(item.hasAttribute("class")){
				var classNames = item.getAttribute("class");
				classNames = classNames.split(" ");
				for(var j = 0 ,len = classNames.length ; j < len;j++ ){
					if(classNames[j] == className){
						elems.push(item);
						break;
					}
				}
			}
		}
		return elems;
	}

	if(tagReg.test(selector)){
		elems = document.getElementsByTagName(selector);
		return elems;
	}

	
}

/*--数组出现最多次数的元素--*/
Array.prototype.maxCount = function (){
	var arr = this , arrObj = {} ,max = 0 ,maxCountElem;
	for(var i = 0,len = arr.length; i < len; i++ ){

		if(!arrObj[arr[i]]){
			arrObj[arr[i]] = 1 ;
		}else{
			arrObj[arr[i]] ++ ;
		}
	}

	for(var index in arrObj){
		if(arrObj[index] > max){
			max = arrObj[index];
			maxCountElem = index;
		}
	}
	return maxCountElem;
};

/*--数组排序--*/
function mySort(){
	var tags = new Array();
	var inputArr = arguments,len = arguments.length;

	for(var i = 0 ; i < len; i++){
		for(var j = i; j < len; j++){
			if(inputArr[i] > inputArr[j]){
				var temp = inputArr[i];
				inputArr[i] = inputArr[j];
				inputArr[j] = temp;
			}
		}
	}
	tags = inputArr;
	return tags;
}

/*--利用原生的sort方法--*/

function myArrSort(){
	var tags = new Array();
	for(var i = 0 , len = arguments.length ; i < len ; i++){
		tags[i] = arguments[i];
	}
	//tags = Array.prototype.slice.call(arguments, 0);
	tags.sort(function(a,b){
		return a-b;
	});

	return tags;
}

/*--实现div可拖拽--*/
function dragElem(id){
	var elem = document.getElementById(id);
	var _isMouseDown = false, preMousePos, prePos;

	elem.onmousedown = function (e){
			_isMouseDown = true,
		 	eve = e || window.event,
			preMousePos = {
				left:eve.pageX,
				top:eve.pageY
			},
			prePos = {
				left:parseInt(this.style.left || 0),
				top:parseInt(this.style.top || 0)
			};
			console.log(prePos);
			if(elem.addEventListener){
				elem.addEventListener("mousemove",mousemoveHandler,false);
			}else if(elem.attachEvent){
				elem.attachEvent("onmousemove",mousemoveHandler);
			}
	};

	var mousemoveHandler = function (e){
		if(_isMouseDown){
			var eve = e || window.event;
			var mousePos = {
				left:eve.pageX,
				top:eve.pageY
			};
			console.log(mousePos);
			elem.style.left = prePos.left + (mousePos.left - preMousePos.left) + "px";
			elem.style.top = prePos.top + (mousePos.top - preMousePos.top) + "px";
		}

	};

	elem.onmouseup = function (e){
		_isMouseDown = false;
		prePos = null;
		preMousePos = null;
		if(elem.removeEventListener){
			elem.removeEventListener("mousemove",mousemoveHandler,false);
		}else if(elem.detachEvent){
			elem.detachEvent("onmousemove",mousemoveHandler);
		}
	};
}



/*--获取某一个 DOM 元素的所有父亲节点--*/

function getParents(elem){
	var arr = [];
	while(elem.parentNode){
		arr.push(elem.parentNode);
		elem = elem.parentNode;
	}
	return arr;
}
 var elem = document.getElementById("#");
 getParents(elem);



/*--弹出页面链接序号--*/
function linkAlert(){
	var links = document.links;
	for(var i = 0 , len = links.length; i < len; i++){
		links[i].onclick = function (idx){
			return function (){
				alert(idx + 1);
				return false;
			}
		}(i);
	}
}

function linkAlert(){
	var links = document.getElementsByTagName("a");
	for(var i = 0 , len = links.length; i < len; i++){
		var slink = links[i];
		slink.setAttribute("idx",i);
		slink.onclick = function (){
			alert(this.getAttribute("idx"));
			return false;
		}
	}
}
linkAlert();


/*--数组，保存小写英文字符串，把它按照除了第一个字母外的字符的字典顺序排序--*/
function sortBySubChar(arr){
	arr.sort(function(a,b){
		var sa = a.length,
			sb = b.length;
		for(var i = 1; i < sa && i < sb ; i++){
			if(a.charCodeAt(i) != b.charCodeAt(i)){
				return a.charCodeAt(i) - b.charCodeAt(i);
			}
		}
		return 0;
	});
	return arr;
}

var arr = ["abca","cabe","dcba"];
sortBySubChar(arr);


/*--简单解法--*/
var sortBySubLetter = function(x, y) {
    if (typeof x === 'string' && typeof y === 'string') {
        var a = x.slice(1),b = y.slice(1);
        if (a > b) return 1;
        else if (a < b) return -1;
    }
    return 0;
}
var arr = ["abd","cba","ba"];
arr.sort(sortBySubLetter);



/*--PHP的类shuffle功能--*/
function shuffle(){

	//有问题的解法
	Array.prototype.shuffle = function (){
		var i , j ,temp ,len = this.length;
		for(i = 0; i < len; i++){
			rand = parseInt(Math.random() * len);
			temp = this[i] ;
			this[i] = this[rand];
			this[rand] = temp;
		};
		return this;
	};
    
    //网上解法
    if (!Array.prototype.shuffle) { 
		Array.prototype.shuffle = function() {        
			for(var j, temp, i = this.length; i; j = parseInt(Math.random() * i), temp = this[--i], this[i] = this[j], this[j] = temp);
		   	return this;
		};
	}
}


/*--最长公共子串问题,基本方法--*/
function maxCommonStr(str1,str2){
    var str1Len = str1.length , str2Len = str2.length ,commonArrObj = {}, maxCommonStr, maxLen = 1;
	for(var i = 0 ; i < str1Len ; i++ ){
		for (var j = 0; j < str2Len; j++) {
			for( var k = 1 ; k <= str2Len ; k++){
				if(str1.slice(i,i+k) == str2.slice(j,j+k)){
					commonArrObj[str1.slice(i,i+k)] = k;
				}else{
					break;
				}
			}
		}
	}

	for(var arr in commonArrObj){
		console.log(arr);
	    if(commonArrObj[arr] > maxLen){
	    	maxLen = commonArrObj[arr];
	    	maxCommonStr = arr;
	    }
	}
	console.log(maxCommonStr);
	return maxCommonStr;
}
//测试用例
var str1 = "yuiopasdfgqweasdsgdsa",str2 = "sdhhfwieasdfgsad";
maxCommonStr(str1,str2);



/*-- 修改代码，alert出hello world --*/
var foo = function(){
  this.hello="hello world";
};

foo.prototype.sayHello = function(){
  alert(this.hello);
};

foo.prototype.bar = function(){
  setTimeout(this.sayHello, 1000);
  setTimeout(this.sayHello.call(this), 1000);//修改后
};

var f = new foo();
f.bar();

/*--setTimeout 模拟 setInterval --*/
function fakeSetInterval (func,interval){
  setTimeout(function (){
 	func();
 	setTimeout(arguments.callee,interval); 			
  },interval);
}

//测试用例
function func(){
	console.log("hello");
}

FakeSetInterval (func,5000);


/*--求一个字符串的字节长度--*/
function GetBytes(str){

  var len = str.length;	 
  var bytes = len;	//先全部按英文字符来对待
  for(var i = 0; i < len; i++){ 
  	if (str.charCodeAt(i) > 255) {
  		bytes++;    //汉字，字节长度加 1
  	}
  }
  return bytes;

}

console.log(GetBytes("你好,as"));


/*--数组去重复--*/
Array.prototype.unique = function (){
	var arr = this,len = arr.length, newArr = [];
	for(var i = 0; i < len; i++ ){
		if(newArr.indexOf(arr[i]) < 0){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

var arr = [1,2,3,4,5,6,1,2,3].unique();
console.log(arr);


/*--如何检测一个变量是一个String类型--*/
function IsString(str){
	return (typeof str == "string" || str.constructor == String);
}

IsString("aStr");


/*--如何检测一个变量是数组Array类型--*/

//1.
function isArray(object){
	return object instanceof Array;
}

//2.
function isArray(object){
    return object && typeof object==='object' &&
            Array == object.constructor;
}

//3.
function isArray(object) {
    return Object.prototype.toString.call(object) === ‘[object Array]‘;
}

//4.
function isArray(object){
    return  object && typeof object==='object' &&    
            typeof object.length==='number' &&  
            typeof object.splice==='function' &&    
             //判断length属性是否是可枚举的 对于数组 将得到false  
            !(object.propertyIsEnumerable('length'));
}


/*--计算当年还剩多少时间的倒数计时程序,要求网页上实时动态显示“××年还剩××天××时××分××秒”--*/
function getYearTimeTips(){
	var timer = setInterval(function(){
		var currentYear = new Date().getFullYear();
		var now = new Date().getTime();
		var end = new Date(currentYear + 1,0,0).getTime();
		var time = end - now;
		var days = parseInt(time/(1000*3600*24)) ;
		time = time - days * 1000*3600*24
		var hours = parseInt(time/(1000*3600));
		time = time - hours * 1000*3600;
		var minutes =parseInt(time/(1000*60));
		time = time - minutes * 1000 *60;
		var seconds = parseInt(time/1000);

		var tips = currentYear + "年还剩" + days +"天" + hours +"时" + minutes + "分" + seconds +"秒";
		console.log(tips);
		
		if(days == 0 && hours == 0 && minutes == 0 && seconds == 0){
			clearInterval(timer);
		}

	},1000);

}
getYearTimeTips();


/*--JavaScript对一个对象进行深度clone--*/
function CloneObj(obj){
	if(obj == null || typeof obj !== "object"){
	  	return obj;
	}
	var newObj = obj.constructor == Array ? []:{};
	for(var index in obj){
		if(typeof obj[index] != "object"){
			newObj[index] = obj[index];
		}else{
			newObj[index] = arguments.callee(obj[index]);
		}
	}
	return newObj;
}

/*--JavaScript对一个对象拓展，使用了深度克隆 --*/
function extendObj(sObj,tObj){//tObj被扩展对象，sObj扩展对象
	for(var i in sObj){
		if(typeof sObj[i] !== "object") {
			tObj[i] = sObj[i];
		}else if(sObj[i].constructor == Array){
			tObj[i] = CloneObj(sObj[i]);
		}else if(sObj[i].constructor == Object){
			tObj[i] = tObj[i] || {};
			tObj[i] = CloneObj(sObj[i]);
		}
	}
}

/*--鼠标点击页面中的任意标签，alert该标签的名称--*/
function alertTagNames(){
	var tags = document.getElementsByTagName("*");
	for(var i = 0 ,len = tags.length; i < len; i++ ){
		var tag = tags[i];
		console.log(tag);
		if(tag.tagName != "BODY" && tag.tagName != "HTML"){
		    if(document.addEventListener){ 	//Non IE
		    	tag.addEventListener("click",function(e){
		    		alert(this.tagName);
		    		e.stopPropagation();  
		    	},false);
		    }else if(document.attachEvent){  //IE
		    	tag.attachEvent("onclick",function(){
		    		alert(this.tagName);
		    		window.event.cancelBubble = true;  
		    	});
		    }
		} 
	}
}


/*--异步加载js方案--*/

function asyncLoadScript(scriptUrl){
	var script = document.creatElement("script");
	script.type = "text/javascript";
	script.async = true;
	script.src = scriptUrl;

	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(script,s);
}

/*--加载完执行回调--*/
function loadScript(url, callback){ 
	var script = document.createElement("script") 
		script.type = "text/javascript"; 
	if (script.readyState){ //IE 
		script.onreadystatechange = function(){ 
			if (script.readyState == "loaded" || script.readyState == "complete"){ 
				script.onreadystatechange = null; 
				callback(); 
			} 
		}; 
	} else { //Others: Firefox, Safari, Chrome, and Opera 
		script.onload = function(){ 
			callback(); 
		}; 
	} 
	script.src = url; 
	document.body.appendChild(script);
} 


/*--字符串翻转--*/
function reverseStr(){

	//使用较多变量和空间
	String.prototype.reverseStr = function(){
		var arr = this ,len = arr.length - 1,newStr = '';
		 while(len >= 0){
		 	newStr += arr[len--]
		 }
		 return newStr;
	}

	//简单易行
	String.prototype.reverse = function(){
		return this.split('').reverse().join('');
	}
}

/*--随机数组可能包含数组（数组元素可能为数组），返回该数组中所有非重复元素，
例如：数组[2,3,[4,6,[3,8]],12,10]，返回为：[2,3,4,6,8,12,10]。--*/
function getUniqueElem(arr){
	var newArr = [] ,result = [];

	for(var i = 0,len = arr.length; i < len ; i++){
		var elem = arr[i],tempArr = [];
		if(elem instanceof Array){
			tempArr = getUniqueElem(elem);
			newArr = newArr.concat(tempArr);
		}else{
			newArr.push(elem);
		}
	}

	for(var j = 0 ,newLen = newArr.length; j < newLen; j++){
		if(result.indexOf(newArr[j]) < 0){
			result.push(newArr[j]);
		}
	}

	return result;
}

var arr = [2,3,[4,6,[3,8]],12,10];
var r = getUniqueElem(arr);
console.log(r);


/*--获取URL的域名、请求路径、参数和hash值--*/
function parseUrl(url){
	var result = {};
		result.host = /(.+)\/{1}/.exec(url)[1] || '';
		result.path = /.+(\/{1}.+)\?/.exec(url)[1] || '';
		result.query = /\?(.+)\#?/.exec(url) && /\?(.+)\#?/.exec(url)[1] || '';
		result.hash = /\#(.+)/.exec(url) && /\#(.+)/.exec(url)[1] || '';
	return result;
}
var url = "http://www.itmian4.com/forum.php?mod=viewthread&tid=4306&extra=page%3D1%26filter%3Dtypeid%26typeid%3D42%26typeid%3D42";
parseUrl(url);


/*--输入一个有序数组和一个数，若在数组中返回索引，若不在返回应该插入的索引--*/
function getIndex(arr,elem){
	
	if(arr.indexOf(elem) >= 0){
		return arr.indexOf(elem);
	}else{
		var len = arr.length;
		arr.length = len + 1;
		arr[len] = elem;
		arr.sort(function(a,b){
			return a - b;
		});
		return arr.indexOf(elem);
	}
}

getIndex([1,2,4,5,6,7],3);
getIndex([1,2,3,4,5,6,7],3);


/*--用正则表达式, 把 html 中的<script></script>标签过滤掉--*/
function filterScript(htmlStr){
	var regexp = new RegExp('\\<\\/?script\\>','g');
	console.log(regexp);
	htmlStr = htmlStr.replace(regexp,function(str){
		console.log(str);
		return '';
	});
	return htmlStr;
}
var testHtmlStr = "<div></div><script>alert('OK');</script><p></p><script></script>";
console.log(filterScript(testHtmlStr));

/*--获取非行间样式--*/
function getStyle(elem){
	var style;
	if(elem.currentStyle){ //IE、Opera
		style = elem.currentStyle;
	}else { //非IE，FireFox、Chrome、Safari
		style = getComputedStyle(elem,false);
	}
	for(var selector in style){
		console.log(selector +":"+ style[selector]);
	}
}
/*注：行间样式可以直接通过elem.style.**获取到*/
var elem = document.getElementById("hao123-bodyct");
getStyle(elem);



/*--判断一个字符串中出现次数最多的字符，统计这个次数--*/
function getMaxCount(str){
	var strObj = {},maxCount = 0 ,maxStr;
	for(var i =0 , len = str.length; i < len ; i++){
		var charter = str.charAt(i);
		//console.log(charter);
		if(strObj[charter] > 0){
		   strObj[charter]++;
		}else{
		   strObj[charter] = 1;
		}
	}
	for(var str in strObj){
		if(strObj[str] > maxCount ){
			maxCount = strObj[str];
			maxStr = str;
		}
	}
	console.log("maxStr : " + maxStr);
	console.log("maxCount : " + maxCount);
}

getMaxCount("qweritopyiamskdjiojproeasjdfjsdlk");

/*--鼠标单击Button1后将Button1移动到Button2的后面--*/
<input type="button" id="button1" value="button1" />
<input type="button" id="button2" value="button2" />

function switchButton(){
	var btn1 = document.getElementById("button1"),
		btn2 = document.getElementById("button2"),
		btn3 = btn2.cloneNode();
		document.body.removeChild(btn2);
		document.body.insertBefore(btn3,btn1);
}


/*--匹配邮箱的正则表达式--*/
function isEmail(str){
	var regexp = new RegExp("[a-zA-Z_0-9]+@[a-zA-Z_0-9]+\.[a-z]+(\.[a-z]{2})*");
	return regexp.test(str);
}


/*--匹配数字字符串--*/
function isNumber(str){
	var regexp_1 = new RegExp("^0\\.\\d+$");
	var regexp_2 = new RegExp("^[1-9]\\d*(\\.\\d+)?$");
	return regexp_1.test(str) || regexp_2.test(str);
}
var str1 = "2150";
console.log(isNumber(str1));
var str2 = "123.56";
console.log(isNumber(str2));
var str3 = "0.00123";
console.log(isNumber(str3));
var str4 = "012989";
console.log(isNumber(str4));


/*--下面代码的输出结果--*/
//(1).对象的引用
var obj={};
var ref=obj;
obj.name = "objectA";
obj = ["one","two","three"];
alert(ref.name);	//objectA
alert(ref.length);	//undefined

//(2).闭包相关
var outter=[];
function clouseTest(){
  var array=["one","two","three","four"];
  for(var i=0;i<array.length;i++){
    var x={};
    x.no=i;
    x.text=array;
    x.invoke=function(){
      alert(i);
    }
    outter.push(x);
  }
}
//调用这个函数
clouseTest();
outter[0].invoke(); //4
outter[3].invoke(); //4


/*--对称数定义为121,8998，88等，找出1到10000之间的所有对称数--*/
function getSymmetryNumber(number){

	var result = [];
	if(number < 0 || isNaN(number)){
		return result;
	}
	for(var i = 1 ; i <= number ; i++){
		var numArr = Number.prototype.toString.call(i);
		var len = numArr.length,leftArr,rightArr;
		if(len%2 == 0){
			leftArr = numArr.slice(0,len/2);
			rightArr = numArr.slice(len/2);
		}else{
			leftArr = numArr.slice(0,(len-1)/2);
			rightArr = numArr.slice((len+1)/2);
		}
		leftArr = leftArr.split("").reverse().join("");
		if(leftArr == rightArr){
			result.push(i);
		}
	}
	console.log(result);
	return result;
}

/*--动态打印时间，格式为yyyy-MM-dd hh:mm:ss--*/
setInterval(function(){
   var time  = new Date(),
	   year = time.getFullYear(),
	   month = format(time.getMonth() + 1),//月份这里有大坑，实际月份要加1
	   day = format(time.getDate()),
	   hour = format(time.getHours()),
	   minute = format(time.getMinutes()),
	   second = format(time.getSeconds());
	console.log(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
},1000);


function format(item){
   if(item < 10){
   	  item = "0" + item;
   }
   return item;
}

/*--查找一个字符串中第一个只出现一次的字符--*/

//常规方法
function findFisrtAloneStr(str){
	var strObj = {};     
	for(var i = 0 , len = str.length ; i < len ; i++){
		var chr = str.charAt(i);
		if(!strObj[chr]){
			strObj[chr] = 1 ;
		}else{
			strObj[chr]++ ;
		}
	}

	for(var index in strObj){
	   if(strObj[index] == 1){
	   		return index;
	   }
	}
}

//快捷方法,面试官给出的方法
function findFisrtAloneStr(str){
    for(var i = 0 , len = str.length ; i < len ; i++){
		var chr = str.charAt(i);
		var regexp = new RegExp(chr,"g");
		var result = str.match(regexp);
		if(result.length == 1){
			return chr;
		}
	}
}

var str = "asdfgadfgqwert";
console.log(findFisrtAloneStr(str));


/*--快速排序算法的js实现--*/
function quickSort(arr){
	var len = arr.length;
	if(len <= 1){
		return arr;
	}
	var pivotIndex =  Math.floor(len/2);
	var pivot = arr.splice(pivotIndex,1)[0];
	var left = [] ,right = [];
	for(var i = 0; i < len; i++){
		if(arr[i] < pivot){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}f
	}
	return quickSort(left).concat([pivot],quickSort(right));
}


/*--写一个函数，实现对象继承--*/

//1.对象拷贝继承
function extend(Child , Parent){
	var p = Parent.prototype;
	var c = Child.prototype;
	for(var pro in p){
		c[pro] = p[pro];
	}
}

//2.原型继承,利用了空类作为中介
function extend(Child , Parent){
	var F = function {};
	f.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
}


/*--锐捷笔试题，求输出--*/
var arr = [1,2,3];
var m = 0;
for(var i = 0; i < arr.length -1; i++){
	setTimeout(function(){
		m += arr[i];
		alert(m);
	},1000*i);
}
alert(m);

//分别输出 0,3,6


/*--把字符串中单词的首字母都变为大写--*/
function wordToUpperCase(str){
	var strArr = str.split(" ");
	for(var i = 0,len = strArr.length ; i < len; i++){	
		strArr[i] = strArr[i].substring(0,1).toUpperCase() + strArr[i].substring(1);
	}
	return strArr.join(" ");
}

var str = "i am a good boy";
console.log(wordToUpperCase(str));



/*--海豚浏览器，求输出结果--*/
var name = "global";
function outer(){
     var name = "inner";
     function inner(){
         document.write(this.name);
     }
     inner();
}
outer(); //global



/*--把颜色十六进制值换成数字表示 如FFF --> 255,255,255--*/
function toRGB(str){
	var result = ""; 
    for(var i = 0; i < 3 ; i++){
        var color = str.substr(2*i,2);
        var num = toNum(color);
        result += num + ",";
    }
    result = result.substring(0,result.length-1);
    return result;
}

function toNum(str){
    var _chars = "0123456789abcdef";
    var a = str.charAt(0);
    var b = str.charAt(1);
    return 16 * _chars.indexOf(a) + _chars.indexOf(b);
}
console.log(toRGB("f432ea"));


/*--不改变原数组，实现数组分组--*/

//arr [1,2,3,4,5,6,7,8] n 4 -->[[1,2],[3,4],[5,6],[7,8]] 

function divideArr(arr,n){
	var len = arr.length , i = 0;
	var result = [];
	while(i < len){
        var elem = arr.slice(i,i+n);
        result.push(elem);
        i+=n;
	}
	return result;
}

var arr = [1,2,3,4,5,6,7,8];
divideArr(arr,4);
console.log(arr);



/*--利用原型克隆对象--*/
function clone(o){
	var F = function (){};
	F.prototype = o;
	return new F();

}


/*--实现一个监听load事件的借口，多次绑定保证顺序执行，先绑定先执行，load已触发，调用时直接执行--*/
function load(callback){
    if(document.readyState == "complete"){//判断页面是否加载完全
    	callback();
    	return;
    }

	if(document.body.addEventListener){
		document.body.addEventListener("load",callback,false);
	}else{
		document.body.attachEvent("onload",callback);
	}
}


/*--页面加载完成绑定某事件，模拟onload--*/
function onPageLoad(callback){
	if(document.readyState == "complete"){
        callback();
	}else{
		document.onreadystatechange = function () {
			if(document.readyState == "complete"){
        		callback();
			}
		}
	}
}


/*--请设计一套方案，用于确保页面中JS加载完全--*/
function isScriptLoaded(script){
   		if(script.readyState){
   			script.onreadystatechange = function (){
   			  if (script.readyState ==  "loaded" || script.readyState == "complete"){ 
   			      script.onreadystatechange = null;
   			      return true;
   			  }
			}
   		}else{
   			script.onload = function (){
   				return true;
   			}
   		}
   		return false;
}

/*--判断js文件是否加载完成 --*/
function loadScript(url,callback){ 
   var script = document.createElement("script") 
   script.type = "text/javascript"; 
   if (script.readyState){//IE 
      script.onreadystatechange = function(){ 
         if (script.readyState ==  "loaded" || script.readyState == "complete"){ 
            script.onreadystatechange = null;
            
            callback(); 

         } 
      }; 

   } else { //Others: Firefox, Safari, Chrome, and Opera 
      script.onload = function(){ 
          callback(); 
      }; 
   } 
   script.src = url; 
   document.body.appendChild(script);

}

//JQuery：

$.getScript("xxx.js", function(){
   alert("xxx.js加载完毕")
});



/*--按数组元素出现的次数依次升序输出元素--*/

//方法一：先统计次数，构建键值对数组，按值来排序
function sortByCount(arr){
    var obj = {},len = arr.length;
    //统计次数，构建hash表
    for(var i = 0 ; i < len; i ++){
    	if(obj[arr[i]]){
    		obj[arr[i]] += 1;
    	}else{
    		obj[arr[i]] = 1;
    	}
    }

    //转换成数组存储
    var result = [];
    for(var j in obj){
         var elem = {};
         elem.key = j;
         elem.val = obj[j];
         result.push(elem);
    }

    //按次数排序
    result.sort(function(a,b){
    	return a.val - b.val;
    });

    //输出
    for(var k  = 0 ,num = result.length; k < num; k++){
    	console.log(result.key);
    }

}

//方法二：利用数组下标
function sortByCount(arr){
	var count = {},
		rcount = [],
		result = [],
		len = arr.length;
	//统计次数
	for(var i = 0; i < len ; i++){
		if(count[arr[i]]){
			count[arr[i]] += 1;
		}else{
			count[arr[i]] = 1;
		}
	}
	
	//把次数转换成下标
	for(var e in count){
		if(rcount[count[e]]){
			rcount[count[e]].push(e);
		}else{
			rcount[count[e]] = [e];
		}
	}
	
	//依下标序把数组连接起来
	for(var j = 0 ,rlen = rcount.length; j < rlen; j ++){
		if (rcount[j]) {
			result = result.concat(rcount[j]);
		}
	}

	//输出
	for(var k = 0, klen = result.length; k < klen; k++){
		console.log(result[k]);
	}
}

arr = [1,2,3,4,5,1,1,1,2,3,4,4,4,5];
sortByCount(arr);


/*--实现原生的ajax方法--*/
function ajax (url, method, callback ,async){
    var xhr ;
    if(window.XMLHttpRequest){
    	xhr = new XMLHttpRequest();
    }else{
    	xhr = new activeXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function (){
    	if(xhr.readyState == 4){
    		if(xhr.status == 404){
    			callback();
    		}
    	}
    }
    xhr.open(url,method,async);
    xhr.send();
}


/*下面的代码求输出:this的指向问题，总是指向执行时所在的上下文。*/
var name = "window";
var f = function {
	alert(this.name);
}

var obj = {
	name:"huang"
}
f(); //window
f.call(obj); //huang

/*下面的代码求输出：数据类型转换问题*/
//1.
var foo = "11" + 2 - "1";
console.log(foo); //111
console.log(typeof foo);//Number

//2.
var foo = "11"+2+"1";
console.log(foo);//1121
console.log(typeof foo);//String


/* 看代码给答案：考察引用数据类型的细节 */
var a = new Object();
a.value = 1;
b = a;
b.value = 2;
alert(a.value);  //2



/*--已知有字符串foo=”get-element-by-id”,写一个function将其转化成驼峰表示法”getElementById”--*/
function changeIdToCammercase(id){
	var id = id || "";
	var idArray = id.split("-");
	var newId = "";
	for(var i = 0 , len = idArray.length; i < len; i++){
		var item = idArray[i];
		var newItem = item.charAt(0).toUpperCase() + item.substring(1);
		newId += newItem;
	}
	return newId;
}
console.log(changeIdToCammercase("get-element-by-id"));


/*输出今天的日期，以YYYY-MM-DD的方式，比如今天输出2014-09-28*/
function generateDate(){
	var time = new Date(),
	year = time.getFullYear(),
	month = time.getMonth() + 1, //月份从0开始，注意！！
	date = time.getDate();
	month = month < 10 ? "0" + month : month;
	date = date < 10 ? "0" + date : date;

	var formatedTime = year + "-" + month + "-" + date;
 	console.log(formatedTime);
}



/*
//将字符串”<tr><td>{$id}</td><td>{$name}</td></tr>”中的{$id}替换成10，{$name}替换成Tony(使用正则表达式)
*/

function render(template,dataObj){
	for(var key in dataObj){
		var regexp = new RegExp("{\\$("+key+")}");
    	//console.log(regexp);
		template = template.replace(regexp,function(str,e){
			return dataObj[e];
		});
	}
	return template;
}

var template = "<tr><td>{$id}</td><td>{$name}</td></tr>";
var obj = {"id": 10 , "name": "Tony"};
var htm = render(template,obj);
console.log(htm);


/*
为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，
请写一个函数escapeHtml，将<, >, &, “进行转义
*/

function escapeHtml(str){
	var escapeStr = str.replace(/\&/g,"&amp")
					   .replace(/\</g,"&lt")
					   .replace(/\>/g,"&gt")
					   .replace(/\"/g,"&quot");

	console.log(escapeStr);
	return escapeStr;
}

//另外的解法
function escapeHtml(str) {
  var escapeStr = str.replace(/[<>"&]/g, function(match) {
      switch (match) {
         case "<":
            return "&lt;";
         case ">":
            return "&gt;";
         case "&":
            return "&amp;";
         case "\"":
            return "&quot;";
       }
   });

  console.log(escapeStr);
  return  escapeStr;
 }
 
 escapeHtml('<html>hello world! "jack" &sss <html>');


 /*用js实现随机选取10–100之间的10个数字，存入一个数组，并排序。*/

 function getRandNumber(){
 	var arr = [],
		cnt = 10;
 	while(cnt--){
 		var num = 10 + parseInt((100-10) * Math.random(0,1));
 		arr.push(num);
 	}
 	arr.sort();
 	return arr;
 }
 getRandNumber();


/* 把两个数组合并，并删除第二个元素。*/

function combine(arr1 , arr2){
	var arr = arr1.concat(arr2);
		arr.splice(1,1);
		return arr;
}

combine([1,3,2,3,4] , [5,6,7]);


/*-- 邮箱的正则匹配--*/

var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;



/*--循环中闭包的处理--*/

for(var i = 1; i <= 3; i++){
	setTimeout(function(){
		console.log(i);
	},0);
}
//输出 4 4 4
//若要输出 1 2 3 该如何处理
//1.改为立即执行函数
for(var i = 1; i <= 3; i++){
	setTimeout((function(s){
		console.log(s);
	})(i),0);
}

//2.作为参数传入
for(var i = 1; i <= 3; i++){
	(function(s){
		setTimeout(function(){
			console.log(s);
		},0);
	})(i);
}


/*--写一个function，清除字符串前后的空格,兼容所有浏览器--*/

String.prototype.trim = function(){
	return this.replace(/^\s+/,"").replace(/\s+$/,"");
}


/*--
如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；
假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？（使用callee完成）
--*/

function addRabbit(n){
	if(n == 1){
		return 2;
	}
	var num = (n-1) * 2 ;
	return num + arguments.callee(n-1);
}

/*--

实现一个函数clone，可以对JavaScript中的5种主要的数据类型
（包括Number、String、Object、Array、Boolean）进行值复制

--*/

function clone(source){
	var target;
	if(typeof source  !== "object"){
		return source;
	}

	if(source.constructor == Array){
		target = [];
	}else{ 
		target = {};
	}

    for(var key in source){
 		if(typeof source[key] == "object"){
 			target[key] = clone(source[key]);
 		}else{
 			target[key] = source[key];
 		}
    }
    return target;
}
//测试用例
console.log(clone("str"));
console.log(clone([1,2,3,4,5]));
console.log(clone({"name":"lory"}));


/*如何消除一个数组里面重复的元素*/

function uniqueList(arr){
	var len = arr.length, cnt = {} ,result = [];
	for(var i = 0; i < len ; i++){
		if(cnt[arr[i]]){
			cnt[arr[i]] ++;
		}else {
			cnt[arr[i]] = 1;
		}
	}

	for(var k in cnt){
		result.push(k);
	}
	return result;
}


/*--给函数增加bind方法，使其可以指定执行的上下文--*/
Function.prototype.bind = function(context){
	var self = this;
	return function (){
		self.apply(context,arguments);
	}
}

/*--模板引擎的实现问题--*/

//define

(function(window){
	function fn(str){
		this.str = str;
	}

	fn.prototype.format = function (){
		var arg = arguments;
		return this.str.replace(/\{(\d+)\}/gi,function(a,b){
			return arg[b] || "";
		});
	};

	window.fn = fn;

})(window);


//use
(function(){
     var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
     console.log(t.format('http://www.alibaba.com','Alibaba','Welcome'));
})();



/*--
原生JS的window.onload与Jquery的$(document).ready(function(){})有什么不同？
如何用原生JS实现Jq的ready方法
--*/
//window.onload()方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。
//$(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕

function domReady(callback){
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",function(){
			document.removeEventListener("DOMContentLoaded",arguments.callee,false);
			callback();
		},false);
	}else if(document.attachEvent){
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == "complete"){
			   document.detachEvent("onreadystatechange",arguments.callee);
			   callback();
			}
		});
	}



}


