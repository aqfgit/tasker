var body = document.getElementsByTagName('body')[0];
var taskName = document.querySelector("#taskName");
var addTask = document.querySelector("#addTask");
var table = document.querySelector('table');
//var timer = document.querySelector(".time")

var stopped = false;

var str_seconds = 0;
var str_minutes = 0;
var str_hours = 0;

var seconds = 0;
var minutes = 0;
var hours = 0;

function fillTableData(tableDatas,del_btn,stop_btn,time){
	tableDatas[0].innerText = taskName.value;
	tableDatas[1].innerText = "placeholder";
	tableDatas[2].appendChild(stop_btn);
	tableDatas[3].appendChild(del_btn);
	tableDatas[4].appendChild(time)
}

var generateRow = function(){

	var tableRowTd = document.createElement("tr");
	table.appendChild(tableRowTd);
	var tableDatas = []

	for(var i = 0;i < 5;i++){
		tableDatas.push(document.createElement("td"));
		tableRowTd.appendChild(tableDatas[i]);
	}

	fillTableData(tableDatas,del_btn,stop_btn,time);
}

var del_btn = document.createElement("button");
del_btn.type = "button";
del_btn.innerText= "Usuń";
del_btn.classList.add("btn");
del_btn.addEventListener("click", deleteTask);

var stop_btn = document.createElement("button");
stop_btn.type = "button";
stop_btn.innerText= "Stop";
stop_btn.classList.add("btn");
stop_btn.addEventListener("click", stopTimer);

var time = document.createElement("p");
time.classList.add("time");

function deleteTask(){
	table.removeChild(tableRowTd);
}

function stopTimer(){
	stopped = !stopped;
	if(stopped == true){
			clearInterval(timerInterval);
			stop_btn.innerText= "Start";
	} else{
		timerInterval = window.setInterval(addSecond,1000);
		stop_btn.innerText= "Stop";
	}
}

function addZeroBefore(){
		if(seconds < 10){
			str_seconds = "0" + seconds;
		} else{
			str_seconds = seconds;
		}
		if(minutes < 10){
			str_minutes = "0" + minutes;
		} else{
			str_minutes= minutes;
		}
		if(hours < 10){
			str_hours = "0" + hours;
		} else{
			str_hours = hours;
		}
}

function addSecond(){
	 addZeroBefore();
	 if(seconds >= 59){
		seconds = -1;
		minutes++;

	}

	if(minutes > 59){
		minutes = 0;
		hours++;
	}


	time.innerHTML = "";
	seconds++;

	time.innerHTML += str_hours + ":" +str_minutes + ":" + str_seconds;
}



function buttonClicked(){
	timerInterval = window.setInterval(addSecond,1000);
	generateRow();
}



addTask.addEventListener("click", buttonClicked);
