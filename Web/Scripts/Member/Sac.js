﻿var _ajax=function(c,d,f){$.ajax({type:c.type,url:c.url,data:c.data,cache:false,dataType:c.dataType||'json',success:function(a){var b;try{b=a.error||a.toString()}catch(e){art.dialog({content:"Error：the options for this ajax request",ok:function(){}})}if(b){if(b.indexOf("SystemMaintenance")>-1)location.href="/Agent/Login/?e="+ +new Date()}if(d){d(a)}},error:function(){if(f){f()}art.dialog({content:"Error：the options for this ajax request",ok:function(){}})}})};var __info;var __autoMaintenance;var __animalsAry=[];$(function(){var j=new sysInfo();__info=j;comm.animalsSort(j.animalsIndex);var k=function(a){var b=a=="Violet"?"Yellow":a;var c=$("#skinArtDialog").attr("href").split("/skins/")[0];$("#skinArtDialog").attr("href",c+"/skins/"+b+".css");$("#skinClass").attr("href","/Skin/Member"+a+".css")};var l=comm.getCookie("skin")||"Yellow";$("#skinBox a[data-skin='"+l+"']").addClass("on");k(l);$("#skinChange").mouseover(function(){$(this).unbind("mouseout");$(this).find("#skinBox a").unbind("click");$(this).find("#skinBox").addClass("active");$(this).find("#skinBox a").click(function(){var a=$(this).attr("data-skin");k(a);comm.setCookie("skin",a);$("#skinBox a").removeClass("on");$(this).addClass("on");$("#skinBox").removeClass("active")});$(this).mouseout(function(){$(this).find("#skinBox").removeClass("active")})});$("#soundSwitch").click(function(){var a=$(this).attr("class");$(this).removeClass();if(a=="lbOn"){$(this).addClass("lbOff");j.voice=0}else{$(this).addClass("lbOn");j.voice=1}});(function(){if(j.first==1){$("body").html("");_ajax({type:'get',dataType:'text',url:'/Member/Mesg/ChangePwd.aspx',data:{t:j.autoTid}},function(a){$("body").html(a);$("#validBtn").css("display","");$("#validFormBtn").click(function(){myChangePwd()});$("#resetBtn").click(function(){$("#result input").val("")});$("#result input").keydown(function(e){if(e.which==13){myChangePwd();return false}});$("#result input[name='voldpassword']").focus();art.dialog({content:"您的賬戶為初次登錄 或 密碼由後臺重新設定，為安全起見請設定 ‘新密碼’。",ok:function(){}})})}else{var d=function(c){_ajax({type:'get',dataType:'text',url:'Default.aspx',data:{uid:j.autoTid}},function(a){if(a=="SystemMaintenance"){location="/Member/?t="+j.autoTid}else if(c){var b=$("#menuText").attr("index");game_box_title({info:j,gameIndex:b})}},function(){clearInterval(__autoMaintenance)})};d(true);__autoMaintenance=setInterval(function(){d(false)},1000*60)}})();$(".menu").mouseenter(function(){$(this).find("div").slideDown(100)});$(".menu").mouseleave(function(){$(this).find("div").slideUp(100)});$("#menuList a").click(function(){var b=$(this).attr("index");var c=$(this).html();var d=$("#menuText").attr("index");$("#menuText").attr("index",b).find("span").html(c);$(".menu").find("div").slideUp(150);if(d!=b){game_box_title({info:j,gameIndex:b});_ajax({type:'get',dataType:'text',url:'Default.aspx',data:{history:"1",gameIndex:b}},function(a){$("#history").html(a)})}});$("#look_history").click(function(){if($(this).attr("class").indexOf("active")==-1){$(this).addClass("active");$(".history_wrap").animate({"height":"+=165px"})}else{$(this).removeClass("active");$(".history_wrap").animate({"height":"-=165px"})}});$("#navText a").click(function(){if($(this).attr("id")=="quit"){art.dialog({content:"確定退出系統嗎？",ok:function(){location="/Member/?t="+j.autoTid},cancel:function(){}})}else{var b;var c=$("#menuText").attr("index");var d=$(this).attr("data-mesg");var f=$(this).html();var g=$(this).attr("data-width");var h=$(this).attr("data-height");var i="/Member/Mesg/"+d+".aspx";art.dialog({title:f,padding:"5px 5px",initialize:function(){b=this;_ajax({type:'get',dataType:'text',url:i,data:{t:j.autoTid,gameIndex:c}},function(a){if(d=="Introduction"||d=="Result"||d=="Status"||d=="History"||d=="ChangePwd")b.content(comm.overflowDiv({width:g,height:h,content:a}));else b.content(a);if(d=="Result"||d=="Status"){myResult({gameIndex:c,mythis:b,width:g,height:h,url:i})}else if(d=="History"){myHistory({gameIndex:c,mythis:b,width:g,height:h,url:i})}else if(d=="ChangePwd"){$("#result input").keydown(function(e){if(e.which==13){myChangePwd();return false}})}},function(){b.close()})},ok:function(){if(d=="ChangePwd"){return myChangePwd()}}})}});$(".rightBox div.left li").click(function(){$(".rightBox div.left li").removeClass("active");$(".rightBox div.right ul").removeClass("active");$(this).addClass("active");var a=$(this).attr("name");$("#"+a).addClass("active")});$("#tool_ys_wrap input[type='text']").keyup(function(){$(this).val($(this).val().replace(/[^0-9]/g,''))})$("#tool_ys_wrap span a").click(function(){var a=$(this).html();$("#tool_ys_input").val(a)});$("#tool_ys_wrap em b").click(function(){var a=[];$("#tool_ys_wrap span a").each(function(i){a[i]=$(this).html()});$("#tool_ys_wrap em strong input[type='text']").each(function(i){$(this).val(a[i])});$("#tool_ys_wrap em strong").css("display","block")});$("#tool_ys_wrap em strong input[type='button']").click(function(){var a=[];$("#tool_ys_wrap em strong input[type='text']").each(function(i){a[i]=$(this).val()});$("#tool_ys_wrap span a").each(function(i){$(this).html(a[i])});$("#tool_ys_wrap em strong").css("display","none")})});function openChange(a){$(".WFBox .contentNode").css("display","none");$(".WFBox #conNode_"+$(a).val()).removeAttr("style")}function myResult(e){var f=$("#result");var g=function(b){var c=e.url;var d=b||1;_ajax({type:'get',dataType:'text',url:c,data:{t:__info.autoTid,gameIndex:e.gameIndex,page:d}},function(a){e.mythis.content(comm.overflowDiv({width:e.width,height:e.height,content:a}));myResult({gameIndex:e.gameIndex,mythis:e.mythis,width:e.width,height:e.height,url:c})},function(){e.mythis.close()})};f.find("select[name='select']").val(e.gameIndex);f.find("select[name='select']").change(function(){e.gameIndex=$(this).val();g()});f.find("ul.pager-t li").click(function(){var a=parseInt(f.find("#current_page").val());var b=parseInt(f.find("#total_page").html());var c=comm.searchPage($(this),a,b);if(c){g(c)}})}function myChangePwd(){var b=false;var c=$("#result");var d=c.find("input[name='voldpassword']");var e=c.find("input[name='vnewpassword']");var f=c.find("input[name='vrenewpassword']");if(d.val().length<6||d.val().length>12){myTips({content:"原始密碼长度为6-20位，必须包含大小寫字母和数字",obj:d});d.focus()}else if(e.val().length<6||e.val().length>12){myTips({content:"新設密码长度为6-20位，必须包含大小寫字母和数字",obj:e});e.focus()}else if(f.val()!=e.val()){myTips({content:"兩次如數密碼不一致，請核實后重新輸入",obj:f});f.focus()}else if(d.val()==e.val()){myTips({content:"新密碼與原始密碼一致，請更換新密碼",obj:f});f.focus()}else if(!comm.safety(e.val())){art.dialog({content:comm.errorPwd().replace(/\n\n/g,'<br /><br />'),width:470,ok:function(){}})}else{_ajax({type:'post',url:"/Member/Mesg/ChangePwd.aspx?t="+__info.autoTid,data:{voldpassword:d.val(),vnewpassword:e.val()}},function(a){if(a.result==="1"){art.dialog({content:"密碼修改成功，請重新登錄系統。",ok:function(){},beforeunload:function(){location.href=location.href+"?t="+__info.autoTid}})}else{myTips({content:a.result,obj:d});d.focus()}})}return b}function myHistory(d){var e=d.myIndex||0;var f=d.mydate||null;var g=d.mystate||null;var h=function(b){_ajax({type:'get',dataType:'text',url:d.url,data:{t:__info.autoTid,gameIndex:d.gameIndex,myIndex:e,mydate:f,mystate:g,page:b}},function(a){d.mythis.content(comm.overflowDiv({width:d.width,height:d.height,content:a}));myHistory({gameIndex:d.gameIndex,mythis:d.mythis,width:d.width,height:d.height,url:d.url,myIndex:e,mydate:f,mystate:g})},function(){d.mythis.close()})};$("#myche input[type='radio']").each(function(){if($(this).val()==e)$(this).attr("checked","checked")});$("#result tbody tr.cursor").click(function(){f=$(this).attr("date")||f;g=$(this).attr("mystate")||null;d.mythis.button({value:"返回",callback:function(){f=null;g=null;h();return false}});h()});$("#myche input[type='radio']").click(function(){e=$(this).val();h()});$("#result ul.pager-t li").click(function(){var a=parseInt($("#result #current_page").val());var b=parseInt($("#result #total_page").html());var c=comm.searchPage($(this),a,b);if(c){h(c)}})}