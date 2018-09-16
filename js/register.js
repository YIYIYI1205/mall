$(function(){
    // 获取链接地址
    var url =location.search;
    var wanzhengUrl="http://www.lexianglive.com/view/register.html"+url;
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
    // var openid=angular.fromJson(decodeURI(theRequest.openid));
    var openid=theRequest.openid;
    var usertype=angular.fromJson(decodeURI(theRequest.usertype));
    if(theRequest.parentid!=null){
        var parentid=angular.fromJson(decodeURI(theRequest.parentid));
    }else{
        var parentid=null;
    }
    // alert("openid:"+theRequest.openid+",usertype:"+theRequest.usertype);
    if(theRequest.usertype==3){
        alert("您已经注册成为供应商");
        var hre = 'gongyingshang_my.html?openid=' +parseInt(theRequest.openid)+"&usertype="+parseInt(theRequest.usertype)+"#/gongying";
        location.href = hre;
    } 

        $.ajax({
                url:"http://www.lexianglive.com/getgifcon",
                method:"get",
                params:{
                    openid:openid,
                    usertype:usertype,
                    url:wanzhengUrl
                }
            }).success(function(resResult){
                var resresult=$.parseJSON(resResult);
                var res=resresult.result;
                console.log(res);
                // var res=$.parseJSON(resResult.result);
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
	submit();
	// var add=$('<div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">邀请码</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="请输入邀请码" id="yaoqingma"></div></div><div class="btn"><div class="tishi">若没有邀请码，请支付88元成为分销人员</div><div class="weui-btn-area"><a class="weui-btn weui-btn_primary" href="javascript:" id="zhifu">支付</a></div></div>');
	var company=$('<div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">公司名称</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="没有公司请填写老板名字" id="company"></div></div><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">联系人姓名</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="请填写联系人姓名" id="name"></div></div><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">身份证号码</label></div><div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请填写身份证号码" id="zhengjiannumber"></div></div><div style="margin: 10px 20px;padding:5px;color: #333;border: 1px solid #aaa;font-size: 12px;" id="tiaokuan"><p>尊敬的用户感谢您选用乐享生活，分享快乐公众号分销商城，请您遵守国家相关法律法规，只允许发布合法的内容！发布非法内容者自负法律责任，软件服务开发商不承担责任！在中国和任何地区，都要遵循法律法规不允许复制和侵害软件知识产权，不允许违反互联网法规和国家相关法律发布违法信息，注册则认为已认同本法律声明和使用条款：</p><p>1、禁止使用软件发布国家严格禁止的、法律不允许的产品和商业活动，一经发现则停止软件使用权且报送公安机会处理（不予退货退款）；</p><p>2、请如实提供您的用户信息，这涉及到后期的软件使用权和所有权，包括后期售后服务支持；</p>   <p>3、禁止发布假冒伪劣产品，欺骗消费者的产品，一经发现报送公安机关，并承担相应的法律责任。</p></div><div style="margin: 10px;">我已阅读《注册供应商法律声明》<input type="radio" name="shengming" value="true" id="tongyi"></div>')
    var xiaoqu=$('<div class="weui-cell__hd"><label class="weui-label">小区</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="请输入小区名称" id="xiaoqu"></div>')
    var shop=$('<div class="weui-cell__hd"><label class="weui-label">店家名称</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="请输入店家名称" id="company"></div>')
    // var name=$('<div class="weui-cell__hd"><label class="weui-label">联系人姓名</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="请填写联系人姓名" id="name"></div>')
    if(parentid>0){
        // 分销
         $("input:radio[name=usertype][value=1]").attr("checked",true);
            $(".shop").append(shop);
            $(".deletecompany").empty();
            $(".deletexiaoqu").append(xiaoqu);
             console.log(parentid);
     }else{
        // 供应商
         $("input:radio[name=usertype][value=3]").attr("checked",true);  
             console.log(parentid);
     }
    $('input[name="usertype"]').on("change",function(){
        var val = $('input[name="usertype"]:checked').val();  
           
        if(val==1){
            // $(".add").append(add);
            $(".shop").append(shop);
            $(".deletecompany").empty();
            $(".deletexiaoqu").append(xiaoqu);
            // $(".name").empty();
        }else{
            // if($(".deletecompany").innerHtml!=""){
                $(".deletecompany").append(company);
            // }
            $(".shop").empty();
            // $(".add").empty();
            $(".deletexiaoqu").empty();
            // $(".name").empty();
        }
    });
	function submit(){
    	$("#submit").click(function(){
            var usertype=$('input[name="usertype"]:checked').val(); 
            datas={
            tel:$("#tel").val(),
            area:$("#area").val(),
            // usertype:$('input[type="radio"]:checked').val(),
            usertype:usertype,
            // company是公司名称
            company:$("#company").val(),
            name:$("#name").val(),
            // zhengjiantype:$("#zhengjiantype").val(),
            zhengjiannumber:$("#zhengjiannumber").val(),
            // shop是店家名称
            // shop:$("#shop").val(),
            xiaoqu:$("#xiaoqu").val(),

            // yaoqingma:$("#yaoqingma").val()
            }
            // if (datas.shop == '') {
            //     $.alert("店家名称不能为空");
            //     $("#shop").focus();
            //     return;
            // }
            if (datas.tel == '') {
                $.alert("手机号不能为空");
                $("#tel").focus();
                return;
            }
            if (datas.area == '') {
                $.alert("区域不能为空");
                $("#area").focus();
                return;
            }
            if(usertype==3){
                if (datas.company == '') {
                    $.alert("公司名称不能为空");
                    $("#company").focus();
                    return;
                }
                if (datas.name == '') {
                    $.alert("联系人姓名不能为空");
                    $("#name").focus();
                    return;
                }
                if (datas.zhengjiannumber == '') {
                    $.alert("身份证号码不能为空");
                    $("#zhengjiannumber").focus();
                    return;
                }
                if($('input[name="shengming"]:checked').val()==undefined){
                    $.alert('请选中“我已阅读”');
                    return;
                }

            }else{
                if (datas.company == '') {
                    $.alert("店家名称不能为空");
                    $("#company").focus();
                    return;
                }
                if (datas.xiaoqu == '') {
                    $.alert("小区不能为空");
                    $("#xiaoqu").focus();
                    return;
                }
            }
                console.log(datas.usertype);
                $.ajax({
                    url:"http://lexianglive.com/users/zhuce",
                    method:"post",
                    data:{
                        tel:datas.tel,
                        quyu:datas.area,
                        usertype:datas.usertype,
                        name:datas.company,
                        lianxiname:datas.name,
                        // zhengtype:datas.zhengjiantype,
                        zhengnum:datas.zhengjiannumber,
                        // shop:datas.shop,
                        xiaoqu:datas.xiaoqu,
                        jibie:null,
                        openid:theRequest.openid,
                        parentid:parentid
                        },
                    success:function(resresult){
                        // 打印出来的resresult，带着引号，是json字符串，要用jquery中的方法转成javascript对象
                        // 之前的不带引号的是对象，里面是属性，不带引号是因为是属性
                        // 还可以把json字符串转成json对象，再res[key]取值或者res.key
                        var res=$.parseJSON(resresult);
                        console.log(res.result);
                        if(res.errCode==3011){
                            alert("此用户已经存在");
                        }else if(res.errCode==3025){
                            alert("扫码注册分销商，您注册的是供应商！请重新注册");
                        }else if(res.errCode==3026){
                             alert("扫码注册供应商，您注册的是分销商！请重新注册");
                        }else{
                            if(usertype==1){
                                alert("注册分销成功");
                                location.href="my.html?openid="+res.result+"&usertype="+datas.usertype;
                            }else{
                                alert("注册供应商成功");
                                location.href="gongyingshang_my.html?openid="+res.result+"&usertype="+datas.usertype;
                            }
                        }
                        
                    }
                });
            
        })
    } 

})