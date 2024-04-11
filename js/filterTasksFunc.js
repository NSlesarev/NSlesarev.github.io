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
