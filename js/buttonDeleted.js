import { renderTasks } from './renderTasksFunc';
import { contentItems } from './const';
import { tasks } from './tasks';

contentItems.addEventListener('click', function (event) {
	if (event.target.classList.contains('deleted')) {
		const li = event.target.closest('.box');

		const index = Array.from(contentItems.children).indexOf(li);

		tasks.splice(index, 1).requestAnimationFrame;

		renderTasks();
	}
});
