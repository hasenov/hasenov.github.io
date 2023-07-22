document.addEventListener("DOMContentLoaded", function () {
	var formSuccess = document.querySelector(".form-callback__success");
	var formFooter = document.querySelector(".form-callback__footer");
	function showSuccessMessage() {
		formFooter.style.display = "none";
		formSuccess.style.display = "flex";
	}

	document.querySelectorAll(".js-validate-form").forEach(function (form) {
		var fieldsRequired = form.querySelectorAll(".js-required");
		var fieldsPhone = form.querySelectorAll(".js-phone");
		var fieldsEmail = form.querySelectorAll(".js-email");
		var phoneMaskOptions = {
			mask: "+{7} (000) 000-00-00",
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
					errorMessage: "Пожалуйста, укажите корректный номер",
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
					errorMessage: "Пожалуйста, укажите корректный e-mail",
				},
			]);
		});
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			validation.revalidate().then(function (isValid) {
				if (isValid) {
					// Отправка формы
					showSuccessMessage();
				}
			});
		});
	});
});
