"use strict";

// render offers 

const slides = document.querySelectorAll('.slider__item'),
	smallSlides = document.querySelectorAll('.slider__item-small'),
	prev = document.querySelector('.offer__slider-prev'),
	next = document.querySelector('.offer__slider-next'),
	total = document.querySelector('#total'),
	current = document.querySelector('#current');

let slideIndex = 1;

class BuildNewInfo {
	constructor(count, header, text, link, parentSelector, ...classes) {
		this.count = count;
		this.header = header;
		this.text = text;
		this.link = link;
		this.classes = classes;
		//this.prevSelector = document.querySelector(prevSelector);
		this.parent = document.querySelector(parentSelector);
	}

	render() {

		const casing = document.createElement('div');
		if (this.classes.length === 0) {
			this.class = 'offer__advantages';
			casing.classList.add(this.class);
		} else {
			this.classes.forEach(className => casing.classList.add(className));
		}
		casing.innerHTML = `
		<div class="offer__count">.${this.count}</div>
		<div class="offer__advantages-text">
			<h1>${this.header}</h1>
			<p>${this.text}</p>
		</div>
		<button type="submit" formaction="${this.link}" class="btn__offer">Узнай больше</button>
		`;
		//console.log(this.prevSelector);
		//this.prevSelector.remove();
		this.parent.prepend(casing);
	}
}

let offer1 = new BuildNewInfo(
	"01",
	"Hello mazafaka",
	"Посетите наш зал и вы будете на 7м небе от счастья...Лучшие тренажеры, лучшие тренера !!!",
	"#",
	//".offer__advantages",
	".offer",
);
let offer2 = new BuildNewInfo(
	"02",
	"Hello mazafaka its SECOND offert",
	"КУпите  качественный, проверненный и в хуй вкусный СПОРТПИТ",
	"#",
	//".offer__advantages",
	".offer",
);
let offer3 = new BuildNewInfo(
	"03",
	"Hello mazafaka its THIRD offert",
	"Врывайтесь с кентами, семьей, сам(если вы одинокий волчара), ну а вообще можете и с телками",
	"#",
	//".offer__advantages",
	".offer",
);
let offer4 = new BuildNewInfo(
	"04",
	"Hello mazafaka its FOURTH  offert",
	"Групповые занятия, с лучшими из лучгих в лучшем для лучших !!!",
	"#",
	//".offer__advantages",
	".offer",
);

let offers = [offer1, offer2, offer3, offer4];

// Double- Slider main 

console.log(slides);

showSlides(slideIndex);

if (slideIndex < 10) {
	total.textContent = `0${slides.length}`;
} else {
	total.textContent = slides.length;
}

function showSlides(n) {
	if (n > slides.length || n > smallSlides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	smallSlides.forEach(item => item.style.display = "none");
	smallSlides[slideIndex - 1].style.display = "block";
	slides.forEach(item => item.style.display = "none");
	slides[slideIndex - 1].style.display = "block";

	if (slideIndex < 10) {
		current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}
}

function plusSlider(n) {
	showSlides(slideIndex += n);
}

prev.addEventListener('click', () => {
	plusSlider(1);
	document.querySelector(".offer__advantages").remove();
	offers[slideIndex - 1].render();
});
next.addEventListener('click', () => {
	plusSlider(-1);
	document.querySelector(".offer__advantages").remove();
	offers[slideIndex - 1].render();
});













