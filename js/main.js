

  let inputTasks = document.querySelector('#inputTasks'); //Инпут для ввода задач
  let buttonAdd = document.querySelector('#buttonAdd'); // кнопка Добавить Задачу
  let iconArrow = document.querySelector('.icon');  // будущая кнопка стрелка
  let contentItems = document.querySelector('.content-items'); //переменная куда будет появлятся задача  

  let all = document.querySelectorAll('#all');
  let active = document.querySelectorAll('#active');
  let completed = document.querySelectorAll('#completed');
  let clearCompleted = document.querySelectorAll('#clearCompleted');





  
  

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
      checked: false
    };

    // добавляем обьекты в массив
    tasks.unshift(obj);
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
      <li class="box">
        <input class="check" type="checkbox" id='${i}' ${item.checked ? 'checked' : ''}>
        <p class="text" id="item_${i}">${item.contentItems}</p>
        <label class="lable-check" for='item_${i}'></label>
      </li>
     `;
     //реализуем появление на сайте
     contentItems.innerHTML = displayMessage;
    });
  };

  
  
  let boxes = document.querySelectorAll('.box');
    
  iconArrow.addEventListener('click', function() {
   
      boxes.forEach(function(box) {
        box.toggleAttribute('hidden');
      });
  });

  let checkBox = document.querySelectorAll('.check');

    checkBox.forEach(function(item){
      item.addEventListener('click', function(){
        tasks[item.id].checked = !tasks[item.id].checked;
        console.log( tasks[item.id])
        localStorage.setItem('contentItems', JSON.stringify(tasks));
      })
    });
    
    
    
    completed.addEventListener('click', function(){
      
      let completedTasks = tasks.filter(function(task) {
        return task.checked;
        
        
      });
      displayCompletedTasks(completedTasks);
    })

  

  // contentItems.addEventListener('change', function(event){
  //   let idInput = event.target.getAttribute('id');
  //   let forLabel = contentItems.querySelector('[for=' + idInput + ']');
  //   let valueLable = forLabel.innerHTML;
    
  //   contentItems.forEach(function(item){
  //     if (item.contentItems === valueLable) {
  //       item.checked = !item.checked;
  //       localStorage.setItem('contentItems', JSON.stringify(tasks));
  //     }
  //   });
  // });

  
  
