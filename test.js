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

/*--给页面元素增加遮罩--*/
function addMask(elem,opacity){
	var position = {
		 left:elem.offsetLeft,
		 top:elem.offsetTop,
		 width:elem.offsetWidth,
		 height:elem.offsetHeight,
		 zIndex:elem.style.zIndex 
	};
	var mask = document.creatElement("div");
	mask.style.position = "absolute";
	mask.style.left = position.left + "px";
	mask.style.top = position.top + "px";
	mask.style.width = position.width + "px";
	mask.style.height = position.height + "px";
	mask.style.zIndex = position.zIndex + 5;
	mask.style.opacity= opacity;
	mask.style.filter = "alpha(opacity=" + 100 * opacity + ")";
	mask.onclick = function (){
		return false;
	};
	document.body.appendChild(mask);
}

/*---是否互质 ---*/
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
	var _isMouseDown = false;

	elem.onmousedown = function (e){
		var _isMouseDown = true,
		 	eve = e || window.event,
			mousePos = {
				left:eve.pageX,
				top:eve.pageY
			},
			pos = {
				left:this.style.left,
				top:this.style.top
			};
		elem.setAttribute("mousePos",pos);
		elem.setAttribute("pos",pos);
	}

	elem.onmousemove = function (e){
		if(_isMouseDown){
			var eve = e || window.event;
			var mousePos = {
				left:eve.pageX,
				top:eve.pageY
			};
			var prePos = this.getAttribute("pos");
			var preMousePos = this.getAttribute("mousePos");
			elem.style = {
				position:"absolute",
				left:prePos.left + (mousePos.left - preMousePos.left) + "px",
				top:prePos.top + (mousePos.top - preMousePos.top) + "px"
			};
		}

	}

	elem.onmouseup = function (e){
		_isMouseDown = false;
	}

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
function FakeSetInterval (func,interval){
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



/*--如何检测一个变量是一个Array类型--*/

function isArray(object){
	return object instanceof Array;
}

function isArray(object){
    return object && typeof object==='object' &&
            Array == object.constructor;
}

function isArray(object) {
    return Object.prototype.toString.call(object) === ‘[object Array]‘;
}

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
		    if(document.addEventListener){ //Non IE
		    	tag.addEventListener("click",function(e){
		    		alert(this.tagName);
		    		e.stopPropagation();  
		    	},false);
		    }else if(document.attachEvent){ //IE
		    	tag.attachEvent("onclick",function(){
		    		alert(this.tagName);
		    		window.event.cancelBubble = true;  
		    	});
		    }
		} 
	}
}


/*--异步加载js方案--*/


/*--请设计一套方案，用于确保页面中JS加载完全--*/


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


/*--获取非行间样式--*/



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

/*--倒数计时程序--*/