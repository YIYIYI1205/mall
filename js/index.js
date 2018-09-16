
// 从url获取openid和usertype
var url =location.search;
var wanzhengUrl="http://www.lexianglive.com/view/index.html"+url;
console.log(wanzhengUrl);
var theRequest = new Object();
        // 有问号代表有参数
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);//获取中文参数转码<span style="font-family: Arial, Helvetica, sans-serif;">decodeURI</span>，（unescape只针对数字，中文乱码)
            }
        }
var openid=angular.fromJson(decodeURI(theRequest.openid));
var usertype=angular.fromJson(decodeURI(theRequest.usertype));        
var app=angular.module("app",[]);		
app.controller("controller",["$scope","$http",function($scope,$http){
	$scope.openid=parseInt(theRequest.openid);
	$scope.usertype=parseInt(theRequest.usertype);
	$http({
				url:"http://www.lexianglive.com/getgifcon",
				method:"get",
				params:{
					openid:openid,
					usertype:usertype,
					url:wanzhengUrl
				}
			}).success(function(resResult){
				console.log(resResult);
				var res=resResult.result;
				wx.config({
    				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    				appId: res.appId, // 必填，公众号的唯一标识
   		 			timestamp: res.timestamp, // 必填，生成签名的时间戳
    				nonceStr: res.nonceStr, // 必填，生成签名的随机串
    				signature: res.signature,// 必填，签名
    				jsApiList: ['hideMenuItems','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
				});
				wx.ready(function(){
    				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					console.log("123");
					wx.hideMenuItems({
						menuList: ["menuItem:copyUrl","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone","menuItem:editTag","menuItem:delete", "menuItem:originPage","menuItem:readMode","menuItem:openWithQQBrowser","menuItem:openWithSafari", "menuItem:share:email","menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
					});
					wx.onMenuShareTimeline({
                        title: '乐享生活服务平台', // 分享标题
                        link: wanzhengUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://www.lexianglive.com/images/LX.jpeg', // 分享图标
                        success: function () {
                        // 用户点击了分享后执行的回调函数
                        },
                    });
                    wx.onMenuShareAppMessage({
                        title: '乐享生活服务平台', // 分享标题
                        desc: '特惠吃喝玩乐产品', // 分享描述
                        link: wanzhengUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://www.lexianglive.com/images/LX.jpeg', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户点击了分享后执行的回调函数
                        }
                    });
				});
				wx.checkJsApi({
    				jsApiList: ['hideMenuItems','onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    				success: function(res) {
    				// 以键值对的形式返回，可用的api值true，不可用为false
    				
    				}
				});
			})
	$http({
		url:"http://lexianglive.com/lx/products/getProducts",
		// 必须写method:get否则请求会报403
		method:"get"
	}).success(function(res){
		console.log(res);
		$scope.itmes=res.result;
		// 如果已售为0时，后台传过来null，前台设置它为0
		for(var i=0;i<$scope.itmes.length;i++){
			if($scope.itmes[i].sails==null){
				$scope.itmes[i].sails=0;
			}
		}
	});
	$scope.search="";
	// 搜索框
	$scope.searchMethod=function(e){
		var keycode = window.event?e.keyCode:e.which;
		// keycode等于13代表回车或者手机上点搜索
		if(keycode==13){
			if($scope.itmes==""){
				alert('请输入检索内容！');
				return;
			}else{
				$http({
					url:"http://lexianglive.com/lx/products/searchProducts",
					method:"get",
					headers:{"content-Type":"application/x-www-form-urlencoded"},
					params:{
						searchtitle:$scope.search
					}
				}).success(function(res){
					if(res.errCode==3000){
						alert("未搜索到");
					}else{
						$scope.itmes=res.result;
					}
				});	
			}	
		}
	}
	// 搜索框点叉或者点取消
	$scope.cancel=function(){
		// 点击取消后重新获取数据
		$http({
			url:"http://lexianglive.com/lx/products/getProducts",
			method:"get"
		}).success(function(res){
			$scope.itmes=res.result;
		});
		$scope.search="";
	}
	//点击列表跳转详情页面
	$scope.goto=function (msg,openid,usertype) {
			// 把这三个参数拼接在url后面
    		var hre = 'detail.html?msg=' + angular.toJson(msg)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
		};
	//跳转index页面
	$scope.index=function (openid,usertype) {
			// 把这三个参数拼接在url后面
    		var hre = 'index.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
		};
	// 跳转my页面
	$scope.my=function (openid,usertype) {
			// 把这三个参数拼接在url后面
    		var hre = 'my.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"#/all";
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
		};							
}]);
