const nameInput = document.querySelector("input#name");
nameInput.type = "text";
nameInput.required = true;
nameInput.addEventListener("focusout", validateName);

function validateName() {
  const errorField = document.querySelector(".field.name .error");
  if (nameInput.validity.valueMissing) {
    errorField.textContent = "* Please provide your name";
    nameInput.classList.add("invalid");
  } else {
    errorField.textContent = "";
    nameInput.classList.remove("invalid");
  }
}

const emailInput = document.querySelector("input#email");
emailInput.type = "email";
emailInput.required = true;
emailInput.addEventListener("focusout", validateEmail);

function validateEmail() {
  const errorField = document.querySelector(".field.email .error");
  if (emailInput.validity.valueMissing) {
    errorField.textContent = "* Please provide an email address";
    emailInput.classList.add("invalid");
  } else if (emailInput.validity.typeMismatch) {
    errorField.textContent = "* Please provide a valid email address";
    emailInput.classList.add("invalid");
  } else {
    errorField.textContent = "";
    emailInput.classList.remove("invalid");
  }
}


const zipCodes = {
  "in": {
    regexp: "[1-9][0-9]{5}",
    example: 	"712401",
  },
  "ps": {
    regexp: "[1-9][0-9]{2}",
    example: "980",
  },
  "gb": {
    regexp: "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})",
    example: "B17 0DH",
  },
  "us": {
    regexp: "[0-9]{5}(?:-[0-9]{4})?",
    example: "06426",
  },
  "jp": {
    regexp: "\\d{3}-\\d{4}",
    example: "612-0812",
  },
  "nz": {
    regexp: "\\d{4}",
    example: "7281",
  },
};

const countryInput = document.querySelector("select#country");

const zipCodeInput = document.querySelector("input#zip");
zipCodeInput.type = "text";
zipCodeInput.required = true;
zipCodeInput.pattern = zipCodes[countryInput.value].regexp;
zipCodeInput.addEventListener("focusout", validateZipCode);

countryInput.addEventListener("change", () => {
  zipCodeInput.pattern = zipCodes[countryInput.value].regexp;
  validateZipCode();
});


function validateZipCode() {
  const errorField = document.querySelector(".field.zip .error");
  if (zipCodeInput.validity.valueMissing) {
    errorField.textContent = "* Please provide the zip code of your area";
    zipCodeInput.classList.add("invalid");
  } else if (zipCodeInput.validity.patternMismatch) {
    errorField.textContent = `* Please provide a valid zip code in your country (e.g. ${zipCodes[countryInput.value].example})`;
    zipCodeInput.classList.add("invalid");
  } else {
    errorField.textContent = "";
    zipCodeInput.classList.remove("invalid");
  }
}

const passwordInput = document.querySelector("input#password");
passwordInput.type = "password";
passwordInput.required = true;
passwordInput.pattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}";
passwordInput.addEventListener("focusout", validatePassword);

function validatePassword() {
  const errorField = document.querySelector(".field.password .error");
  if (passwordInput.validity.valueMissing) {
    errorField.textContent = "* Please provide a password";
    passwordInput.classList.add("invalid");
  } else if (passwordInput.validity.patternMismatch) {
    errorField.textContent = "* The password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character(@, $, !, %, *, ?, &)";
    passwordInput.classList.add("invalid");
  } else {
    errorField.textContent = "";
    passwordInput.classList.remove("invalid");
  }
  confirmPassword();
}

const confirmInput = document.querySelector("input#confirm");
confirmInput.type = "password";
confirmInput.required = true;
confirmInput.addEventListener("focusout", confirmPassword);

function confirmPassword() {
  const errorField = document.querySelector(".field.confirm .error");
  if (confirmInput.validity.valueMissing) {
    errorField.textContent = "* Please re-enter your password";
    confirmInput.classList.add("invalid");
  } else if (confirmInput.value !== passwordInput.value) {
    errorField.textContent = "* Passwords do not match";
    confirmInput.setCustomValidity("Passwords do not match");
    confirmInput.classList.add("invalid");
  } else {
    errorField.textContent = "";
    confirmInput.setCustomValidity("");
    confirmInput.classList.remove("invalid");
  }
}

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () => {
  const form = document.querySelector("form");
  form.reportValidity();

  document.querySelector(".popper-left").style.display = "block";
  document.querySelector(".popper-right").style.display = "block";
  document.querySelector(".success-text").style.display = "block";
  document.querySelector("form").style.display = "none";
});