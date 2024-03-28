let inputTasks = document.querySelector("#inputTasks"); //Инпут для ввода задач
let buttonAdd = document.querySelector("#buttonAdd"); // кнопка Добавить Задачу
let iconArrow = document.querySelector(".icon"); // будущая кнопка стрелка
let contentItems = document.querySelector(".content-items"); //переменная куда будет появлятся задача

let all = document.querySelectorAll("#all");
let active = document.querySelectorAll("#active");
let completed = document.querySelectorAll(".completed");
let clearCompleted = document.querySelectorAll("#clearCompleted");
let deletedIcon = document.querySelector('.deleted');
let counter = document.querySelector('.content-num');
let deletedAll = document.querySelector('.content-deletAll')
//Массив для хранения задач
let tasks = [];

//получаем данные которые были ранее написаны в Tasks(массив)
if (localStorage.getItem("contentItems")) {
  tasks = JSON.parse(localStorage.getItem("contentItems"));

  displayMessages();
}

//обработчик события на кнопке Добавить задачу
buttonAdd.addEventListener("click", function () {
  //обьект с данными о задачах
  let obj = {
    contentItems: inputTasks.value,
    checked: false,
  };

  // добавляем обьекты в массив
  tasks.unshift(obj);
  displayMessages();
  inputTasks.value = "";
  // сохранение данных, и через JSON преобразуем в строки
  localStorage.setItem("contentItems", JSON.stringify(tasks));
});
//Создаем функцию по добавлению новых окон
function displayMessages() {
  // сама переменная останется пустой, так как подписи задач не нужно
  let displayMessage = "";

  tasks.forEach(function (item, i) {
    //добавления тега li через += для того что бы они поступали столько сколько это необходимо
    displayMessage += `
      <li class="box">
        <input class="check" type="checkbox" id='${i}' ${item.checked ? "checked" : ""}>
        <p class="text" id="item_${i}">${item.contentItems}</p>
        <label class="lable-check" for='item_${i}'></label>
        <img class='deleted' src='../src/img/deleted.png'>
      </li>
     `;
    //реализуем появление на сайте
    contentItems.innerHTML = displayMessage;
  });
  counter.textContent = `${tasks.length} items`;
}

let boxes = document.querySelectorAll(".box");

iconArrow.addEventListener("click", function () {
  boxes.forEach(function (box) {
    box.toggleAttribute("hidden");
  });
});







let checkBox = document.querySelectorAll(".check");

checkBox.forEach(function (item) {
  item.addEventListener("click", function () {
    tasks[item.id].checked = !tasks[item.id].checked;
    counter.textContent = `${tasks.length} items`;

    localStorage.setItem("contentItems", JSON.stringify(tasks));
  });
});
// function arraySorting(tasks) {
//   const sort = tasks.sort((a, b) =>
//     a.checked === b.checked ? 0 : a.checked ? -1 : 1
//   );
//   return sort;
// }

// completed.addEventListener("click", function () {
  
//   const completedTasks = sortedTasks.filter((task) => task.checked === true);

//   contentItems.innerHTML = "";

//   completedTasks.forEach((task) => {
//     const taskItem = document.createElement("li");

//     taskItem.textContent = task.contentItems;

//     contentItems.appendChild(taskItem);
//   });
// });
contentItems.addEventListener("click", function(event) {


  if (event.target.classList.contains('deleted')) { 

    const li = event.target.closest('.box'); 

    const index = Array.from(contentItems.children).indexOf(li); 

    tasks.splice(index, 1).requestAnimationFrame; 

    displayMessages(); 



    
    localStorage.setItem("contentItems", JSON.stringify(tasks));
  }
});

contentItems.addEventListener("click", function(event) {

  if (event.target.classList.contains('deletedAll')) {

    const li = event.target.closest('.content-deletAll');

    const ind = Array.from(contentItems.children).indexOf(li);

    tasks.splice(ind, tasks.length - ind);


    
    displayMessages();
    


    
    localStorage.setItem("contentItems", JSON.stringify(tasks));

  }
});
