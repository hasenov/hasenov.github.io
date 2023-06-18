"use strict";

// Variables
var html = document.querySelector("html");
var headerContainer = document.querySelector(".header__container");
var headerColMenu = document.querySelector(".header__col--menu");
var headerColBtns = document.querySelector(".header__col--btns");
var headerMenu = document.querySelector(".header__menu");
var blogColMenu = document.querySelector(".blog__col--menu");
var blogColContent = document.querySelector(".blog__col--content");
var blogMenu = document.querySelector(".blog__menu");
var sidebar = document.querySelector(".sidebar");
var sidebarAuthors = document.querySelector(".sidebar__section--authors");
var postFooter = document.querySelector(".post__footer");
var vacanciesMenu = document.querySelector(".menu-vacancies");
var isLG = false;
enquire
	.register("screen and (max-width: 1200px)", {
		match: function match() {
			isLG = true;
			headerMenu.insertAdjacentElement("beforeend", headerColBtns);
			if (sidebarAuthors && postFooter) {
				postFooter.insertAdjacentElement("afterbegin", sidebarAuthors);
			}
		},
		unmatch: function unmatch() {
			isLG = false;
			headerContainer.insertAdjacentElement("beforeend", headerColBtns);
			if (sidebarAuthors && sidebar) {
				sidebar.insertAdjacentElement("afterbegin", sidebarAuthors);
			}
		},
	})
	.register("screen and (max-width: 768px)", {
		match: function match() {
			if (blogMenu) {
				blogColContent.insertAdjacentElement("afterbegin", blogMenu);
			}
		},
		unmatch: function unmatch() {
			if (blogMenu) {
				blogColMenu.insertAdjacentElement("afterbegin", blogMenu);
			}
		},
	});
