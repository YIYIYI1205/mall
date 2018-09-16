$(function () {
var url =location.search;
var wanzhengUrl="http://www.lexianglive.com/view/publish.html"+url;
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
if(theRequest.usertype!=3){
    alert("请注册供应商");
    var hre = 'register.html?openid=' + parseInt(theRequest.openid)+"&usertype="+parseInt(theRequest.usertype);
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
// 展示图片
showImage();
showImage_haibao();
// 提交图片
// submitImage();
// submithaibaoImage();
// 提交信息
submit();
    
   
var count=0;
    // 添加细分
$("#btn").on("click", function(){
   if (count<0) {
    count=0;
   } 
   count++;
        // console.log(count);
       $("#xifen").append($('<div class="xifenList"><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">名称'+count+'</label></div><div class="weui-cell__bd"><input class="weui-input" type="type" placeholder="请输入细分名称，如学生票"></div></div><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">商品原价</label></div><div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入商品原价" step="0.01"></div></div><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">商品现价</label></div><div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入商品现价" step="0.01"></div></div><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">供货价格</label></div><div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入供货价格" step="0.01"></div></div><div class="weui-cell"><div class="weui-cell__hd"><label class="weui-label">库存</label></div><div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入细分库存"></div><button class="deletebtn">删除价格</button></div></div>'));
        //动态生成的元素，想要添加事件，必须加到这里面
        // var xifen=$("#xifen").length;
        $(".deletebtn").on("click",function(){
            count--;
            // 如果增加细分好几次，会有好几个按钮，因此count会减很多次，减到负值时，让它等于0
            // console.log(xifen);
            // count=xifen;
            // console.log(count);
            var xifenList=this.parentNode.parentNode;
            $(xifenList).empty();
    })
});
  // 展示图片
  var number;
  function showImage(){
    var count=0; 
    var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',  
            $gallery = $("#gallery"),  
            $galleryImg = $("#galleryImg"),  
            $uploaderInput = $("#uploaderInput"),  
            $uploaderFiles = $("#uploaderFiles");  
            $uploaderInput.on("change", function(e) {  
                var src, url = window.URL || window.webkitURL || window.mozURL,  
                files = e.target.files;
                for(var i = 0, len = files.length; i < len; ++i) {
                    console.log($uploaderFiles[0].children.length);
                    count++;
                    if(count>19){
                        $("#weui-uploader__input-box").css('display','none');
                    }
                    if(count>20){
                        alert("只能上传20张图片");
                        count--;
                        return;
                    }  
                    var file = files[i];  
                    var size=file.size;
                    if(size>1024*1024*5){
                        alert("图片不能超过5M");
                        return;
                    }
                    if(url) {  
                        src = url.createObjectURL(file);
                    } else {  
                        src = e.target.result;  
                    }  
                    $uploaderFiles.append($(tmpl.replace('#url#', src)));       
                }   
            });  
        var index; //第几张图片  
        $uploaderFiles.on("click", "li", function() {  
            index = $(this).index();  
            $galleryImg.attr("style", this.getAttribute("style"));  
            $gallery.fadeIn(100);  
        });  
        //点击span隐藏，不要直接点gallery就隐藏，删不掉图片
        $("#galleryImg").click(function() { 
            $gallery.fadeOut(100);  
        });  
        //删除图片  
        $(".weui-gallery__del").click(function() { 
            count=$uploaderFiles[0].children.length-1;
            console.log(count);
            $("#weui-uploader__input-box").css('display','block');
            $gallery.fadeOut(100);  
            $uploaderFiles.find("li").eq(index).remove();  
        });  
  }
  // 展示海报
  function showImage_haibao(){
    var count=0;
    var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',  
            $gallery = $("#galleryhaibao"),  
            $galleryImg = $("#galleryhaibaoImg"),  
            $uploaderInput = $("#uploaderhaibaoInput"),  
            $uploaderFiles = $("#uploaderhaibaoFiles");  
            $uploaderInput.on("change", function(e) {  
                var srchaibao, url = window.URL || window.webkitURL || window.mozURL,  
                files = e.target.files;
                for(var i = 0, len = files.length; i < len; ++i) {
                    count++;
                    if(count>0){
                         $("#weui-uploader__input-box_haibao").css('display','none');
                    }
                    if(count>1){
                        alert("只能上传1张图片");
                        return;
                    }
                    var file = files[i];
                    var size=file.size;
                    if(size>1024*1024*5){
                        alert("图片不能超过5M");
                        return;
                    }  
                    if(url) {  
                        srchaibao = url.createObjectURL(file);  
                    } else {  
                        srchaibao = e.target.result;  
                    }  
                    $uploaderFiles.append($(tmpl.replace('#url#', srchaibao)));  
                }  
            });  
        var index; //第几张图片  
        $uploaderFiles.on("click", "li", function() {  
            index = $(this).index();  
            $galleryImg.attr("style", this.getAttribute("style"));  
            $gallery.fadeIn(100);  
        });  
        //点击span隐藏，不要直接点gallery就隐藏，删不掉图片
        $("#galleryhaibaoImg").click(function() { 
            $gallery.fadeOut(100);  
        });  
        //删除图片  
        $(".weui-gallery__del").click(function() { 
            count=$uploaderFiles[0].children.length-1;
            $("#weui-uploader__input-box_haibao").css('display','block');
            $gallery.fadeOut(100);  
            $uploaderFiles.find("li").eq(index).remove();  
        });  
    }  
  //提交信息
function submit(){
    //上传图片
    var count=0;
    var images=[];
    // var imgName="";
    // var image="";
    $('.zjxfjs_file').on('change', function (event) {
        var files = event.target.files;
        for (var i = 0, len = files.length; i < len; i++) {
            count++;
            if(count>20){
                return;
            }
            var file = files[i];
            var size=file.size;
            console.log(size);
            if(size>1024*1024*5){
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                // var imgName=$("#uploaderInput").val(); 
                // console.log(imgName); 
                var img = new Image();
                img.src = e.target.result;         
                img.onload = function () {  
                    // console.log("123");
                    // 不要超出最大宽度  
                    var w = Math.min(10000, img.width);  
                    // 高度按比例计算  
                    var h = img.height * (w / img.width);  
                    var canvas = document.createElement('canvas');  
                    var ctx = canvas.getContext('2d');  
                    // 设置 canvas 的宽度和高度  
                    canvas.width = w;  
                    canvas.height = h;  
                    ctx.drawImage(img, 0, 0, w, h); 
　　　　　　　　　　　　
                    var base64 = canvas.toDataURL('image/jpeg',0.6);  
                    // console.log(base64);
                   //console.log(base64);
                    // 插入到预览区  

                    images.push(base64);
                }
            };
            reader.readAsDataURL(file);
        }
        console.log(images);
    }); 
    var haibaoimages=[];
    var haibaocount=0;
    // var haibaoimage="";
    $('.haibao_file').on('change', function (event) {
        var files = event.target.files;
        for (var i = 0, len = files.length; i < len; i++) {
            haibaocount++;
            if(haibaocount>1){
                return;
            }  
            var file = files[i];
            var size=file.size;
            if(size>1024*1024*5){
                return;
            }  
            var file = files[i];
            var reader = new FileReader();
            reader.onload = function (e) {
                var haibaoimage = new Image();
                haibaoimage.src = e.target.result;         
                haibaoimage.onload = function () {  
                    // console.log("123");
                    // 不要超出最大宽度  
                    var w = Math.min(10000, haibaoimage.width);  
                    // 高度按比例计算  
                    var h = haibaoimage.height * (w / haibaoimage.width);  
                    var canvas = document.createElement('canvas');  
                    var ctx = canvas.getContext('2d');  
                    // 设置 canvas 的宽度和高度  
                    canvas.width = w;  
                    canvas.height = h;  
                    ctx.drawImage(haibaoimage, 0, 0, w, h); 
　　　　　　　　　　　　
                    var base64 = canvas.toDataURL('image/jpeg',0.6);  
                    // console.log(base64);
                   //console.log(base64);
                    // 插入到预览区  

                    haibaoimages.push(base64);
                }
                
            };
            reader.readAsDataURL(file);
        }
    });
    var flag=true;
    var product_id;       
    $("#submit").click(function(){

        if(flag){
            $.confirm({
                title: '确认提交的内容无误？',
                onOK: function () {
                    var xifen=[];
                    if($("#xifen").innerHtml!=""){
                        var input =$("#xifen input");   
                        for (var i = input.length - 1; i >= 0; i=i-5) {
                            var xifentitle=input[input.length-i-1].value;
                            var xifenorigin=input[input.length-i].value;
                            var xifenprice=input[input.length-i+1].value;
                            var xifengonghuojia=input[input.length-i+2].value;
                            var xifensave=input[input.length-i+3].value;
                            if(xifentitle==undefined||xifentitle==""){
                                $.alert("细分名称不能为空");
                                return;
                            }
                            if(xifenorigin==undefined||xifenorigin==""){
                                $.alert("商品原价不能为空");
                                return;
                            }
                            if(xifenprice==undefined||xifenprice==""){
                                $.alert("商品现价不能为空");
                                return;
                            }
                            if(xifenprice<1.00){
                                $.alert("商品现价不能小于1元");
                                return;
                            }
                            if(xifengonghuojia==undefined||xifengonghuojia==""){
                                $.alert("供货价格不能为空");
                                return;
                            }
                            if(xifensave==undefined||xifensave==""){
                                $.alert("库存不能为空");
                                return;
                            }
                            xifen.push({"psummary":xifentitle,"price":parseFloat(xifenorigin),"sprice":parseFloat(xifenprice),"cost":parseFloat(xifengonghuojia),"stock":parseInt(xifensave)});
                        }
                    }
                    // 数组转成字符串
                    var xifenString=JSON.stringify(xifen);
                    datas={
                        // leibie:$('option:selected').val(),
                        youji:$('input[name="youji"]:checked').val(),
                        shiyong:$('input[name="shiyong"]:checked').val(),
                        title:$("#title").val(),
                        timestart:$("#timestart").val(),
                        timeend:$("#timeend").val(),
                        usestart:$("#usestart").val(),
                        useend:$("#useend").val(),
                        address:$("#address").val(),
                        contact:$("#contact").val(),
                        summary:$("#summary").val(),
                        buy:$("#buy").val(),
                        detailsummary:$("#detailsummary").val(),
                    }
                    // console.log(datas);
                    // if(datas.leibie==undefined){
                    //     datas.leibie="其他";
                    // }
                    if(datas.youji=="0"){
                        datas.youji=0;
                    }else{
                        datas.youji=1;
                    }
                    if(datas.shiyong=="0"){
                        datas.shiyong=0;
                    }else{
                        datas.shiyong=1;
                    }
                    if (datas.title == '') {
                        $.alert("商品名称不能为空");
                        $("#title").focus();
                        return;
                    }
                    var timestart = new Date($("#timestart").val()).getTime();
                    var nowtime = new Date();
                    var nowtimeriqi=nowtime.toLocaleDateString();
                    var now=new Date(nowtimeriqi).getTime();
                    var timeend = new Date($("#timeend").val()).getTime();
                    var useend = new Date($("#useend").val()).getTime();
                    var usestart = new Date($("#usestart").val()).getTime();
                    

                    if(timestart<now){
                        $.alert("活动开始日期不能小于当前日期");
                        return;
                    }
                    if(timeend<timestart){
                        $.alert("活动结束日期不能小于活动开始日期");
                        return;
                    }
                    if(usestart<now){
                        $.alert("使用起始日期不能小于当前日期");
                        return;
                    }
                    if(useend<usestart){
                        $.alert("活动结束日期不能小于活动开始日期");
                        return;
                    }

                    if (datas.timestart == '') {
                        $.alert("活动开始日期不能为空");
                        $("#timestart").focus();
                        return;
                    }   
                    if (datas.timeend == '') {
                        // 还需要做一个判断：结束时间要大于开始时间
                        $.alert("活动结束时间不能为空");
                        $("#timeend").focus();
                        return;
                    }
                    if (datas.usestart == '') {
                        $.alert("使用起始时间不能为空");
                        $("#usestart").focus();
                        return;
                    }
                    if (datas.useend == '') {
                        $.alert("使用截止时间不能为空");
                        $("#useend").focus();
                        return;
                    }
                    if (datas.address == '') {
                        $.alert("地址不能为空");
                        $("#address").focus();
                        return;
                    }
                    if (datas.contact == '') {
                        $.alert("联系方式不能为空");
                        $("#contact").focus();
                        return;
                    }
                    if (datas.buy == '') {
                        $.alert("预定须知不能为空");
                        $("#buy").focus();
                        return;
                    }
                    if (datas.summary == '') {
                        $.alert("简要描述不能为空");
                        $("#summary").focus();
                        return;
                    }
                    if (datas.detailsummary == '') {
                        $.alert("详细描述不能为空");
                        $("#detailsummary").focus();
                        return;
                    }
                    $.ajax({
                        url:"http://lexianglive.com/lx/products/addProduct",
                        method:"post",
                        data:{
                            //类别
                            // leibie:datas.leibie,
                            //是否要填使用时间
                            showtime:datas.shiyong,
                            //是否需要邮寄
                            tuiyue:datas.youji,
                            //商品名称
                            title:datas.title,
                            //活动开始时间
                            panicStart:datas.timestart,
                            //活动结束日期
                            panicEnd:datas.timeend,
                            //使用起始日期
                            useStart:datas.usestart,
                            //使用截止时间
                            useEnd:datas.useend,
                            //地址
                            pro_address:datas.address,
                            // 客服联系方式
                            contact:datas.contact,
                            // 预定须知
                            notice:datas.buy,
                            // 简要描述
                            summary:datas.summary,
                            // 详细描述
                            details:datas.detailsummary,
                            // 细分
                            xifen:xifenString,
                            openid:theRequest.openid,
                            usertype:3    
                        },success:function(res){
                            // console.log(res);
                            if($.parseJSON(res).result==3022){
                                alert("原价应大于现价，现价应大于供货价");
                            }else{
                                product_id=$.parseJSON(res).result;
                                console.log(product_id);    
                                //按钮颜色变灰
                                $("#submit").css("background","#aaa");
                                $("#submit").html("已提交审核");
                                flag=false; 
                                //只有有海报或者有图片
                                if(haibaoimages.length>0||images.length>0){
                                    $.alert("请等待图片上传，上传完毕会自动跳转，请不要退出页面");
                                    // 既有海报又有图片
                                    if(haibaoimages.length>0&&images.length>0){
                                                // 先传海报
                                                $.ajax({
                                                    url:"http://lexianglive.com/upload/upbasefile",
                                                    method:"post",
                                                    data:{
                                                        product_id:product_id,
                                                        haibaoimage:haibaoimages[0],
                                                        openid:theRequest.openid,
                                                        usertype:3    
                                                    },success:function(res){
                                                        console.log(res);
                                                        // 海报成功后先传图片第一张
                                                        $.ajax({
                                                                url:"http://lexianglive.com/upload/upbasefile",
                                                                method:"post",
                                                                data:{
                                                                    product_id:product_id,
                                                                    xuhao:1,
                                                                    images:images[0],
                                                                    openid:theRequest.openid,
                                                                    usertype:3    
                                                                },success:function(res){
                                                                    console.log(res);
                                                                    // 成功后循环传剩下图片
                                                                    if(images.length>1){
                                                                        for(var i=1;i<images.length;i++){
                                                                            var count=1;
                                                                            $.ajax({
                                                                                url:"http://lexianglive.com/upload/upbasefile",
                                                                                method:"post",
                                                                                data:{
                                                                                    product_id:product_id,
                                                                                    xuhao:i+1,
                                                                                    images:images[i],
                                                                                    openid:theRequest.openid,
                                                                                    usertype:3    
                                                                                },success:function(res){
                                                                                    console.log(res);
                                                                                    count++;
                                                                                    if(count==images.length){
                                                                                        var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying";
                                                                                        location.href=hre; 
                                                                                    }      
                                                                                }
                                                                            });      
                                                                        }
                                                                    }else{
                                                                        var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying";
                                                                        location.href=hre; 
                                                                    }
                                                                }
                                                        });
                                                    }
                                                });        
                                    // 只有海报         
                                    }else if(haibaoimages.length>0&&images.length==0){
                                        $.ajax({
                                            url:"http://lexianglive.com/upload/upbasefile",
                                            method:"post",
                                            data:{
                                                product_id:product_id,
                                                haibaoimage:haibaoimages[0],
                                                openid:theRequest.openid,
                                                usertype:3    
                                            },success:function(res){
                                                console.log(res);
                                                var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying";
                                                location.href=hre;  
                                            }
                                        });
                                    //只有图片       
                                    }else{
                                        console.log("只有图片");
                                        $.ajax({
                                                                url:"http://lexianglive.com/upload/upbasefile",
                                                                method:"post",
                                                                data:{
                                                                    product_id:product_id,
                                                                    xuhao:1,
                                                                    images:images[0],
                                                                    openid:theRequest.openid,
                                                                    usertype:3    
                                                                },success:function(res){
                                                                    console.log(res);
                                                                    // 成功后循环传剩下图片
                                                                    if(images.length>1){
                                                                        for(var i=1;i<images.length;i++){
                                                                            var count=1;
                                                                            $.ajax({
                                                                                url:"http://lexianglive.com/upload/upbasefile",
                                                                                method:"post",
                                                                                data:{
                                                                                    product_id:product_id,
                                                                                    xuhao:i+1,
                                                                                    images:images[i],
                                                                                    openid:theRequest.openid,
                                                                                    usertype:3    
                                                                                },success:function(res){
                                                                                    console.log(res);
                                                                                    count++;
                                                                                    if(count==images.length){
                                                                                        var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying";
                                                                                        location.href=hre; 
                                                                                    }      
                                                                                }
                                                                            });      
                                                                        }
                                                                    }else{
                                                                        var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying";
                                                                        location.href=hre; 
                                                                    }    
                                                                }
                                                        });                                           
                                    }  
                                }else{
                                    var hre="gongyingshang_my.html?openid="+openid+"&usertype="+usertype+"#/gongying";
                                    // location.href=hre;
                                }
                            }
                        }
                    });    
                }
            });
        }
    })
} 
});
var url =location.search;
var theRequest = new Object();
        // 有问号代表有参数
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);//获取中文参数转码<span style="font-family: Arial, Helvetica, sans-serif;">decodeURI</span>，（unescape只针对数字，中文乱码)
            }
        }
var app=angular.module("app",[]);       
app.controller("controller",["$scope","$http",function($scope,$http){
    $scope.openid=parseInt(theRequest.openid);
    $scope.usertype=parseInt(theRequest.usertype);
    // 跳转my页面
    $scope.my=function (openid,usertype) {
        // 把这三个参数拼接在url后面
        var hre = 'gongyingshang_my.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype)+"#/gongying";
        //传递对象：先将对象转成字符串（序列化）
        // console.loh(hre);
        location.href = hre;
    };
    // 跳转publish页面，只有供应商有
    $scope.publish=function (openid,usertype) {
        // 把这三个参数拼接在url后面
        var hre = 'publish.html?openid=' +angular.toJson(openid)+"&usertype="+angular.toJson(usertype);
        //传递对象：先将对象转成字符串（序列化）
        location.href = hre;
    };                            
}]);

