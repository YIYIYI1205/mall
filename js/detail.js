		// var urlValue='';
		// var href = location.href; //取得整个地址栏
		// urlValue = href.substr(href.indexOf("=") + 1);
		// //此处只有一个参数，先截取参数值（等号后的值）。
		// 以下是不止一个参数
		var url = location.search; //获取url中"?"符后的字串
		var wanzhengUrl="http://www.lexianglive.com/view/detail.html"+url;
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
        // console.log(theRequest);
		// 这个message就是传过来的唯一编号，将这个编号发送给后台，请求详细数据
		var message=angular.fromJson(decodeURI(theRequest.msg));
		var openid=angular.fromJson(decodeURI(theRequest.openid));
		var usertype=angular.fromJson(decodeURI(theRequest.usertype));
		// 如果该产品是1000,还要把带审核的那个product_id传过来
		if(message==1000){
			if(theRequest.product_id_daishenhe==undefined){
				var product_id_daishenhe=null;
			}else{
				var product_id_daishenhe=angular.fromJson(decodeURI(theRequest.product_id_daishenhe));
			}
		}
		if(theRequest.sailman_id!=undefined){
			var sailman_id=angular.fromJson(decodeURI(theRequest.sailman_id));
		}else{
			var sailman_id=null;
		}
		// console.log(message);
		var app=angular.module("app",[]);
		app.controller("controller",["$scope","$http",function($scope,$http){
			$scope.Id=message;
			$scope.usertype=usertype;	
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
    				jsApiList: ['hideMenuItems','previewImage','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
				});
				wx.ready(function(){
    				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					// console.log("123");
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
					product_id:$scope.Id,
					usertype:usertype
				}
			}).success(function(resResult){
				console.log(resResult);
				var res=resResult.result;
				$scope.showpa=res.showpa;
				// 图片
				// 字符串转成数组:先截取，再转成数组
				if(res.img!=undefined){
					var imgs=res.img.slice(0,res.img.length).split(",");
					$scope.imgs=imgs;
					console.log(imgs);
					$scope.len=imgs.length;
					console.log($scope.len);
				}
				// $scope.card=res.card;
				$scope.title=res.title;
				//原价
				$scope.origin=res.price;
				// 现价
				$scope.price=res.sprice;
				$scope.address=res.pro_address;
				if(res.contact==null){
					$scope.contact="暂时没有电话";
				}else{
					$scope.contact=res.contact;
				}
				$scope.timestart=res.panicStart;
				$scope.timeend=res.panicEnd;
				$scope.usestart=res.useStart;
				$scope.useend=res.useEnd;
				// 购买须知
				$scope.buy=res.notice;
				$scope.psummary=res.psummary;
				$scope.summary=res.summary;
				$scope.detailsummary=res.details;
				$scope.save=res.stock;
				$scope.sails=res.sails;
				if(res.xifen==null){
					//判断获取数据xifen是否为空，如果为空就让isxifen为false
					$scope.ifxifen=false;
				}else{
					$scope.ifxifen=true;
					$scope.xifen=res.xifen;
				}
				// $scope.haibaoShow=false;
			})
			$scope.goto=function(){
				// 把这三个参数拼接在url后面
				if(message==1000){
					var hre = 'pay.html?product_id=' + angular.toJson(message)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"&product_id_daishenhe="+angular.toJson(product_id_daishenhe);
				}else{
					var hre = 'pay.html?product_id=' + angular.toJson(message)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"&sailman_id="+angular.toJson(sailman_id);
				}
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
			};
			$scope.image=function(key){
				$http({
					url:"http://lexianglive.com/lx/products/getProductPage",
					method:"get",
					params:{
						product_id:message,
						usertype:usertype
					}
				}).success(function(resResult){
					console.log(resResult);
					var res=resResult.result;
					var img=res.img.slice(0,res.img.length).split(",");
					var imgs=[];
					for(var i=0;i<img.length;i++){
                		var imgUrl='http://www.lexianglive.com/'+img[i];
                		imgs.push(imgUrl);
            		}
					console.log(imgs);	
					var img = $.photoBrowser({
                		// 这里items后面要加[]，不加就报错
                		items: imgs,
                		initIndex:key,
                		onOpen: function() {},
                		onClose: function() {}
            		});
            		console.log(key);
            		img.open(key);
				})	
				
			}
		}])

	