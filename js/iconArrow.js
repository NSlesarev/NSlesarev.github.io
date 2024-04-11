import { iconArrow } from './const';

iconArrow.addEventListener('click', function () {
	let boxes = document.querySelectorAll('.box');
	boxes.forEach(function (box) {
		box.classList.toggle('hidden');
	});
	iconArrow.classList.toggle('rotate');
});
