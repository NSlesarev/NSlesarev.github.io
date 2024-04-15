import { addButton, inputTasks } from './selectors';
import { renderTasks } from './renderTasks';
import _ from 'lodash';
import { tasks } from './filterTasksAndDeletedTasks';
tasks;

addButton.addEventListener('click', function () {
	let obj = {
		id: Date.now(),
		contentItems: _.escape(inputTasks.value),
		checked: false,
	};

	if (inputTasks.value === '') {
		console.log();
	} else tasks.unshift(obj);

	renderTasks();

	inputTasks.value = '';
});

inputTasks.addEventListener('keypress', function (e) {
	let key = e.which || e.keyCode;
	if (key === 13) {
		addButton.click();
	}
});
