const inputElements = document.querySelectorAll(".card__input"),
  submitButton = document.querySelector(".card__button");

const validateDay = (day) => {
  return day > 0 && day <= 31;
};

const validateMonth = (month) => {
  return month > 0 && month <= 12;
};

const validateYear = (year) => {
  return year > 0 && year <= new Date().getFullYear();
};

const isDateValid = (yearElement, monthElement, dayElement) => {
  let isValid = [false, false, false];

  if (!validateYear(yearElement.value))
    yearElement?.classList?.add("card__input--error");
  else {
    isValid[2] = true;
    yearElement?.classList?.remove("card__input--error");
  }

  if (!validateMonth(monthElement.value))
    monthElement?.classList?.add("card__input--error");
  else {
    isValid[1] = true;
    monthElement?.classList?.remove("card__input--error");
  }

  if (!validateDay(dayElement.value))
    dayElement?.classList?.add("card__input--error");
  else {
    isValid[0] = true;
    dayElement?.classList?.remove("card__input--error");
  }

  return isValid.every((item) => item === true);
};

const calculateAge = function (year, month, day) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();

  //   two conditions needed:
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDay() - birthDate.getDay();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff)) age--;
  return age;
};

const onClickHandler = function () {
  const dayElement = document.querySelector(".card__input[name=day]"),
    monthElement = document.querySelector(".card__input[name = month]"),
    yearElement = document.querySelector(".card__input[name = year]"),
    resultElement = document.querySelector(".card__resultValue");

  if (!isDateValid(yearElement, monthElement, dayElement)) {
    resultElement.textContent = "--";
    return;
  }

  resultElement.textContent = calculateAge(
    yearElement.value,
    monthElement.value,
    dayElement.value
  );
};

submitButton.addEventListener("click", onClickHandler);

// -----------------------

inputElements.forEach((element) => {
  element.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && onClickHandler()
  );
});
