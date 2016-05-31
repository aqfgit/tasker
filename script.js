var body = document.getElementsByTagName('body')[0];
var taskName = document.querySelector("#taskName");
var button = document.querySelector("#button");
var table = document.querySelector('table');
var timer = document.querySelector("#time")

var timerInterval = window.setInterval(addSecond,1000);

var seconds = 57;
var minutes = 59;
var hours = 0;

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

function addSecond(){
	

	
	 if(seconds >= 59){
		seconds = -1;
		minutes++;
		
	}
	
	else if(minutes > 59){
		minutes = 0;
		hours++;
	}
	
	timer.innerHTML = "";
	seconds++;
	
	timer.innerHTML += hours + ":" + minutes + ":" + seconds;
}


function buttonClicked(){
	generateRow();
}



button.addEventListener("click", buttonClicked);
