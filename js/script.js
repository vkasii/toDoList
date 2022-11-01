const  button = document.querySelector('button');
const createTask = document.forms['add-task'][0];
const alertEmpty = document.querySelector('.alert-empty');
const alertLastElem = document.querySelector('.alert-last-element') 
const closeAlert = document.querySelector('.x');
const closeAlert2 = document.querySelector('.delete');
const addTask = document.querySelector('.task-list__tasks');

button.addEventListener('click', () => {
   if(createTask.value == ''){
      alertEmpty.style.display = 'flex';
      closeAlert.addEventListener('click', () => {
         alertEmpty.style.display = 'none';
      })
   }
   else {
      let tasks = document.createElement('form');
      tasks.setAttribute('class', 'tasks')
      addTask.append(tasks);
      tasks.innerHTML += '<input type="checkbox"> ' + `<span> ${createTask.value}</span>` + '</br>';
      createTask.value = '';
   }
})

addTask.addEventListener('click', (event) => {
   const removeCheckbox = document.querySelectorAll('.tasks');
   if(removeCheckbox.length > 1){
      event.target.parentElement.remove()     
      console.log(removeCheckbox.length);    
   }
   else if(removeCheckbox.length = 1){
      alertLastElem.style.display = 'flex';
      closeAlert2.addEventListener('click', () => {
         alertLastElem.style.display = 'none';
      })
   }
})
