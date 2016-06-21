let taskName = document.querySelector("#taskName");
let addTask = document.querySelector("#addTask");
let toDoTable = document.querySelector('#toDoTable');
let inProgressTable = document.querySelector('#inProgressTable');
let doneTable = document.querySelector('#doneTable');
//Eareasing entire table's content by clicking these 'Clear table' buttons

let rows = {
  toDo: [],
  inProgress: [],
  done: []
}
for (let item of document.querySelectorAll('.clear-btn')) {
  item.addEventListener('click', clearTable);
}
function clearTable(e) {
  let tableName = e.target.id;
	for(let i = 0; i < rows[tableName].length; i++){
				rows[tableName][i].remove();
			}
  rows[tableName] = [];
}

function generateButton(text, func, extraClass) {
  let button = document.createElement('button');
  button.type = 'button';
  button.innerText = text;
  button.classList.add('btn', extraClass);
  button.addEventListener('click', func);
  return button;
}

let generateRow = function(){

	//Creating buttons
	let delToDoRow_btn = generateButton('Delete', deleteToDoRow, "del-btn");
  let delInProgressRow_btn = generateButton('Delete', deleteInProgressRow, "del-btn");
  let delDoneRow_btn = generateButton('Delete', deleteDoneRow, "del-btn");
  let stop_btn = generateButton('Start', stopTimer, "stop-btn");
  let end_btn = generateButton('End task', endTask, "end-btn");

	let tableRowToDo = document.createElement("tr");
	toDoTable.appendChild(tableRowToDo);
	rows.toDo.push(tableRowToDo);
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
		rows.inProgress.push(tableRowInProgress);
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
		rows.done.push(tableRowDone);
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
			stop_btn.style.backgroundColor = "#96838F";
		} else{
			clearInterval(clock.clockInterval);
			stop_btn.innerText= "Start";
			stop_btn.style.backgroundColor = "#53b56d";
		}
	}

	(function clearTable(){
 		taskName.value = "";
		})()
}

	//User can add task by clicking "Add task" button,or pressing enter in input box
	addTask.addEventListener('click', generateRow);

	taskName.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
			e.preventDefault(e);
      generateRow();
    }
});
