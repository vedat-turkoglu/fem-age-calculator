const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const outputYears = document.getElementById("output-years");
const outputMonths = document.getElementById("output-months");
const outputDays = document.getElementById("output-days");

const dayErr = document.getElementById("day_err");
const monthErr = document.getElementById("month_err");
const yearErr = document.getElementById("year_err");

const labelDay = document.getElementById("label-day");
const labelMonth = document.getElementById("label-month");
const labelYear = document.getElementById("label-year");

const calcBtn = document.getElementById("calc-btn");

// variables
let day, month, year;
const d = new Date();
const currentYear = d.getFullYear();

// is it leap year function
const isLeapYear = (year) => (new Date(year, 1, 29).getMonth() === 1 ? 1 : 0);

const months = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

// Error Handling
const inputErrorHandler = (elLabel, element, errorMessage) => {
  elLabel.style.color = "#ff5959";
  element.style.borderColor = "#ff5959";
  errorMessage.style.display = "block";
};
const inputErrorReset = (elLabel, element, errorMessage) => {
  elLabel.style.color = "#716f6f";
  element.style.borderColor = "#dcdcdc";
  errorMessage.style.display = "none";
};

// VADLIDATE INPUT VALUES
const validateYear = () => {
  inputErrorReset(labelYear, inputYear, yearErr);
  const numberCheckYear = /(^[1-9][0-9][0-9][0-9])/.test(year);

  if (!year) {
    yearErr.textContent = "This field is required";
    inputErrorHandler(labelYear, inputYear, yearErr);
  } else if (!numberCheckYear) {
    yearErr.textContent = "Must be a valid date";
    inputErrorHandler(labelYear, inputYear, yearErr);
  } else if (Number(year) > currentYear) {
    yearErr.textContent = "Must be in the past";
    inputErrorHandler(labelYear, inputYear, yearErr);
  }
};

const validateMonth = () => {
  inputErrorReset(labelMonth, inputMonth, monthErr);
  const numberCheckMonth = /(^[0-1][0-9])/.test(month);

  if (!month) {
    monthErr.textContent = "This field is required";
    inputErrorHandler(labelMonth, inputMonth, monthErr);
  } else if (!numberCheckMonth || Number(month) > 12 || Number(month) < 1) {
    monthErr.textContent = "Must be a valid date";
    inputErrorHandler(labelMonth, inputMonth, monthErr);
  }
};

const validateDay = () => {
  inputErrorReset(labelDay, inputDay, dayErr);
  const numberCheckday = /(^[0-3][0-9])/.test(day);

  if (month == 2 && isLeapYear(year) == 1) {
    months[2] = 29;
  } else {
    months[2] = 28;
  }

  if (!day) {
    dayErr.textContent = "This field is required";
    inputErrorHandler(labelDay, inputDay, dayErr);
  } else if (
    !numberCheckday ||
    Number(day) > months[Number(month) || Number(day) < 1]
  ) {
    dayErr.textContent = "Must be a valid date";
    inputErrorHandler(labelDay, inputDay, dayErr);
  }
};

// Updating dom for outputs
const updateDom = (y, m, dy) => {
  if (
    dayErr.style.display === "none" &&
    monthErr.style.display === "none" &&
    yearErr.style.display === "none"
  ) {
    outputYears.textContent = y;
    outputMonths.textContent = m;
    outputDays.textContent = dy;
  }
  return;
};

// Calculate Result
const calculateAge = () => {
  validateYear();
  validateMonth();
  validateDay();

  const inputDate = new Date(`${year}-${month}-${day}`);
  const diff = d.getTime() - inputDate.getTime();
  const diffDays = diff / 86400000;

  const totalYears = Math.floor(diffDays / 365.5);
  const totalMonths = Math.floor((diffDays - totalYears * 365.5) / 30);
  const totalDays = Math.floor(
    diffDays - totalYears * 365.5 - totalMonths * 30
  );

  updateDom(totalYears, totalMonths, totalDays);
};

// Event Listeners
inputDay.addEventListener("change", (e) => {
  dayErr.style.display = "none";
  day = e.target.value;
});
inputMonth.addEventListener("change", (e) => {
  monthErr.style.display = "none";
  month = e.target.value;
});

inputYear.addEventListener("change", (e) => {
  yearErr.style.display = "none";
  year = e.target.value;
});

calcBtn.addEventListener("click", calculateAge);
