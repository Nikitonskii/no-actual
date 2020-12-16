'use strict';



window.addEventListener('DOMContentLoaded', () => {

	const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

	tl.to('.text', { y: "0%", duration: 2, stagger: 0.25 });
	tl.to('.slider', { y: "-100%", duration: 1.5, delay: 0.5 });
	tl.to('.intro', { y: "-100%", duration: 1 }, "-=1");
	tl.fromTo('.header', { opacity: 0 }, { opacity: 1, duration: 1 });
	tl.fromTo('.sign', { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

	// burger menu

	const burger = document.querySelector('.menu-icon'),
		headerMenu = document.querySelector('.menu__body');

	burger.addEventListener('click', function () {
		this.classList.toggle('_activate');
		headerMenu.classList.toggle('_activate');
	});


	// calc 

	const result = document.querySelector('.calculating__result span');
	let sex, height, weight, age, ratio;

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	function initLocalStorage(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}
	initLocalStorage('#gender div', 'calculating__choose-item_active');
	initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = 'Упустили один из параметров ! ';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	function getStaticInfo(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				console.log(ratio, sex);

				elements.forEach(elem => elem.classList.remove(activeClass));
				e.target.classList.add(activeClass);
				calcTotal();
			});
		});

	}
	getStaticInfo('#gender', 'calculating__choose-item_active');
	getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				//input.style.border = "1px solid red";
				input.classList.add('pulsate-fwd');
			} else {
				input.classList.remove('pulsate-fwd');
				//input.style.border = "none";
			}
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');

	//  slider  and cards

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
		"Crossfit арена",
		"Множество снаряжения, которое поможет тебе не только приобрести желанную форму, но и зверскую выносливость",
		"#",
		//".offer__advantages",
		".offer",
		"active-offer",
		'offer__advantages',
	);
	let offer2 = new BuildNewInfo(
		"02",
		"Фитнесс территория",
		"Уютное место в нашем зале, где каждый обретет колоссальный запас здоровья и конечно же мышц. Наши прекрасные тренера поспособствуют вам в этом как никто другой",
		"#",
		//".offer__advantages",
		".offer",
		"active-offer",
		'offer__advantages',
	);
	let offer3 = new BuildNewInfo(
		"03",
		"Спортпит островок",
		"Большая часть нашего здоровья как физического так и психического зависит от питания, доверьтесь лучшим из лучших, позвольте сделать вас счастливее ! ",
		"#",
		//".offer__advantages",
		".offer",
		"active-offer",
		'offer__advantages',
	);
	let offer4 = new BuildNewInfo(
		"04",
		"Hard местность",
		"Место где твои мышцы наливаются кровью и растут со скоростью сопоставимой восстановлению дедпула. После этого места ты забудешь о тротуарах! ",
		"#",
		//".offer__advantages",
		".offer",
		"active-offer",
		'offer__advantages',
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

	// Scrolls 


	// Price akord
	const panels = document.querySelectorAll('.panel');

	function toggleOpen() {
		this.classList.toggle('open');
	}

	function toggleActive(e) {
		console.log(e.propertyName);
		if (e.propertyName.includes('flex')) {
			this.classList.toggle('open-active');
		}
	}

	panels.forEach(panel => panel.addEventListener('click', toggleOpen));
	panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));




});




/* @@include('alert.js');
@@include('events.js');
@@include('calc.js'); */