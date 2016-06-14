var body = document.getElementsByTagName('body')[0];
var taskName = document.querySelector("#taskName");
var button = document.querySelector("#button");
var table = document.querySelector('table');
var timer = document.querySelector("#time")

var timerInterval = window.setInterval(addSecond,1000);

var str_seconds = 57;
var str_minutes = 59;
var str_hours = 59;

var seconds = 57;
var minutes = 59;
var hours = 59;

function fillTableData(tableDatas, bt){
	tableDatas[0].innerText = taskName.value;
	tableDatas[1].innerText = 12;
	tableDatas[2].innerText = "placeholder";
	tableDatas[3].appendChild(bt);
}

var generateRow = function(){

	var tableRowTd = document.createElement("tr");
	table.appendChild(tableRowTd);
	var tableDatas = []

	for(var i = 0;i < 4;i++){
		tableDatas.push(document.createElement("td"));
		tableRowTd.appendChild(tableDatas[i]);
	}

	var bt = document.createElement("button");
	bt.type = "button";
	bt.innerText= "Usuń";
	bt.classList.add("delete-btn");
	bt.addEventListener("click", deleteTask);

	function deleteTask(){
		table.removeChild(tableRowTd);
	}

	fillTableData(tableDatas,bt);
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


	timer.innerHTML = "";
	seconds++;

	timer.innerHTML += str_hours + ":" +str_minutes + ":" + str_seconds;
}



function buttonClicked(){
	generateRow();
}



button.addEventListener("click", buttonClicked);
