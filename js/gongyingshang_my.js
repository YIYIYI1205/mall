// 以下是不止一个参数，获取参数
		var url = location.search; //获取url中"?"符后的字串
		var wanzhengUrl="http://www.lexianglive.com/view/gongyingshang_my.html"+url;
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
		
		// 分销的收益控制器(供应商也有)
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
				// 可提现
				$scope.tixian=res.shouru;
				// 已提现
				$scope.tixianed=res.tixian;
				// 直卖收益
				$scope.directGain=res.me;
				// 团队收益
				$scope.groupGain=res.team;
				// 供应商中的账户资金 
				$scope.me=res.me;
				$scope.bunengtixian=false;
				$scope.bunengtixian=false;
				if($scope.tixian<20){
					$scope.bunengtixian=true;
				}else{
					$scope.nengtixian=true;
				}
			});
		}]);
		// 供应商提现
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
				console.log(res);
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
		// 分销的收益的团队详情(供应商也有)
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
		
		// 供应商的供应
		app.controller("gongyingController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://lexianglive.com/lx/products/getSupplyProduct",
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
				// $scope.items.status="待审核";
			});
			$scope.dianji=function(key,product_id){
				// console.log($scope.items[key].show);
				$scope.items[key].show=true;
				console.log($scope.items[key].show);
				//向后台发送数据，将这个商品的Id发给后台，后台传过来一个文件
				$http({
					url:"http://lexianglive.com/lx/orders/exportOrderExcel",
					method:"get",
					headers:{"content-Type":"application/x-www-form-urlencoded"},
					params:{
						openid:openid,
						usertype:usertype,
						product_id:product_id
					}
				}).success(function(resresult){
					var res=resresult.result;
					$scope.url=res;
				});
			};
			// 支付
			$scope.pay=function(product_id){
				var hre = 'detail.html?msg=' + 1000+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"&product_id_daishenhe="+angular.toJson(product_id);
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
			}
			$scope.change=function(product_id){
				// 跳转页面
				var hre = 'change_publish.html?product_id=' + angular.toJson(product_id)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
    			location.href = hre;
			};
			$scope.goto=function (msg,openid,usertype) {
			console.log(msg);
			if(msg==1000){
				var hre = 'detail.html?msg=' + 1000+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"&product_id_daishenhe="+angular.toJson(msg)+"&daishenhe=true";
			}else{
				var hre = 'detail.html?msg=' + angular.toJson(msg)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
			}
    		
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
			};
			$scope.deleteProduct=function(product_id){
				$.confirm({
            		title: '确认删除该商品？',
            		onOK: function () {
            			$http({
							url:"http://www.lexianglive.com/lx/products/deletProduct",
							method:"get",
							headers:{"content-Type":"application/x-www-form-urlencoded"},
							params:{
								openid:openid,
								usertype:usertype,
								product_id:product_id
							}
						}).success(function(resresult){
							var res=resresult;
							console.log(res);
							// 成功以后再请求一下数据
							$http({
								url:"http://lexianglive.com/lx/products/getSupplyProduct",
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
								// $scope.items.status="待审核";
							});
						});
            		}
        		});
			}
		}]);
		// 供应商的资料
		app.controller("message_gongyingController",["$scope","$http",function($scope,$http){
			$http({
				url:"http://lexianglive.com/users/getuser",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype
				}
			}).success(function(resresult){
				console.log(resresult);
				var res=resresult.result;
				$scope.tel=res.supplier_tel;
				$scope.company=res.company;
				$scope.area=res.supplier_dizhi;
				$scope.name=res.supplier_name;
				$scope.mafile=res.mafile;
				$scope.zhengjiannumber=res.zhengnum;
			});
		}]);
		// 这是供应商的订单页面，和分销、用户是不一样的
		app.controller("dingdanController",["$scope","$http",function($scope,$http){
			// 转成数字
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
					}else{
						$scope.items[i].status='已处理';
					}
				}
			});
			$scope.search="";
			$scope.searchMethod=function(e){
				// $scope.search没有办法获取回车
				var keycode = window.event?e.keyCode:e.which;
            	if(keycode==13){
            		// 先判断是否是空
            		if($scope.search==""){
            			 alert('请输入检索内容！');
            		}else{
            			// 把搜索的内容发送给后台，后台根据搜索内容把相关的返回给前端          			
            			$http({
							url:"http://lexianglive.com/lx/orders/searchOrder",
							method:"get",
							headers:{"content-Type":"application/x-www-form-urlencoded"},
							params:{
								order_tel:$scope.search,
								openid:openid,
								usertype:usertype
							}
						}).success(function(res){
							if(res.errCode==3000){
								alert("未搜索到");
							}else{
								console.log(res);
								console.log("搜索成功");
								$scope.items=res.result;
								for(var i=0;i<$scope.items.length;i++){
									if($scope.items[i].order_status==1){
										$scope.items[i].status='未使用';
									}else if($scope.items[i].order_status==2){
										$scope.items[i].status='已使用';
									}else if($scope.items[i].order_status==3){
										$scope.items[i].status='需邮寄';
									}else if($scope.items[i].order_status==0){
										$scope.items[i].status='未付款';
									}else {
										$scope.items[i].status='已处理';
									}
								}
							}
						})
            		}
            	}
			}
			// 点击取消后，页面重新加载所有数据
			$scope.cancel=function(){
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
					}else{
						$scope.items[i].status='已处理';
					}
				}
			});
			}
			// 跳转到订单细节页面
			$scope.goto=function (msg,openid,usertype) {
			// 把这三个参数拼接在url后面
			var hre = 'gongyingshang_my.html?msg=' + angular.toJson(msg)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"#/dingdanDetail";
    			//传递对象：先将对象转成字符串（序列化）
    			// console.loh(hre);
    			location.href = hre;
			};
		}]);
		// 一个a标签跳转订单细节页面
		app.controller("dingdanDetailController",["$scope","$http",function($scope,$http){
			var url = location.search; //获取url中"?"符后的字串
        	var theRequest = new Object();
        	// 有问号代表有参数
       		 if (url.indexOf("?") != -1) {
            	var str = url.substr(1);
            	strs = str.split("&");
            	for (var i = 0; i < strs.length; i++) {
                	theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);//获取中文参数转码<span style="font-family: Arial, Helvetica, sans-serif;">decodeURI</span>，（unescape只针对数字，中文乱码)
            	}
        	};
			$http({
				url:"http://lexianglive.com/lx/orders/orderDitai",
				method:"get",
				headers:{"content-Type":"application/x-www-form-urlencoded"},
				params:{
					openid:openid,
					usertype:usertype,
					order_id:theRequest.msg
				}
			}).success(function(resresult){
				console.log(resresult);
				$scope.openid=openid;
				$scope.usertype=usertype;
				var res=resresult.result;
				// console.log(res);
				$scope.xiadanTime=res.createTime;
				$scope.recieve=res.order_name;
				$scope.recievetel=res.order_tel;
				$scope.order_detail=res.order_detail;
			// 	$scope.usestart=res.usestart;
			// 	$scope.useend=res.useend;
			// 不需要判断是否需要邮寄了，不显示电子码
			// 	$scope.isnumber=res.isnumber;
			// 	$scope.isaddress=res.isaddress;
			// 	if($scope.isnumber==true){
			// 		$scope.number=res.number;
			// 	}
				$scope.recieveAddress=res.address;
				$scope.kuaidiCompany=res.postCo;
				$scope.kuaidiNumber=parseInt(res.postNum);
				$scope.order_id=res.order_id;
				if(res.order_status==1){
					$scope.order_status='未使用';
				}else if(res.order_status==2){
					$scope.order_status='已使用';
				}else if(res.order_status==3){
					$scope.order_status='需邮寄';
				}else if(res.order_status==0){
					$scope.order_status='未付款';
				}else {
					$scope.order_status='已处理';
				}
			
				
			// 	if($scope.isaddress==true){
			// 		$scope.recieveAddress=res.recieveAddress;
			// 		$scope.kuaidiCompany=res.kuaidiCompany;
			// 		$scope.kuaidiNumber=res.kuaidiNumber;	
			// 	}
			// 	console.log($scope.kuaidiNumber)
			});
			$scope.goto=function (msg,openid,usertype) {
			// 把这三个参数拼接在url后面
    		var hre = 'gongyingshang_my.html?msg=' + angular.toJson(msg)+"&openid="+angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+'#/dingdan_change';
    			//传递对象：先将对象转成字符串（序列化）
    			// console.log(hre);
    			location.href = hre;
			};
		}]);
		// 供应商可以验证电子码
		app.controller("yanzhengController",["$scope","$http",function($scope,$http){
			$scope.yanzhengma='';
			$scope.submit=function(){
				console.log($scope.yanzhengma);
				$http({
					url:"http://lexianglive.com/lx/orders/yanzhenma",
					method:"get",
					headers:{"content-Type":"application/x-www-form-urlencoded"},
              		params:{
                		openid:openid,
						usertype:usertype,
						elcs_num:$scope.yanzhengma
              		}
				}).success(function(resresult){
					console.log(resresult);
					if(resresult.errCode==0){
						var res=resresult.result;
						alert(resresult.tip);
						$scope.title=res.title;
						$scope.namebuy=res.order_name;
						$scope.tel=res.order_tel;
						$scope.order_detail=res.order_detail;
						// 显示
						$scope.right=true;
					}else if(resresult.errCode==3004){
						alert(resresult.tip);
					}else if(resresult.errCode==3005){
						alert(resresult.tip);
					}else if(resresult.errCode==3007){
						alert(resresult.tip);
					}else if(resresult.errCode==3008){
						alert(resresult.tip);
					}else if(resresult.errCode==3009){
						alert(resresult.tip);
					}
				})
			}
				// $scope.use=function(){
				// 	// $http({
				// 		// 点击使用之后告诉后台使用了
				// 	// url:""
				// 	// }).success(function(res){
				// 	// 	console.log(res);
				// 		alert("已使用");
				// 		//使用后信息部分隐藏
				// 		$scope.right=false;
				// 	// });
				// }
		}])
		// 最外面的控制器
		app.controller("myController",["$scope","$http",function($scope,$http){
			$scope.openid=openid;
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
			// 跳转mall页面
			$scope.openid=openid;
			$scope.usertype=usertype;
			// $scope.mall=function (openid,usertype) {
			// // 把这三个参数拼接在url后面
   //  		var hre = 'mall.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
   //  			//传递对象：先将对象转成字符串（序列化）
   //  			// console.log(hre);
   //  			location.href = hre;
			// };
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
    			var hre = 'gongyingshang_my.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"#/gongying";
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
// 在my_template_change中写过提交函数
// $(function(){
// 	// 修改数据
// 	$("#submit").click(function(){
// 		console.log("被点击了");
// 		 datas={
		 	
//             shop:$("#shop").val(),
//             area:$("#area").val(),
//             xiaoqu:$("#xiaoqu").val(),
//             }
//             // console.log(datas);
//             $.ajax({
//               url:"../api/submit.php",
//               method:"post",
//               data:{
//                 area:datas.area,
//                 xiaoqu:datas.xiaoqu,
//                 shop:datas.shop,
//          		//还要传一下这个用户是谁  userId
//               },
//               success:function(res){
//                 console.log(res);
//                 //后台传过来唯一的标识表示这个任务的号码ID,现在假设这个ID就是1

//                 // ID=res;
//                 // // console.log(ID);
//                 // location.href="detail.html?ID="+ID; 
//               }
//             }); 
// 	});
// })