function input(info){
	//输入
	var s = prompt(info, "");
	if(s == "" || s == null) return false;
	return s;
}

function setNo(){
	//设置课程信息
	classNo = input("请输入课程序号（表格第一列）")
	courseNo= input("请输入课程代码（表格第二列）")
	document.getElementsByName("electableLesson.no")[0].value 				= classNo;
	document.getElementsByName("electableLesson.course.code")[0].value 		= courseNo;
	document.getElementsByName("electableLesson.course.name")[0].value 		= "";
	document.getElementsByName("electableLesson.teachClass")[0].value 		= "";
	document.getElementsByName("electableLesson.course.credits")[0].value 	= "";
	document.getElementsByName("electableLesson.teachers")[0].value 		= "";
	document.getElementsByName("electableLesson.campus.name")[0].value 		= "";
	if(classNo && courseNo){	//输入正确
		$("#electableLessonList_filter_submit").click();
		setTimeout(function(){
			if($("#electableLessonList_data").find("a[operator=ELECTION]").length != 1){
				alert("无法使用本脚本，请亲手动选课吧。。。\n原因：根据课程序号和课程代码选出了多个课程。。")
				return false;
			}
			else{
				alert("刷课即将开始，每隔" + refresh_time + "秒我会帮你看看还有没有名额\n为了避免选错，请注意【可选课程页】的课程是否正确。请勿完全依赖本工具！\n刷课状态会在控制台的console上显示。请低调使用")
				gogogo();
			}
		}, 500)
	}else{
		alert("输入有误！");
		return false
	}
}

function gogogo(){
	//选课gogogo！
	$("#electableLessonList_filter_submit").click(); //模拟点击查询
	setTimeout(function(){
		if($("#electableLessonList_data").find("td[class=stdCount]")[0].innerHTML == "0"){
			//没有剩余名额
			console.log("课程人数已满，" + refresh_time + "秒后再试");
			setTimeout("gogogo()", refresh_time * 1000 - 1000)
		}else{
			console.log("有了");
			//屏蔽confirm
			_tmp_confirm = window.confirm;
			window.confirm = function () {
				return true;
			};
			//模拟点击选课按钮
			$("#electableLessonList_data").find("a[operator=ELECTION]").click()
			//恢复confirm
			window.confirm = _tmp_confirm
		}
	}, 1000)

}

refresh_time = 3;	//刷课间隔，可以手动修改，最低为2！
setNo();
