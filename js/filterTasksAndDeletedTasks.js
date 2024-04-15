import { tabs } from './selectors';
import { renderTasks } from './renderTasks';
import { deleteAllButton } from './selectors';
export let currentTab = 'all';
export let tasks = localStorage.getItem('contentItems')
	? JSON.parse(localStorage.getItem('contentItems'))
	: [];

renderTasks();
export function filterTasks(tasks, currentTab) {
	let renderedTasks = [];
	switch (currentTab) {
		case 'active': {
			renderedTasks = tasks.filter(function (item) {
				return item.checked === false;
			});
			break;
		}
		case 'completed': {
			renderedTasks = tasks.filter(function (item) {
				return item.checked === true;
			});
			break;
		}
		default: {
			renderedTasks = tasks;
			break;
		}
	}
	return renderedTasks;
}
tabs.forEach(function (el) {
	el.addEventListener('click', (event) => {
		tabs.forEach((item) => {
			if (item.id !== event.target.id) {
				item.style.cssText =
					'color: rgb(83, 127, 94); background-color: rgb(230, 235, 231, .4)';
			} else {
				item.style.cssText =
					'color: white; background-color: rgb(56, 59, 58, 0.9);';
			}
		});

		if (event.target.id == 'all') {
			currentTab = 'all';
		} else if (event.target.id == 'active') {
			currentTab = 'active';
		} else if (event.target.id == 'completed') {
			currentTab = 'completed';
		} else {
			tasks = tasks.filter((item) => {
				return item.checked === false;
			});
		}

		renderTasks();
	});
});

deleteAllButton.addEventListener('click', function () {
	tasks = [];

	renderTasks();
});
