import { checkBoxAll, contentItems, selectA } from './const';
import { renderTasks } from './renderTasksFunc';
import { tasks } from './tasks';

contentItems.addEventListener('change', function (event) {
	if (event.target.classList.contains('check')) {
		let checkBoxState = event.target.checked;

		if (checkBoxState == false) {
			selectA.innerHTML = 'Select all';
			checkBoxAll.checked = false;
		}

		tasks.forEach((task) => {
			if (task.id == event.target.id) {
				task.checked = checkBoxState;
			}
		});

		console.log(tasks);
	}

	renderTasks();
});
