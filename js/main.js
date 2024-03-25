




document.addEventListener("DOMContentLoaded", function() {
  var inputTasks = document.getElementById("inputTasks");
  var buttonAdd = document.getElementById("buttonAdd");
  var todoList = document.getElementById("todoList");
  var filterOptions = document.getElementById("filterOptions");

  // Массив для хранения задач
  var tasks = [];

  // Функция для отображения задач из массива
  function renderTodoList() {
      todoList.innerHTML = ''; // Очищаем список

      tasks.forEach(function(task) {
          var li = document.createElement('li');
          li.textContent = task;
          todoList.appendChild(li);
      });
  }

  // Функция для добавления новой задачи
  function addTask() {
      var taskText = inputTasks.value.trim();
      if (taskText !== '') {
          tasks.push(taskText);
          inputTasks.value = ''; // Очищаем поле ввода
          renderTodoList(); // Перерисовываем список задач
      }
  }

  // Обработчик нажатия на кнопку "Добавить задачу"
  buttonAdd.addEventListener("click", addTask);

  // Обработчик нажатия на Enter в поле ввода
  inputTasks.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          addTask();
      }
  });

  // Обработчик изменения фильтра задач
  filterOptions.addEventListener("change", function() {
      var filterValue = filterOptions.value;
      // Реализация фильтрации задач по filterValue
  });
});