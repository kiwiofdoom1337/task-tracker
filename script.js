let tasks = [{
  name: 'New task is created and added to the list',
  status: 'incomplete'
},
{
  name: 'Clicking the checkbox toggles the completeness',
  status: 'incomplete'
},
{
  name: 'Delete button will delete the task from the list',
  status: 'incomplete'
},
{
  name: 'Complete tasks show at the end with strikethrough',
  status: 'complete'
},
{
  name: 'Marking in complete will put it back in the pending list',
  status: 'complete'
},
]

let inputBtn = document.getElementById('inputFieldBtn');
let container = document.getElementById('taskContainer');
let inputFieldTxt = document.getElementById('inputFieldTxt');

function renderTasks() {
  container.innerHTML = '';

  tasks.forEach((task) => {
    let checkTextCont = document.createElement('span');

    let taskDiv = document.createElement('div');
    taskDiv.style.borderBottom = '1px solid lightgray'
    taskDiv.style.width = '440px'
    taskDiv.style.paddingBottom = '5px'
    taskDiv.style.paddingTop = '5px'
    taskDiv.style.display = 'flex';
    taskDiv.style.justifyContent = 'space-between';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.status === 'complete';

    let taskText = document.createElement('span');
    taskText.textContent = task.name;
    if (task.status === 'complete') {
      taskText.style.textDecoration = 'line-through';
      taskText.style.color = 'gray';
    }
    taskText.style.paddingLeft = '10px'
    
    let deleteBtn = document.createElement('button');

    deleteBtn.style.background = 'none'
    deleteBtn.style.border = 'none'

    let trashBinIco = document.createElement('img');

    trashBinIco.src = ('trash-bin-svg.svg');

    trashBinIco.style.width = '20px'
    
    taskDiv.appendChild(checkTextCont);
    checkTextCont.appendChild(checkbox);
    checkTextCont.appendChild(taskText);
    taskDiv.appendChild(deleteBtn);
    deleteBtn.appendChild(trashBinIco);
    container.appendChild(taskDiv);


    checkbox.addEventListener('change', () => {
      let taskIndex = tasks.indexOf(task);
      if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
        task.status = 'complete';
        tasks.push(task);
        tasks.splice(taskIndex, 1);
        renderTasks();
      } else {
        taskText.style.textDecoration = 'none';
        task.status = 'incomplete';
        renderTasks();
      }
    })

    deleteBtn.addEventListener('click', () => {
      let taskIndex = tasks.indexOf(task);
      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
      }
      renderTasks();
    })
  })
}


inputBtn.addEventListener('click', () => {
  if (inputFieldTxt.value != ''){
    tasks.unshift({name: inputFieldTxt.value, status: 'incomplete'})
    inputFieldTxt.value = '';
    renderTasks();
  }
  
});

inputFieldTxt.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    inputBtn.click();
  }
})

renderTasks();