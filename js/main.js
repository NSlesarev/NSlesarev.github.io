let inputTasks = document.querySelector("#inputTasks"); //Инпут для ввода задач
let buttonAdd = document.querySelector("#buttonAdd"); // кнопка Добавить Задачу
let iconArrow = document.querySelector(".icon"); // будущая кнопка стрелка
let contentItems = document.querySelector(".content-items"); //переменная куда будет появлятся задача

let all = document.querySelector("#all");
let active = document.querySelector("#active");
let completed = document.querySelector("#completed");
let clearCompleted = document.querySelector("#clearComplited");
let deletedIcon = document.querySelector('.deleted');
let counter = document.querySelector('.content-num');
let deletedAll = document.querySelector('.content-deletAll');
let deletedAlll = document.querySelector('.cont-deletAll');
let content = document.querySelector('.content-ul');
//Массив для хранения задач
let tasks = localStorage.getItem("contentItems") ? JSON.parse(localStorage.getItem("contentItems")) : [];

let currentTab = 'all';


displayMessages();

//обработчик события на кнопке Добавить задачу
buttonAdd.addEventListener("click", function () {
  //обьект с данными о задачах
  let obj = {
    id: Date.now(),
    contentItems: inputTasks.value,
    checked: false,
  };

  // добавляем обьекты в массив
  tasks.unshift(obj);
  displayMessages();
  inputTasks.value = "";
  // сохранение данных, и через JSON преобразуем в строки
});


//Создаем функцию по добавлению новых окон
function displayMessages() {
  // console.log(tasks)
  // сама переменная останется пустой, так как подписи задач не нужно
  let displayMessage = "";
  
  let renderedTasks = []

  switch (currentTab) {
    

    case 'active': {
      renderedTasks = tasks.filter(function(item) {
        return item.checked === false;
        
      })
      break;
    } 

    case 'completed': {
      renderedTasks = tasks.filter(function(item) {
        return item.checked === true;
      })
      break;
    }


    default: {
      renderedTasks = tasks;
      break;
    }
  }
  
  
//прописать каждое условие на каждое значение Таба, 

// обратиться к группе, и через фореач накинуть на каждый элемент обработчик событий, и затем в зависимости от переменной каренТаб менять стили в дереве для активного таба

renderedTasks.forEach(function (item, i) {
    //добавления тега li через += для того что бы они поступали столько сколько это необходимо
    displayMessage += `
      <li class="box">
        <input class="check" type="checkbox" id='${item.id}' ${item.checked ? "checked" : ""}>
        <p class="text" id="item_${i}">${item.contentItems}</p>
        <label class="lable-check" for='item_${i}'></label>
        <img class='deleted' src='../src/img/deleted.png'>
      </li>
     `;
    //реализуем появление на сайте
  });

  // console.log(displayMessage)

  contentItems.innerHTML = displayMessage;

  counter.textContent = `${tasks.length} items`;

  localStorage.setItem("contentItems", JSON.stringify(tasks));
}

all.addEventListener('click', function(){
  currentTab = 'all';
  displayMessages();
})


active.addEventListener('click', function(){
  currentTab = 'active';
  
  displayMessages();
})


completed.addEventListener('click', function(){
  currentTab = 'completed';
  displayMessages();
})



clearCompleted.addEventListener('click', function(){
  tasks = tasks.filter(item =>{
    return item.checked === false;
  })

  displayMessages()
})




let boxes = document.querySelectorAll(".box");

iconArrow.addEventListener("click", function () {
  boxes.forEach(function (box) {
    box.toggleAttribute("hidden");
  });
});







let checkBox = document.querySelectorAll(".check");


checkBox.forEach(function(item) {

  item.addEventListener("change", function () {

    tasks[item.id].checked = !tasks[item.id].checked;

    counter.textContent = `${tasks.length} items`;

    
    displayMessages();
  });

});



contentItems.addEventListener("click", function(event) {


  if (event.target.classList.contains('deleted')) { 

    const li = event.target.closest('.box'); 

    const index = Array.from(contentItems.children).indexOf(li); 

    tasks.splice(index, 1).requestAnimationFrame; 

    displayMessages(); 
  }
});




deletedAll.addEventListener("click", function() {
  tasks = [];

  displayMessages();
      
});


