let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function openSchedule(){
window.location.href="schedule.html";
}

function goBack(){
window.location.href="index.html";
}

function addTask(){

let text=document.getElementById("taskInput").value;
let start=document.getElementById("start").value;
let end=document.getElementById("end").value;
let priority=document.getElementById("priority").value;

if(!text || !start || !end){
alert("Fill all fields");
return;
}

if(start>=end){
alert("End must be after start");
return;
}

tasks.push({text,start,end,priority,done:false});
save();

document.getElementById("taskInput").value="";
document.getElementById("start").value="";
document.getElementById("end").value="";
}

function show(){

let list=document.getElementById("list");
if(!list) return;

tasks.sort((a,b)=>a.start.localeCompare(b.start));
list.innerHTML="";

tasks.forEach((t,i)=>{

let li=document.createElement("li");
li.className=t.priority;

let text=document.createElement("span");
text.innerHTML=`<b>${t.text}</b><br>${t.start} - ${t.end}`;

if(t.done) text.classList.add("done");

text.onclick=()=>{
tasks[i].done=!tasks[i].done;
save();
show();
};

let del=document.createElement("button");
del.innerText="Delete";
del.className="smallBtn";

del.onclick=()=>{
tasks.splice(i,1);
save();
show();
};

li.appendChild(text);
li.appendChild(del);

list.appendChild(li);
});

updateStats();
}

function updateStats(){
let count=document.getElementById("count");
if(!count) return;

count.innerText="Total Tasks: "+tasks.length;

let done=tasks.filter(t=>t.done).length;
let percent=tasks.length?(done/tasks.length)*100:0;

document.getElementById("bar").style.width=percent+"%";
}

show();
