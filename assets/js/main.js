//Оголошення функції populateDOM
//Приймає масив data (наприклад, список задач).

//функція appendItem створює новий <li> елемент.

const list = document.querySelector(".activity");

// Період, який зараз активний (може бути: daily, weekly, monthly)
let currentPeriod = "weekly";

// Всі radio
const lastingRadios = document.querySelectorAll(
  ".period-label input[type='radio']"
);
console.log(lastingRadios);

// Змінна для збереження всіх даних з data.json
let allData = [];

// Додаємо обробники на кожен radio
lastingRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    // Оновлюємо період
    currentPeriod = radio.value;
    console.log("Вибрано:", currentPeriod);
    // Очищуємо список
    list.innerHTML = "";

    // Перегенеровуємо елементи за новим періодом
    populateDOM(allData);
  });
});

const appendItem = (item) => {
  const { title, timeframes } = item;

  // Беремо потрібний період
  const current = timeframes[currentPeriod].current;

  const previous = timeframes[currentPeriod].previous;

  //Формуємо клас для фону (work, play, study...)
  const typeClass = title.toLowerCase().replace(" ", "-");

  // Створюємо li
  const li = document.createElement("li");
  // Генеруємо правильний шлях до іконки
  const src = `assets/images/icon-${typeClass}.svg`;
  li.classList.add(typeClass, "activity-item");

  // Формуємо HTML всередині
  li.innerHTML = `
  <img
    class="activity-image"
    src="assets/images/icon-${typeClass}.svg"
   alt="${title}"
    width="78"
    height="78"
  />
  <div class="times">
    <div class="act-title">
      <p class="act-name middle-text">${title}</p>
      <img
        class="ellipsis"
        src="assets/images/icon-ellipsis.svg"
        alt="Ellipsis"
        width="21"
        height="5"
      />
    </div>
    <div class="hours">
      <p class="hours-now">${current}hrs</p>
      <p class="last small-text">
        Last -
        <span class="hours-last small-text">${previous}hrs</span>
      </p>
    </div>
  </div>
`;

  // Додаємо в список
  list.appendChild(li);
};

//Оголошення функції populateDOM
//Приймає масив data (наприклад, список задач).

const populateDOM = (data) => {
  //для каждого элемента в массиве data
  //выполнить функцию appendItem, передавая туда этот элемент
  data.forEach((item) => {
    appendItem(item);
  });
};
// Запуск запиту на отримання даних
fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong.");
    return response.json();
  })
  .then((data) => {
    //обрабатывать данные
    allData = data;
    populateDOM(data);
  });
