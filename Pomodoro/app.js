'use strict';

const clock = document.getElementById('Clock');
const startBtn = document.getElementById('StartBtn');
const pomodoroBtn= document.getElementById('pomodoro');
const breakBtn= document.getElementById('breack');
const task = document.getElementById('task');
const btnAddTask = document.getElementById('btnAddTask');
const containerTasks = document.getElementById('tasks');


let minutes = '24';
let seconds = '59';

let isBreak = false;



let interval;


// eventos

startBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    valide();
})

breakBtn.addEventListener('click', ()=> {
    stop();
    clockBreack();
    
});
pomodoroBtn.addEventListener('click', ()=> {
    stop();
    clockFocus();
} ) 

btnAddTask.addEventListener('click', ()=>{
    createTask()
})




// funciones 

function valide() {
    if (startBtn.textContent == 'Start') {
        start();
        startBtn.textContent = 'Stop';
    }else{
        stop();
        startBtn.textContent = 'Start';
    }
}

function start() {
    interval = setInterval(countDown,1000);
}


function stop() {
    clearInterval(interval);
}

//clock

function clockFocus() {
    minutes = '25';
    seconds = '00';
    clock.innerText = `${minutes}:${seconds}`;
    startBtn.textContent = 'Start';
    isBreak= false;
}

function  clockBreack(){
    minutes= '5';
    seconds = '00';
    clock.innerText = `${minutes}:${seconds}`;
    startBtn.textContent = 'Start';
    isBreak = true;
    
}

function countDown(){   
    clock.innerText = `${minutes}:${seconds}`;
    if (minutes <= '00' && !isBreak) {
        clockBreack();
        stop()
    } else if (minutes <= '00' && isBreak) {
        clockFocus();
        stop()
    }

    if (seconds <= "00") {
        minutes--;
        seconds = "60";
    }
    seconds--;
}


// tasks
let taskId = 0;

function createTask() {
    let Tasks = document.createElement('div');
    taskId++;
    Tasks.classList.add('focus-task');
    Tasks.innerHTML = `<p>${task.value}</p> <button class="btn-task-delete" id="btn-task-delete-${taskId}" onclick="deleteTask('task-${taskId}')">x</button>`;
    Tasks.id = `task-${taskId}`;
    containerTasks.append(Tasks);
}

function deleteTask(taskId){
    let taskDelete = document.getElementById(taskId)
    if (taskDelete) {
        taskDelete.remove();
    }
}



