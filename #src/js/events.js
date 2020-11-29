"use strict"

const burger = document.querySelector('.menu-icon'),
	headerMenu = document.querySelector('.menu__body');
burger.addEventListener('click', function () {
	this.classList.toggle('_activate');
	headerMenu.classList.toggle('_activate');
	console.log(this);

});
console.log(burger);
