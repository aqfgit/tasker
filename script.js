var body = document.getElementsByTagName('body')[0];
var taskName = document.querySelector("#taskName");
var button = document.querySelector("#button");

function fillTableData(tableDatas){
	tableDatas[0].innerText = taskName.value;
	tableDatas[1].innerText = timer.seconds;
	tableDatas[2].innerText = "placeholder";
}

var generateTable = function(){
	var table = document.createElement("table");
	body.appendChild(table);
	var tableRowTh = document.createElement("tr");
	table.appendChild(tableRowTh);
	var tableHeaders = [];

	for(var i = 0;i < 3;i++){
		tableHeaders.push(document.createElement("th"));
		tableRowTh.appendChild(tableHeaders[i]);
	}
	tableHeaders[0].innerText = "Task name";
	tableHeaders[1].innerText = "Time";
	tableHeaders[2].innerText = "Status";

	var tableRowTd = document.createElement("tr");
	table.appendChild(tableRowTd);
	var tableDatas = []

	for(var i = 0;i < 3;i++){
		tableDatas.push(document.createElement("td"));
		tableRowTd.appendChild(tableDatas[i]);
	}

	fillTableData(tableDatas);
}



var timer = {
	hours: 0,
	minutes: 0,
	seconds: 0
};
function runTimer(){
	timer.seconds++; 
}

	

function buttonClicked(){
	var timerInterval = setInterval(runTimer,1000);
	var tableInterval = setInterval(fillTableData,1000);
	runTimer();
	generateTable();
}



button.addEventListener("click",buttonClicked);

