let taskName = document.querySelector("#taskName");
let addTask = document.querySelector("#addTask");
let toDoTable = document.querySelector('#toDo');
let inProgressTable = document.querySelector('#inProgress');
let doneTable = document.querySelector('#done');
let clearToDoTable = document.querySelector('#clearToDoTable');
let clearInProgressTable = document.querySelector('#clearInProgressTable');
let clearDoneTable = document.querySelector('#clearDoneTable');

//Eareasing entire table's content by clicking these 'Clear table' buttons
let toDoRows = [];
let inProgressRows = [];
let doneRows = [];

clearToDoTable.addEventListener("click", function(){
	for(let i = 0; i < toDoRows.length; i++){
		toDoRows[i].remove();
	}
	toDoRows.length = 0;
});

clearInProgressTable.addEventListener("click", function(){
	for(let i = 0; i < inProgressRows.length; i++){
		inProgressRows[i].remove();
	}
	inProgressRows.length = 0;
});

clearDoneTable.addEventListener("click", function(){
	for(let i = 0; i < doneRows.length; i++){
		doneRows[i].remove();
	}
	doneRows.length = 0;
});

let generateRow = function(){
	//Creating buttons
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

	let tableRowToDo = document.createElement("tr");
	toDoTable.appendChild(tableRowToDo);
	toDoRows.push(tableRowToDo);
	let toDoTableDatas = [];

	//Defining "To do" table
	for(let i = 0;i < 3;i++){
		toDoTableDatas.push(document.createElement("td"));
		tableRowToDo.appendChild(toDoTableDatas[i]);
	}

	toDoTableDatas[0].innerText = taskName.value;
	toDoTableDatas[1].appendChild(stop_btn);
	toDoTableDatas[2].appendChild(delToDoRow_btn);

	//Defining "In progress" table
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
		inProgressTableDatas[0].innerText = toDoTableDatas[0].innerText;
		inProgressTableDatas[1].appendChild(stop_btn);
		inProgressTableDatas[2].appendChild(end_btn);
		inProgressTableDatas[4].appendChild(delInProgressRow_btn);
	}

	//Defining "Done" table.This function moves data from "In progress" table to "Done" table
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
	//Creating clock object and related functions
	let clock = {
	stopped: true,
	inProgress: false,

	str_seconds: 0,
	str_minutes: 0,
	str_hours: 0,

	seconds: 0,
	minutes: 0,
	hours: 0,

	clockInterval: null
};

	function addZeroBefore(){
			if(clock.seconds < 10){
				clock.str_seconds = "0" + clock.seconds;
			} else{
				clock.str_seconds = clock.seconds;
			}
			if(clock.minutes < 10){
				clock.str_minutes = "0" + clock.minutes;
			} else{
				clock.str_minutes= clock.minutes;
			}
			if(clock.hours < 10){
				clock.str_hours = "0" + clock.hours;
			} else{
				clock.str_hours = clock.hours;
			}
	}

	function addSecond(){
		 addZeroBefore();
		 if(clock.seconds >= 59){
			clock.seconds = -1;
			clock.minutes++;
		}
		if(clock.minutes > 59){
			clock.minutes = 0;
			clock.hours++;
		}
		inProgressTableDatas[3].innerHTML = "";
		clock.seconds++;

	  inProgressTableDatas[3].innerHTML += clock.str_hours + ":" +clock.str_minutes + ":" + clock.str_seconds;
	}
	//Functions responsible for deletings rows after the button was clicked
	function deleteToDoRow(){
		if(tableRowToDo.parentNode != toDoTable){
			return;
		}
		clock.inProgress  = true;
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
	//Starting/stopping clock after the button was clicked.This functions also moves a row from "Todo" table to "In progress" table
	function stopTimer(){
		if(clock.inProgress == false){
			addInProgressRow();
		}
		clock.stopped = !clock.stopped;
		if(clock.stopped == false){
			clock.clockInterval = window.setInterval(addSecond, 1000);
			stop_btn.innerText= "Stop";
		} else{
			clearInterval(clock.clockInterval);
			stop_btn.innerText= "Start";
		}
	}
}

addTask.addEventListener("click", generateRow);
