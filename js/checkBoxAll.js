import { checkBoxAll, counter } from './const';
import { filterTasks } from './filterTasksFunc';
import { renderTasks } from './renderTasksFunc';
import { currentTab, tasks } from './tasks';

checkBoxAll.addEventListener('change', function () {
	const checkBoxAllState = checkBoxAll.checked;

	const renderedTasks = filterTasks(tasks, currentTab);
	renderedTasks.forEach(function (item) {
		item.checked = checkBoxAllState;
	});

	counter.textContent = `${tasks.length} items`;

	renderTasks();
});
