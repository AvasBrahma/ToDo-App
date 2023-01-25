( function(){


let tasks=[];
const taskList= document.getElementById('list');
const addTaskInput= document.getElementById('add');
const taskCounter= document.getElementById('tasks-counter');


console.log('Working');

async function fetchTodos() {
   // Get Request  // and return prmoise
    /*fetch('https://jsonplaceholder.typicode.com/todos').then(function(response){
       // console.log(response);
        return response.json();
    }).then(function(data){
        tasks=data.slice(0,10);
        renderList();
        //console.log(data);
    })
     .catch(function(error){
        console.log('error',error);
     })
    */
    try{
     const response=await fetch('https://jsonplaceholder.typicode.com/todos');
     const data= await response.json();
     tasks=data.slice(0,10);
     renderList();

    } catch (error){
       console.log(error);
    }
  

    }


function addTaskToDOM(task){
    console.log(task)
   const li=document.createElement('li');
   li.innerHTML=`
      <input type="checkbox" id="${task.id}"  ${task.completed?'checked' : ''} class="custom-checkbox">
      <label for="${task.id}">${task.title}</label>
      <img src="trash-solid.svg" class="delete" data-id="${task.id}" />
     `;

     taskList.append(li);
}

function renderList(){

    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
          addTaskToDOM(tasks[i]);
    }
    taskCounter.innerHTML=tasks.length;
}


function toggleTask(taskId){
    const task=tasks.filter(function(task){
        return task.id==Number(taskId);
    })
    if(task.length>0){  // if task is empty or not
       const currentTask=task[0];
       currentTask.completed=!currentTask.completed;
       renderList();
       showNotification('Task Toggled Successfully');
       return;
    }
  
    showNotification('Could not Toggled Successfully');
}

function deleteTask(taskId){
    
    const newTask=tasks.filter(function(task){
        return task.id!==taskId;
    });  //iterating throw number of task and adding only those tash
    //which doesn't match with taskid, 
    console.log(newTask);
    tasks = newTask;
   renderList();
   showNotification('Task Deleted Successfully');
}

function addTask(task){
    if(task){
    
     tasks.push(task);
     console.log('Task Push to Array');
     console.log(task);
     renderList();
     showNotification('Task Added Successfully')
     return;
    }
    showNotification('Task Cannot be Added')
}

function showNotification(text){
  alert(text);

}

function handleInputKeyPress(e){

   if(e.key=='Enter'){
       const text=e.target.value;
       console.log(text);
       if(!text){
         showNotification('Task text can not be empty')
         return;
       }

       const task={
        title: text,   // text, basically means text: text,
       // id: Date.now().toString(), //Date.now will create timestamp and we are converting into string
       id: Date.now(),
       completed: false
       }
       
       e.target.value= ''; // making input box as empty after clicking enter
       addTask(task); // call add task func and passing the task

   }

}

function handleClickListner(e){

    const target=e.target;
    console.log(target);

    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return

    }

}

function initializeApp() {
     fetchTodos();
    addTaskInput.addEventListener('keyup', handleInputKeyPress)
    document.addEventListener('click', handleClickListner);

}

initializeApp();
})() 


