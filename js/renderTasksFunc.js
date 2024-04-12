import { filterTasks } from './filterTasksFunc';
import {
	counter,
	contentItems,
	checkBoxAll,
	selectA,
	selectStyle,
} from './const';
import { tasks, currentTab } from './tasks';

// import _ from 'lodash';

export function renderTasks() {
	let displayMessage = '';

	const renderedTasks = filterTasks(tasks, currentTab);

	counter.textContent = `${renderedTasks.length} items`;

	renderedTasks.forEach(function (item) {
		displayMessage += `
      <li class="box">
          <input class="check" type="checkbox" id='${item.id}' ${item.checked ? 'checked' : ''}>
          <p class="text" id="item_${item.id}">${item.contentItems}</p>
          <label class="lable-check" for='item_${item.id}'></label>
        <img class='deleted' src='../src/img/deleted.png'>
      </li>
     `;
	});

	const CheckAll = renderedTasks.every((item) => {
		return item.checked !== false;
	});

	if (renderedTasks.length > 0) {
		selectStyle.classList.remove('hidden');
		selectStyle.classList.add('visible');
	} else {
		selectStyle.classList.remove('visible');
		selectStyle.classList.add('hidden');
	}

	checkBoxAll.checked = CheckAll;
	selectA.innerHTML = CheckAll ? 'Remove selection' : 'Select all';

	contentItems.innerHTML = displayMessage;

	localStorage.setItem('contentItems', JSON.stringify(tasks));
}
