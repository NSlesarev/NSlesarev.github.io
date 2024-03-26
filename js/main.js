
// document.addEventListener("DOMContentLoaded", function() {

//   const inputTasks = document.getElementById("inputTasks");
//   const buttonAdd = document.getElementById("buttonAdd");
//   const todoList = document.getElementById(".content-items");
//   const filterOptions = document.getElementById(".content-option");

//   // Массив для хранения задач
//   let tasks = [];

//   // Функция для отображения задач из массива
//   function renderTodoList() {
    
//       todoList.innerHTML = ''; // Очищаем список
  
      

//       tasks.forEach(function(task) {
//           let li = document.createElement('li');
//           li.textContent = task;
//           todoList.appendChild(li);
//       });
//   }

//   // Функция для добавления новой задачи
//   function addTask() {
//       let taskText = inputTasks.value.trim();
//       if (taskText !== '') {
//           tasks.push(taskText);
//           inputTasks.value = ''; // Очищаем поле ввода
//           renderTodoList(); // Перерисовываем список задач
//       }
//   }

//   // Обработчик нажатия на кнопку "Добавить задачу"
//   buttonAdd.addEventListener("click", addTask);

//   // Обработчик нажатия на Enter в поле ввода
//   inputTasks.addEventListener("keypress", function(event) {
//       if (event.key === "Enter") {
//           addTask();
//       }
//   });

//   // Обработчик изменения фильтра задач
//   filterOptions.addEventListener("change", function() {
//       let filterValue = filterOptions.value;
//   });
// });






// document.addEventListener('DOMContentLoaded', function() {})

  let inputTasks = document.querySelector('#inputTasks'); //Инпут для ввода задач
  let buttonAdd = document.querySelector('#buttonAdd'); // кнопка Добавить Задачу
  let iconArrow = document.querySelector('.icon');  // будущая кнопка стрелка
  let contentItems = document.querySelector('.content-items'); //переменная куда будет появлятся задача


  
  

  //Массив для хранения задач
  let tasks = [];


  //получаем данные которые были ранее написаны в Tasks(массив)
  if (localStorage.getItem('contentItems')){

    tasks = JSON.parse(localStorage.getItem('contentItems'));

    displayMessages();
  }


  //обработчик события на кнопке Добавить задачу
  buttonAdd.addEventListener('click', function() {


    //обьект с данными о задачах
    let obj = {
      contentItems: inputTasks.value,
      checked: false,
    };

    // добавляем обьекты в массив
    tasks.push(obj);
    displayMessages()
    // сохранение данных, и через JSON преобразуем в строки
    localStorage.setItem('contentItems', JSON.stringify(tasks));

  });
    //Создаем функцию по добавлению новых окон
  function displayMessages() {
    // сама переменная останется пустой, так как подписи задач не нужно
    let displayMessage = '';
    
    
    
    tasks.forEach(function(item, i) {
      //добавления тега li через += для того что бы они поступали столько сколько это необходимо
     displayMessage += `
      <li>
        <input class="check" type="checkbox" id='item_${i}' ${item.checked ? checked : ''}>
        <label class="lable-check" for='item_${i}'></label>
        <p class="text" id="item_${i}">${item.contentItems}</p>
      </li>
     `;
     //реализуем появление на сайте
     contentItems.innerHTML = displayMessage;
    });
  }

  
