import { checkBoxAll, counter } from './selectors';
import { filterTasks } from './filterTasksAndDeletedTasks';
import { renderTasks } from './renderTasks';
import { tasks, currentTab } from './filterTasksAndDeletedTasks';

checkBoxAll.addEventListener('change', function () {
	const checkBoxAllState = checkBoxAll.checked;

	const renderedTasks = filterTasks(tasks, currentTab);
	renderedTasks.forEach(function (item) {
		item.checked = checkBoxAllState;
	});

	counter.textContent = `${tasks.length} items`;

	renderTasks();
});
