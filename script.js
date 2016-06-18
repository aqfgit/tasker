let body = document.getElementsByTagName('body')[0];
let taskName = document.querySelector("#taskName");
let addTask = document.querySelector("#addTask");
let toDoTable = document.querySelector('#toDo');
let inProgressTable = document.querySelector('#inProgress');
let doneTable = document.querySelector('#done');
let clearToDoTable = document.querySelector('#clearToDoTable');
let clearInProgressTable = document.querySelector('#clearInProgressTable');
let clearDoneTable = document.querySelector('#clearDoneTable');

let toDoRows = [];
let inProgressRows = [];
let doneRows = [];

clearToDoTable.addEventListener("click", function(){
	for(let i = 0; i < toDoRows.length; i++){
		// if(toDoRows[i].parentNode != toDoTable){
		// 	toDoRows[i].remove();
		// }
		// toDoTable.removeChild(toDoRows[i]);
		toDoRows[i].remove();
	}
	toDoRows.length = 0;
});

clearInProgressTable.addEventListener("click", function(){
	for(let i = 0; i < inProgressRows.length; i++){
		// if(toDoRows[i].parentNode != toDoTable){
		// 	toDoRows[i].remove();
		// }
		// toDoTable.removeChild(toDoRows[i]);
		inProgressRows[i].remove();
	}
	inProgressRows.length = 0;
});

clearDoneTable.addEventListener("click", function(){
	for(let i = 0; i < doneRows.length; i++){
		// if(toDoRows[i].parentNode != toDoTable){
		// 	toDoRows[i].remove();
		// }
		// toDoTable.removeChild(toDoRows[i]);
		doneRows[i].remove();
	}
	doneRows.length = 0;
});


let generateRow = function(){
	let stopped = true;
	let inProgress = false;

	let str_seconds = 0;
	let str_minutes = 0;
	let str_hours = 0;

	let seconds = 0;
	let minutes = 0;
	let hours = 0;

	let clockInterval;


	let tableRowToDo = document.createElement("tr");
	toDoTable.appendChild(tableRowToDo);
	toDoRows.push(tableRowToDo);
	let tableDatas = [];

	for(let i = 0;i < 3;i++){
		tableDatas.push(document.createElement("td"));
		tableRowToDo.appendChild(tableDatas[i]);
	}


	let inProgressTableDatas;
	let tableRowInProgress;
	function addInProgressRow() {
		deleteToDoRow();
		tableRowInProgress = document.createElement("tr");
		inProgressRows.push(tableRowInProgress);
		inProgressTable.appendChild(tableRowInProgress);
		inProgressTableDatas = [];

		for(let i = 0;i < 5;i++){
			inProgressTableDatas.push(document.createElement("td"));
			tableRowInProgress.appendChild(inProgressTableDatas[i]);
		}
		inProgressTableDatas[0].innerText = tableDatas[0].innerText;
		inProgressTableDatas[1].appendChild(stop_btn);
		inProgressTableDatas[2].appendChild(end_btn);
		inProgressTableDatas[4].appendChild(delInProgressRow_btn);
	}

	let doneTableDatas;
	let tableRowDone;
	function endTask() {
		deleteInProgressRow();
		tableRowDone = document.createElement("tr");
		doneRows.push(tableRowDone);
		doneTable.appendChild(tableRowDone);
		doneTableDatas = [];

		for(let i = 0;i < 3;i++){
			doneTableDatas.push(document.createElement("td"));
			tableRowDone.appendChild(doneTableDatas[i]);
		}
			doneTableDatas[0].innerText = inProgressTableDatas[0].innerText;
			doneTableDatas[1].innerText = inProgressTableDatas[3].innerText;
			doneTableDatas[2].appendChild(delDoneRow_btn);
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

		inProgressTableDatas[3].innerHTML = "";
		seconds++;

	  inProgressTableDatas[3].innerHTML += str_hours + ":" +str_minutes + ":" + str_seconds;
	}


	let delToDoRow_btn = document.createElement("button");
	delToDoRow_btn.type = "button";
	delToDoRow_btn.innerText= "Delete";
	delToDoRow_btn.classList.add(".btn");
	delToDoRow_btn.addEventListener("click", deleteToDoRow);

	let delInProgressRow_btn = document.createElement("button");
	delInProgressRow_btn.type = "button";
	delInProgressRow_btn.innerText= "Delete";
	delInProgressRow_btn.classList.add(".btn");
	delInProgressRow_btn.addEventListener("click", deleteInProgressRow);

	let delDoneRow_btn = document.createElement("button");
	delDoneRow_btn.type = "button";
	delDoneRow_btn.innerText= "Delete";
	delDoneRow_btn.classList.add(".btn");
	delDoneRow_btn.addEventListener("click", deleteDoneRow);

	let stop_btn = document.createElement("button");
	stop_btn.type = "button";
	stop_btn.innerText= "Start";
	stop_btn.classList.add(".btn");
	stop_btn.addEventListener("click", stopTimer);

	let end_btn = document.createElement("button");
	end_btn.type = "button";
	end_btn.innerText= "End task";
	end_btn.classList.add(".btn");
	end_btn.addEventListener("click", endTask);

	tableDatas[0].innerText = taskName.value;
	tableDatas[1].appendChild(stop_btn);
	tableDatas[2].appendChild(delToDoRow_btn);

	function deleteToDoRow(){
		if(tableRowToDo.parentNode != toDoTable){
			return;
		}
		inProgress  = true;
		toDoTable.removeChild(tableRowToDo);
	}

	function deleteInProgressRow(){
		if(tableRowInProgress.parentNode != inProgressTable){
			return;
		}
		inProgressTable.removeChild(tableRowInProgress);
	}

	function deleteDoneRow(){
		if(tableRowDone.parentNode != doneTable){
			return;
		}
		doneTable.removeChild(tableRowDone);
	}

	function stopTimer(){
		if(inProgress == false){
			addInProgressRow();
		}
		stopped = !stopped;
		if(stopped == false){
			clockInterval = window.setInterval(addSecond, 1000);
			stop_btn.innerText= "Stop";
		} else{
			clearInterval(clockInterval);
			stop_btn.innerText= "Start";
		}

	}
}

function buttonClicked(){
	generateRow();
}


addTask.addEventListener("click", buttonClicked);
