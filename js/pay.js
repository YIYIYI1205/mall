//获取链接中的参数
var url = location.search; //获取url中"?"符后的字串
var wanzhengUrl="http://www.lexianglive.com/view/pay.html"+url;
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
var product_id=angular.fromJson(decodeURI(theRequest.product_id));
var openid=angular.fromJson(decodeURI(theRequest.openid));
var usertype=angular.fromJson(decodeURI(theRequest.usertype));
if(product_id==1000){
	var product_id_daishenhe=angular.fromJson(decodeURI(theRequest.product_id_daishenhe));
}
if(theRequest.sailman_id!=null){
	var sailman_id=angular.fromJson(decodeURI(theRequest.sailman_id));
}else{
	var sailman_id=null;
}
var useStart="";     
var useEnd="";     
var app=angular.module("app",[]);
app.controller("controller",["$scope","$http",function($scope,$http){
			$scope.xiaoji=0;
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
    				jsApiList: ['chooseWXPay','hideMenuItems','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
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
				url:"http://lexianglive.com/lx/products/getProductPage",
				method:"get",
				params:{
					product_id:product_id,
					usertype:usertype
				}
			}).success(function(resResult){
				console.log(resResult);
				var res=resResult.result;
				// 海报
				$scope.haibaoimg=res.card;
				//标题
				$scope.title=res.title;
				//细分
				if(res.xifen==null){
					//判断获取数据xifen是否为空，如果为空就让isxifen为false
					$scope.ifxifen=false;
				}else{
					$scope.ifxifen=true;
					$scope.xifen=res.xifen;
					for(var i=0;i<$scope.xifen.length;i++){
						$scope.xifen[i].number=0;
					}
				}
				//邮寄状态
				$scope.youji=res.tuiyue;
				//是否需要填写日期
				$scope.shiyong=res.showtime;
				$scope.useEnd=res.useEnd;
				$scope.useStart=res.useStart;
				useStart=res.useStart;
				useEnd=res.useEnd;
			})
			$scope.decrease=function (key) {
				if($scope.xifen[key].number<=0){
					$scope.xifen[key].number=0;
				}else{
					$scope.xifen[key].number=$scope.xifen[key].number-1;
					$scope.xiaoji=0;
					for(var i=0;i<$scope.xifen.length;i++){
							$scope.xiaoji=$scope.xiaoji+$scope.xifen[i].sprice*$scope.xifen[i].number;
					}
				}
			}
			$scope.increase=function (key) {
				if($scope.xifen[key].number>=10){
					$scope.xifen[key].number=10;
				}else{
					$scope.xifen[key].number=$scope.xifen[key].number+1;
					$scope.xiaoji=0;
					for(var i=0;i<$scope.xifen.length;i++){
							$scope.xiaoji=$scope.xiaoji+$scope.xifen[i].sprice*$scope.xifen[i].number;
					}
				}
			}
			$scope.pay=function(){
				useEnd = new Date(useEnd).getTime();
				
				useStart = new Date(useStart).getTime();
				
				var usedTime = new Date($scope.usedTime).getTime();

				for(var i=0;i<$scope.xifen.length;i++){
					if($scope.xifen[i].number>$scope.xifen[i].stock){
						alert($scope.xifen[i].psummary+"库存为:"+$scope.xifen[i].stock+",您最多只能选择"+$scope.xifen[i].stock);
						return;
					}
				}
				if($scope.shiyong==1){
					if($scope.usedTime==""||$scope.usedTime==undefined){
						alert("请选择使用时间");
						return;
					}
					if(useStart<=usedTime&&usedTime<=useEnd){
					
					}else{
						alert("选择的时间不在使用日期内");
    					return;
					}
				}
				if($scope.xiaoji==0){
					alert("请选择数量");
					return;
				}
				if($scope.name==""||$scope.name==undefined){
					alert("请填写姓名");
					return;
				}
				if($scope.telephone==""||$scope.telephone==undefined){
					alert("请填写手机号");
					return;
				}
				if($scope.youji==1){
					console.log($scope.youjiAddress);
					if($scope.youjiAddress==undefined||$scope.youjiAddress==""){
						alert("请填写邮寄地址");
						return;
					}
				}
				// var order_detail=[];
				var string="";
				for(var i =0;i<$scope.xifen.length;i++){
					// 转成字符串
					if($scope.xifen[i].number==0){
						continue;
					}else{
						if(string==""){
							string=$scope.xifen[i].price_id+":"+$scope.xifen[i].number+":"+$scope.xifen[i].psummary;
							continue;
						}else{
							string=string+","+$scope.xifen[i].price_id+":"+$scope.xifen[i].number+":"+$scope.xifen[i].psummary;
						}
						
					}
				}
				if(product_id==1000){
					string=string+","+"product_id:"+product_id_daishenhe;
				}
				console.log(string);
				$http({
					url:"http://lexianglive.com/lx/orders/addorder",
					method:"get",
					params:{
						product_id:product_id,
						order_name:$scope.name,
						order_tel:$scope.telephone,
						address:$scope.youjiAddress,
						order_cost:$scope.xiaoji,
						order_detail:string,
						openid:openid,
						usertype:usertype,
						sailman_id:sailman_id,
						useday:$scope.usedTime
					}
				}).success(function(resResult){
					console.log(resResult);
					var res=resResult.result;
					if(resResult.errCode==3020){
						alert(res.stock[0].psummary+"已经售罄");
						return;
					}
					// var hre="my.html?openid="+openid+"&usertype="+usertype+"#/all";
					// location.href = hre;
					// alert(resResult);
					wx.chooseWXPay({
						timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
						package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: res.paySign,// 支付签名
						// total_fee:$scope.xiaoji,
						success: function (res) {
							// 支付成功后的回调函数
							// console.log(res);
							// 成功之后调用接口查看状态
							// alert("支付成功之后的res"+res);
								$http({
									url:"http://lexianglive.com/lx/orders/caxunder",
									method:"get",
									params:{
										openid:openid,
										usertype:usertype,
										tranum:resResult.result.order_id
									}
								}).success(function(res){
									console.log(res);
		
									// 如果没关注，就跳转关注页面
									if(res.result.is_subscribe=='N'){
										alert("支付成功，请关注公众号'乐享生活快乐分享'查询订单");
										var hre="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2NzY0Mjk1Mg==&scene=124#wechat_redirect"
									}else{
										//如果是供应商审核支付，跳转到供应商我的页面
										if(usertype==3){
											var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying"
										}else{
											var hre="my.html?openid="+openid+"&usertype="+usertype+"#/all"
										}
									}
									location.href = hre;
								})
						}
					});
				})
			}
		}])
