function compare(propertyName) {
	return function(object2, object1) {
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if(value2 < value1) {
			return -1;
		} else if(value2 > value1) {
			return 1;
		} else {
			return 0;
		}
	}
}

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

//判断图片是否存在
function isImageExist(url) {
	if(url.length == 0) {
		return false;
	}
	var isExist = true;
	$.ajax(url, {
		type: 'get',
		async: false, //取消ajax的异步实现
		timeout: 1000,
		success: function() {},
		error: function() {
			isExist = false;
		}
	});
	return isExist;
}

function urltobase64(url) {
	var image = new Image();
	image.src = url;
	return getBase64Image(image);
}

//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > 600) {
			height = Math.round(height *= 600 / width);
			width = 600;
		}
	} else {
		if(height > 600) {
			width = Math.round(width *= 600 / height);
			height = 600;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}

//判断两个货币对象是否相同
function compareasset(_obj1, obj2) {
	$.each(_obj1, function(index, value) {

	});
}

Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
	var r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch(e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if(c > 0) {
		var cm = Math.pow(10, c);
		if(r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return(arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function(arg) {
	return accAdd(arg, this);
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch(e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function(arg) {
	return accMul(arg, this);
};

//对象按字母顺排序
function objKeySort(obj) { //排序的函数
	var newkey = Object.keys(obj).sort();　　 //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	for(var i = 0; i < newkey.length; i++) { //遍历newkey数组
		newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对,每个值都转化成浏览器能识别的编码
	}
	return newObj; //返回排好序的新对象
}

function objtosignstr(obj) { //对象生成待签名字符串
	return $.param(objKeySort(obj));
}

function encode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOP" +
		"QRSTUVWXYZabcdef" +
		"ghijklmnopqrstuv" +
		"wxyz0123456789+/" +
		"=";

	input = escape(input);
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if(isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if(isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +
			keyStr.charAt(enc1) +
			keyStr.charAt(enc2) +
			keyStr.charAt(enc3) +
			keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
}

function decode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOP" +
		"QRSTUVWXYZabcdef" +
		"ghijklmnopqrstuv" +
		"wxyz0123456789+/" +
		"=";
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if(base64test.exec(input)) {
		alert("There were invalid base64 characters in the input text.\n" +
			"Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
			"Expect errors in decoding.");
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if(enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if(enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return unescape(output);
}

/*
 * 用自己的私钥和对方的公钥加密
 * 返回base64编码字符串
 */
function encrypt_str25519(message, time, their_publickey, mykey) {
	var message = nacl.util.decodeUTF8(message);

	var timearr = new Uint8Array(24); /*//要求24位*/
	timearr.set(StellarSdk.Buffer(time));

	var theirDHPublicKey = publicTokeypair(their_publickey);
	var myDHSecretKey = secretTokeypair(mykey);

	var encryptedMessage = nacl.box(message, timearr, theirDHPublicKey, myDHSecretKey);

	return new StellarSdk.Buffer.from(encryptedMessage).toString("base64");
}

/*这里是解密*/
function decrypt_str25519(message, time, their_publickey, mykey) {
	messagearr = new StellarSdk.Buffer(message, "base64");
	messagearr = new Uint8Array(messagearr);

	var timearr = new Uint8Array(24); /*//要求24位*/
	timearr.set(StellarSdk.Buffer(time));

	var theirDHPublicKey = publicTokeypair(their_publickey);
	var myDHSecretKey = secretTokeypair(mykey);
	var decryptedMessage = nacl.box.open(messagearr, timearr, theirDHPublicKey, myDHSecretKey);
	var retxt = new StellarSdk.Buffer(decryptedMessage).toString();
	return retxt;
}

function secretTokeypair(str) {
	var a = StellarSdk.StrKey.decodeEd25519SecretSeed(str);
	var b = new Uint8Array(a);
	var c = ed2curve.convertSecretKey(b);
	//console.log(c);
	return c;
}
function publicTokeypair(str) {
	var a = StellarSdk.StrKey.decodeEd25519PublicKey(str);
	var b = new Uint8Array(a);
	var c = ed2curve.convertPublicKey(b);
	//console.log(c);
	return c;
}

/*随机字符串*/
function random(length) {
	var str = Math.random().toString(36).substr(2);
	if(str.length >= length) {
		return str.substr(0, length);
	}
	str += random(length - str.length);
	return str;
}

/*随机数字*/
function randomNum(minNum, maxNum) {
	switch(arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

/*转换时间*/
function translatetime(creattime){
	if(!creattime || creattime == "-") return creattime;
	creattime=creattime.replace(/-/g,"/");
	var t = new Date(creattime).getTime();
	var targetDate = new Date(t);
	return targetDate.Format("yyyy-MM-dd hh:mm");
}

/*将base64转化成buffer再转化成原始字符串*/
function base64_to_string(str){
	return new StellarSdk.Buffer(str,"base64").toString("hex");	
}

/*将字符转化成buffer再转化成base64*/
function string_to_base64(str){
	return new StellarSdk.Buffer(str,"hex").toString("base64");	
}

