const date_picker_element = document.querySelector(".date-picker");
const selected_date_element = document.querySelector(
  ".date-picker .selected-date"
);
const dates_element = document.querySelector(".date-picker .dates");
const mth_element = document.querySelector(".date-picker .dates .month .mth");
const next_mth_element = document.querySelector(
  ".date-picker .dates .month .next-mth"
);
const prev_mth_element = document.querySelector(
  ".date-picker .dates .month .prev-mth"
);
const days_element = document.querySelector(".date-picker .dates .days");
const weekdays_element = document.querySelector(
  ".date-picker .dates .weekdays"
);

const langPicker = document.getElementById("lang-picker");

document.getElementById("capture-button").addEventListener("click", () => {
  const elementToCapture = document.getElementById("capture-me");

  html2canvas(elementToCapture).then((canvas) => {
    const dataURL = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "lillys-image.png";
    downloadLink.click();
  });
});

const monthsDe = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const monthsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthsTr = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Auğustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const weekdaysDe = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const weekdaysEn = ["Su", "Mo", "Tue", "We", "Thu", "Fr", "Sa"];
const weekdaysTr = ["Pz", "Pzt", "Sa", "Ça", "Pe", "Cu", "Cts"];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let pickedMonth = "1";
let pickedWeekday = "1";
mth_element.textContent = monthsDe[month] + " " + year;

langPicker.addEventListener("change", function (e) {
  pickedMonth = e.target.value;
  if (pickedMonth == "1") {
    mth_element.textContent = monthsDe[month] + " " + year;
    pickedWeekday = "1";
  }
  if (pickedMonth == "2") {
    mth_element.textContent = monthsEn[month] + " " + year;
    pickedWeekday = "2";
  }
  if (pickedMonth == "3") {
    mth_element.textContent = monthsTr[month] + " " + year;
    pickedWeekday = "3";
  }
  populateDates();
  initWeekDays();
});

// selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();
initWeekDays();

// EVENT LISTENERS
date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", goToNextMonth);
prev_mth_element.addEventListener("click", goToPrevMonth);

// FUNCTIONS
function toggleDatePicker(e) {
  if (
    !checkEventPathForClass(
      e.path || (e.composedPath && e.composedPath()),
      "dates"
    )
  ) {
    dates_element.classList.toggle("active");
  }
}

function goToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  if (pickedMonth == "1") {
    mth_element.textContent = monthsDe[month] + " " + year;
  }
  if (pickedMonth == "2") {
    mth_element.textContent = monthsEn[month] + " " + year;
  }
  if (pickedMonth == "3") {
    mth_element.textContent = monthsTr[month] + " " + year;
  }

  populateDates();
  initWeekDays();
}

function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  if (pickedMonth == "1") {
    mth_element.textContent = monthsDe[month] + " " + year;
  }
  if (pickedMonth == "2") {
    mth_element.textContent = monthsEn[month] + " " + year;
  }
  if (pickedMonth == "3") {
    mth_element.textContent = monthsTr[month] + " " + year;
  }

  populateDates();
  initWeekDays();
}

function populateDates(e) {
  days_element.innerHTML = "";
  let amount_days = 32;

  if (month == 1) {
    amount_days = 29;
  }

  if (month == 3 || month == 5 || month == 8 || month == 10) {
    amount_days = 31;
  }

  const firstDay = new Date(year, month, 1);
  let startingDay = firstDay.getDay();
  for (let i = 1; i < amount_days + startingDay; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");

    if (startingDay - i < 0) {
      day_element.textContent = i - startingDay;
    }

    if (
      selectedDay == i - startingDay &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add("selected");
    }

    day_element.addEventListener("click", function () {
      selectedDate = new Date(
        year + "-" + (month + 1) + "-" + (i - startingDay)
      );
      selectedDay = i - startingDay;
      selectedMonth = month;
      selectedYear = year;

      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;

      populateDates();
    });

    days_element.appendChild(day_element);
  }
}

function initWeekDays() {
  weekdays_element.innerHTML = "";

  for (let i = 0; i < weekdaysDe.length; i++) {
    const weekday_element = document.createElement("div");
    weekday_element.classList.add("w-days");
    if (pickedWeekday == "1") {
      weekday_element.textContent = weekdaysDe[i];
    }
    if (pickedWeekday == "2") {
      weekday_element.textContent = weekdaysEn[i];
    }
    if (pickedWeekday == "3") {
      weekday_element.textContent = weekdaysTr[i];
    }

    weekdays_element.appendChild(weekday_element);
  }
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = d.getFullYear();

  return day + " / " + month + " / " + year;
}