document.addEventListener("DOMContentLoaded", function () {
	var lightbox = GLightbox({});
	var sliderCards;
	function initSliderCards() {
		sliderCards = new Swiper(".slider-cards", {
			slidesPerView: "auto",
			spaceBetween: 30,
			watchSlidesProgress: true,
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
			},
			scrollbar: {
				el: ".slider-cards__scrollbar",
				draggable: true,
			},
			breakpoints: {
				576: {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				768: {
					spaceBetween: 20,
					slidesPerView: "auto",
				},
			},
		});
	}
	function destroySliderCards() {
		if (typeof sliderCards !== "undefined") {
			sliderCards.destroy();
			sliderCards = undefined;
			var slides = document.querySelectorAll(".slider-cards .swiper-slide");
			slides.forEach(function (slide) {
				slide.style.width = "";
				slide.style.marginRight = "";
			});
		}
	}
	function checkSliderCards() {
		enquire.register("screen and (max-width: 1200px)", {
			match: function match() {
				initSliderCards();
			},
			unmatch: function unmatch() {
				destroySliderCards();
			},
		});
	}
	if (document.querySelector(".slider-cards")) {
		checkSliderCards();
	}
	var sliderCases = new Swiper(".slider-cases", {
		slidesPerView: "auto",
		spaceBetween: 36,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
		scrollbar: {
			el: ".slider-cases__scrollbar",
			draggable: true,
		},
		breakpoints: {
			576: {
				spaceBetween: 60,
			},
		},
	});
	var sliderFooter = new Swiper(".slider-footer", {
		slidesPerView: 1,
		navigation: {
			nextEl: ".slider-footer__nav--next",
			prevEl: ".slider-footer__nav--prev",
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
	var sliderDocuments = new Swiper(".slider-documents", {
		slidesPerView: "auto",
		spaceBetween: 50,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: ".slider-documents__nav--next",
			prevEl: ".slider-documents__nav--prev",
		},
		breakpoints: {
			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});
	var sliderSimilar = new Swiper(".slider-similar", {
		slidesPerView: "auto",
		spaceBetween: 30,
		watchSlidesProgress: true,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});
	var sliderReviews = new Swiper(".slider-reviews", {
		slidesPerView: 1,
		spaceBetween: 30,
		watchSlidesProgress: true,
		autoHeight: true,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: ".slider-reviews__nav--next",
			prevEl: ".slider-reviews__nav--prev",
		},
		breakpoints: {
			576: {
				slidesPerView: "auto",
				spaceBetween: 50,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	});
	document.querySelectorAll(".js-validate-form").forEach(function (form) {
		var fieldsRequired = form.querySelectorAll(".js-required");
		var fieldsPhone = form.querySelectorAll(".js-phone");
		var fieldsEmail = form.querySelectorAll(".js-email");
		var fieldsDate = form.querySelectorAll(".js-date");
		var phoneMaskOptions = {
			mask: "+{7} (000) 000-00-00",
		};
		var dateMaskOptions = {
			mask: Date,
			lazy: true,
		};
		var validation = new JustValidate(form, {
			errorFieldCssClass: ["is-invalid"],
			errorLabelCssClass: ["invalid"],
		});
		fieldsPhone.forEach(function (el) {
			var mask = IMask(el, phoneMaskOptions);
			validation.addField(el, [
				{
					rule: "required",
					errorMessage: "Заполните поле",
				},
				{
					validator: function validator(val, ctx) {
						var phone = mask.unmaskedValue;
						return phone ? Number(phone) && phone.length === 11 : false;
					},
					errorMessage: "Неверный номер телефона",
				},
			]);
		});
		fieldsDate.forEach(function (el) {
			var mask = IMask(el, dateMaskOptions);
			validation.addField(el, [
				{
					rule: "required",
					errorMessage: "Заполните поле",
				},
				{
					validator: function validator(val, ctx) {
						var date = mask.unmaskedValue;
						return date && date.length === 10;
					},
					errorMessage: "Неверная дата",
				},
			]);
		});
		fieldsRequired.forEach(function (el) {
			validation.addField(el, [
				{
					rule: "required",
					errorMessage: "Заполните поле",
				},
				{
					rule: "maxLength",
					errorMessage: "Максимум 100 символов",
					value: 100,
				},
			]);
		});
		fieldsEmail.forEach(function (el) {
			validation.addField(el, [
				{
					rule: "required",
					errorMessage: "Заполните поле",
				},
				{
					rule: "email",
					errorMessage: "Неверный email",
				},
			]);
		});
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			validation.revalidate().then(function (isValid) {
				// Send form
			});
		});
	});

	// Calculator
	// Обработчик нажатия на кнопку "Дальше"
	var nextButton = document.querySelectorAll(".form-calculator__btn--next");
	nextButton.forEach(function (button) {
		button.addEventListener("click", function () {
			var currentStep = button.closest(".form-calculator__step");
			var nextStep = currentStep.nextElementSibling;

			// Проверяем, есть ли следующий шаг
			if (nextStep) {
				var checkboxes = currentStep.querySelectorAll(".checkbox__input");
				var isValid = false;

				// Проверяем, был ли выбран хотя бы один чекбокс
				checkboxes.forEach(function (checkbox) {
					if (checkbox.checked) {
						isValid = true;
					}
				});
				if (isValid) {
					currentStep.style.display = "none";
					nextStep.style.display = "block";
					nextStep.classList.add("is-active");
				} else {
					alert("Выберите значение");
				}
			}
		});
	});

	// Обработчик нажатия на кнопку "Назад"
	var backButton = document.querySelectorAll(".form-calculator__btn--prev");
	backButton.forEach(function (button) {
		button.addEventListener("click", function () {
			var currentStep = button.closest(".form-calculator__step");
			var previousStep = currentStep.previousElementSibling;

			// Проверяем, есть ли предыдущий шаг
			if (previousStep) {
				currentStep.style.display = "none";
				previousStep.style.display = "block";
				previousStep.classList.add("is-active");
			}
		});
	});

	// Click events
	document.addEventListener("click", function (e) {
		var hamburger = e.target.closest(".header__hamburger");
		if (hamburger) {
			headerColMenu.classList.add("is-active");
			html.classList.add("lock");
		}
		var close = e.target.closest(".header__close");
		if (close) {
			headerColMenu.classList.remove("is-active");
			html.classList.remove("lock");
		}
		var accordionHeader = e.target.closest(".accordion__btn");
		if (accordionHeader) {
			var wrapper = accordionHeader.closest(".accordion");
			var body = wrapper.querySelector(".accordion__body");
			SlideElement.toggle(body);
			wrapper.classList.toggle("is-active");
		}
		var blogMenuBtn = e.target.closest(".menu-blog__btn");
		if (blogMenuBtn) {
			blogMenuBtn.classList.toggle("is-active");
			SlideElement.toggle(blogMenu.querySelector("ul"));
		}
		var vacanciesMenuBtn = e.target.closest(".menu-vacancies__btn");
		if (vacanciesMenuBtn) {
			vacanciesMenuBtn.classList.toggle("is-active");
			SlideElement.toggle(vacanciesMenu.querySelector(".menu-vacancies__inner"));
		}
		var link = e.target.closest(".menu li.has-children > a");
		if (link && isLG) {
			var parent = link.closest("li");
			var dropdown = parent.querySelector(".dropdown");
			parent.classList.toggle("is-active");
			SlideElement.toggle(dropdown);
		}
	});
});

// Dropzone
("use strict");
(function (document, window, index) {
	// feature detection for drag&drop upload
	var isAdvancedUpload = (function () {
		var div = document.createElement("div");
		return ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) && "FormData" in window && "FileReader" in window;
	})();

	// applying the effect for every form
	var forms = document.querySelectorAll(".dropzone");
	Array.prototype.forEach.call(forms, function (form) {
		var input = form.querySelector('input[type="file"]'),
			label = form.querySelector("label"),
			errorMsg = form.querySelector(".dropzone__error span"),
			restart = form.querySelectorAll(".dropzone__restart"),
			droppedFiles = false,
			showFiles = function showFiles(files) {
				label.textContent = files.length > 1 ? (input.getAttribute("data-multiple-caption") || "").replace("{count}", files.length) : files[0].name;
			},
			triggerFormSubmit = function triggerFormSubmit() {
				var event = document.createEvent("HTMLEvents");
				event.initEvent("submit", true, false);
				form.dispatchEvent(event);
			};

		// letting the server side to know we are going to make an Ajax request
		var ajaxFlag = document.createElement("input");
		ajaxFlag.setAttribute("type", "hidden");
		ajaxFlag.setAttribute("name", "ajax");
		ajaxFlag.setAttribute("value", 1);
		form.appendChild(ajaxFlag);

		// automatically submit the form on file select
		input.addEventListener("change", function (e) {
			showFiles(e.target.files);
		});

		// drag&drop files if the feature is available
		if (isAdvancedUpload) {
			form.classList.add("has-advanced-upload"); // letting the CSS part to know drag&drop is supported by the browser

			["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(function (event) {
				form.addEventListener(event, function (e) {
					// preventing the unwanted behaviours
					e.preventDefault();
					e.stopPropagation();
				});
			});
			["dragover", "dragenter"].forEach(function (event) {
				form.addEventListener(event, function () {
					form.classList.add("is-dragover");
				});
			});
			["dragleave", "dragend", "drop"].forEach(function (event) {
				form.addEventListener(event, function () {
					form.classList.remove("is-dragover");
				});
			});
			form.addEventListener("drop", function (e) {
				droppedFiles = e.dataTransfer.files; // the files that were dropped
				showFiles(droppedFiles);
			});
		}

		// if the form was submitted
		form.addEventListener("submit", function (e) {
			// preventing the duplicate submissions if the current one is in progress
			if (form.classList.contains("is-uploading")) return false;
			form.classList.add("is-uploading");
			form.classList.remove("is-error");
			if (isAdvancedUpload) {
				// ajax file upload for modern browsers
				e.preventDefault();

				// gathering the form data
				var ajaxData = new FormData(form);
				if (droppedFiles) {
					Array.prototype.forEach.call(droppedFiles, function (file) {
						ajaxData.append(input.getAttribute("name"), file);
					});
				}

				// ajax request
				var ajax = new XMLHttpRequest();
				ajax.open(form.getAttribute("method"), form.getAttribute("action"), true);
				ajax.onload = function () {
					form.classList.remove("is-uploading");
					if (ajax.status >= 200 && ajax.status < 400) {
						var data = JSON.parse(ajax.responseText);
						form.classList.add(data.success == true ? "is-success" : "is-error");
						if (!data.success) errorMsg.textContent = data.error;
					} else alert("Error. Please, contact the webmaster!");
				};
				ajax.onerror = function () {
					form.classList.remove("is-uploading");
					alert("Error. Please, try again!");
				};
				ajax.send(ajaxData);
			} // fallback Ajax solution upload for older browsers
			else {
				var iframeName = "uploadiframe" + new Date().getTime(),
					iframe = document.createElement("iframe");
				$iframe = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');
				iframe.setAttribute("name", iframeName);
				iframe.style.display = "none";
				document.body.appendChild(iframe);
				form.setAttribute("target", iframeName);
				iframe.addEventListener("load", function () {
					var data = JSON.parse(iframe.contentDocument.body.innerHTML);
					form.classList.remove("is-uploading");
					form.classList.add(data.success == true ? "is-success" : "is-error");
					form.removeAttribute("target");
					if (!data.success) errorMsg.textContent = data.error;
					iframe.parentNode.removeChild(iframe);
				});
			}
		});

		// restart the form if has a state of error/success
		Array.prototype.forEach.call(restart, function (entry) {
			entry.addEventListener("click", function (e) {
				e.preventDefault();
				form.classList.remove("is-error", "is-success");
				input.click();
			});
		});

		// Firefox focus bug fix for file input
		input.addEventListener("focus", function () {
			input.classList.add("has-focus");
		});
		input.addEventListener("blur", function () {
			input.classList.remove("has-focus");
		});
	});
})(document, window, 0);
