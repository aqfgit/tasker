var body = document.getElementsByTagName('body')[0];
var taskName = document.querySelector("#taskName");
var button = document.querySelector("#button");
var table = document.querySelector('table');

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




function buttonClicked(){
	generateRow();
}



button.addEventListener("click", buttonClicked);
