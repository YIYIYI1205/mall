// 以下是不止一个参数，获取参数
		var url = location.search; //获取url中"?"符后的字串
		var wanzhengUrl="http://www.lexianglive.com/view/my.html"+url;
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
        // alert(usertype+"id:"+openid);
var app=angular.module("app",["ngRoute"]);
		// 需要对路由模块进行配置,有一个$routeProvider
		app.config(["$routeProvider",function($routeProvider){
			$routeProvider
			// all是全部订单，只有分销和用户才有
			.when("/all",{
				templateUrl:"my_template_all.html",
				controller:"allController"
			})
			// 收藏先不要
			// .when("/collect",{
			// 	templateUrl:"my_template_collect.html",
			// 	controller:"collectController"
			// })
			// 收益，供应商和分销都有
			.when("/gain",{
				templateUrl:"my_template_gain.html",
				controller:"gainController"
			})
			// 提现，供应商和分销都有
			.when("/tixian",{
				templateUrl:"my_template_tixian.html",
				controller:"tixianController"
			})
			.when("/jilu",{
				templateUrl:"my_template_jilu.html",
				controller:"jiluController"
			})
			// 分销的资料
			.when("/message",{
				templateUrl:"my_template_message.html",
				controller:"messageController"
			})
			.when("/detail",{
				templateUrl:"my_template_detail.html",
				controller:"detailController"
			})
			.when("/change",{
				templateUrl:"my_template_change.html",
				controller:"messageController"
			})
			.when("/gongying",{
				templateUrl:"my_template_gongying.html",
				controller:"gongyingController"
			})
			.when("/yanzheng",{
				templateUrl:"my_template_yanzheng.html",
				controller:"yanzhengController"
			})
			.when("/dingdan",{
				templateUrl:"my_template_dingdan.html",
				controller:"dingdanController"
			})
			.when("/dingdanDetail",{
				templateUrl:"my_template_dingdan_detail.html",
				controller:"dingdanDetailController"
			})
			.when("/dingdan_change",{
				templateUrl:"my_template_dingdan_change.html",
				controller:"dingdanDetailController"
			})
			// 资源不要
			// .when("/ziyuan",{
			// 	templateUrl:"my_template_ziyuan.html",
			// 	// controller:"ziyuanController"
			// })
			.when("/message_gongying",{
				templateUrl:"my_template_message_gongying.html",
				controller:"message_gongyingController"
			})
			// 预约不要
			// .when("/yuyue",{
			// 	templateUrl:"my_template_all_yuyue.html",
			// 	controller:"all_yuyueController"
			// })
			// .when("/yuyueFinished",{
			// 	templateUrl:"my_template_all_yuyueFinished.html",
			// 	controller:"all_yuyueFinishedController"
			// })
			.otherwise({
				redirecTo:"/all"
			})
		}]);
		// 只有用户和分销才有全部订单，状态是未使用，区别是用户可以预约
		app.controller("allController",["$scope","$http",function($scope,$http){
			// 请求的接口和一点击my是一样的
			$scope.openid=openid;
			$scope.usertype=usertype;
			$http({
				url:"http://lexianglive.com/lx/orders/getCustomOrder",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result;
				console.log(res);
				$scope.items=res;
				for(var i=0;i<$scope.items.length;i++){
					if($scope.items[i].order_status==1){
						$scope.items[i].status='未使用';
					}else if($scope.items[i].order_status==2){
						$scope.items[i].status='已使用';
					}else if($scope.items[i].order_status==3){
						$scope.items[i].status='需邮寄';
					}else if($scope.items[i].order_status==4){
						$scope.items[i].status='已邮寄';
					}else if($scope.items[i].order_status==5){
						$scope.items[i].status='支付失败';
					}else{
						$scope.items[i].status='未付款';
					}
				}
			});
			//点击列表跳转详情页面
			$scope.goto=function (msg,openid,usertype) {
				// 把这三个参数拼接在url后面
    			var hre = 'detail.html?msg=' + angular.toJson(msg)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
    			//传递对象：先将对象转成字符串（序列化）
    			// console.log(hre);
    			location.href = hre;
			};
		}]);
		// 分销的收益控制器
		app.controller("gainController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://lexianglive.com/users/getmoney",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result;
				console.log(res);
				$scope.usertype=usertype;
				// 可提现
				$scope.tixian=res.shouru;
				// 已提现
				$scope.tixianed=res.tixian;
				// 直卖收益
				$scope.directGain=res.me;
				// 团队收益
				$scope.groupGain=res.team;
				$scope.bunengtixian=false;
				$scope.bunengtixian=false;
				if($scope.tixian<20){
					$scope.bunengtixian=true;
				}else{
					$scope.nengtixian=true;
				}
			});	
		}]);
		//提现
		app.controller("tixianController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://lexianglive.com/users/getmoney",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result;
				console.log(res);
				// 可提现
				$scope.tixian=res.shouru;
				$scope.utype=1;
				$scope.weixin=true;
				$scope.zhifubao=false;
				$scope.timo=$scope.tixian;
				$scope.lvse=true;
				console.log($scope.lvse);
				$scope.huise=false;
				$scope.change=function(){
					$scope.utype=!$scope.utype;
					if($scope.utype==0){
						$scope.zhifubao=true;
						$scope.weixin=false;
					}else{
						$scope.weixin=true
						$scope.zhifubao=false;
					}	
				}
				$scope.submit=function(){
					if($scope.timo==undefined||$scope.timo==""){
						alert("提现金额不得为空");
						return;
					}
					if($scope.timo<20){
						alert("提现金额不得小于20元");
						return;
					}
					if($scope.timo>$scope.tixian){
						alert("提现金额不得大于"+$scope.tixian+"元");
						return;
					}
					if($scope.zhifubao==true){
						if($scope.name==""||$scope.name==undefined){
							alert("支付宝名称不得为空");
							return;
						}
						if($scope.zhang==""||$scope.zhang==undefined){
							alert("支付宝账号不得为空");
							return;
						}
					}
					
					$http({
							url:"http://lexianglive.com/users/titi",
							method:"get",
							headers:{"content-Type":"application/x-www-form-urlencoded"},
							params:{
								openid:openid,
								usertype:usertype,
								name:$scope.name,
								zhang:$scope.zhang,
								timo:$scope.timo,
								utype:$scope.utype
							}
					}).success(function(resresult){
							console.log(resresult);
							if(resresult.errCode==0){
								$scope.huise=true;
								$scope.lvse=false;
								if($scope.utype==1){
									alert("提现ID："+resresult.result);
								}
							}else{
								alert("提现失败");
							}
							
					});
					
				}
			});	
		}]);
		// 提现记录
		app.controller("jiluController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://www.lexianglive.com/guanguan/tistatxianliu",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result
				$scope.items=res;
				for(var i=0;i<$scope.items.length;i++){
					if($scope.items[i].tx_type==0){
						$scope.items[i].tx_type="支付宝";
					}else{
						$scope.items[i].tx_type="微信";
					}
					if($scope.items[i].status==0){
						$scope.items[i].status="提现申请";
					}else if($scope.items[i].status==1){
						$scope.items[i].status="提现完成";
					}else{
						$scope.items[i].status="提现失败";
					}
				}
			});
		}]);
		// 分销的资料
		app.controller("messageController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://www.lexianglive.com/users/getuser",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result;
				console.log(res);
				$scope.tel=res.sailman_tel;
				$scope.shop=res.shop;
				$scope.area=res.quyu;
				$scope.xiaoqu=res.xiaoqu;
				$scope.mafile=res.mafile;
				$scope.sailjibie=res.sailjibie;
			});
		}]);
		// 分销的收益的团队详情
		app.controller("detailController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://www.lexianglive.com/users/getteammoney",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result
				// console.log(res);
				$scope.items=res;
			});
		}]);

		// 最外面的控制器
		app.controller("myController",["$scope","$http",function($scope,$http){
			$scope.usertype=usertype;
			$scope.openid=openid;
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

			$scope.openid=openid;
			$scope.usertype=usertype;
			$scope.index=function (openid,usertype) {
				// 把这三个参数拼接在url后面
    			var hre = 'index.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
    			//传递对象：先将对象转成字符串（序列化）
    			location.href = hre;
			};	
			// 跳转publish页面，只有供应商有
			$scope.publish=function (openid,usertype) {
				// 把这三个参数拼接在url后面
    			var hre = 'publish.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
    			//传递对象：先将对象转成字符串（序列化）
    			location.href = hre;
			};	
			// 跳转my页面
			$scope.my=function (openid,usertype) {
				// 把这三个参数拼接在url后面
    			var hre = 'my.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"#/all";
    			//传递对象：先将对象转成字符串（序列化）
    			location.href = hre;
			};		
			$http({
				url:"http://lexianglive.com/lx/orders/getCustomOrder",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				var res=resresult.result;
				// console.log(res);
				// 用户类型
				$scope.id=theRequest.usertype;
				console.log($scope.id);
				// $scope.icon=res.icon;
				// $scope.name=res.weixinname;
			});
		}])