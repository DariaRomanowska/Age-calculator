const inputArr = document.querySelectorAll('.input-wrap');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const errorNull = 'This field is required';
const errorDay = 'Must be a valid day';
const errorMonth = 'Must be a valid month';
const errorYear = 'Must be in the past';
const errorValid = 'Must be a valid date';
const errorEmpty = '';

let dayRes, monthRes, yearRes;

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === Number(year) &&
        date.getMonth() + 1 === Number(month) &&
        date.getDate() === Number(day);
}

function calculateAge(day, month, year) {
    let calculatedDay = currentDay - day;
    let calculatedMonth = currentMonth - month;
    let calculatedYear = currentYear - year;

    if (calculatedDay < 0) {
        calculatedMonth--;
        calculatedDay += new Date(currentYear, currentMonth - 1, 0).getDate();
    }

    if (calculatedMonth < 0) {
        calculatedYear--;
        calculatedMonth += 12;
    }

    dayRes = calculatedDay;
    monthRes = calculatedMonth;
    yearRes = calculatedYear;
}

function showError(input, errorMessage, label, errorText) {
    label.style.color = 'hsl(0, 100%, 67%)';
    input.style.border = '1px solid hsl(0, 100%, 67%)';
    errorMessage.textContent = errorText;
    setTimeout(() => {
        errorMessage.textContent = '';
        label.style.color = 'hsl(0, 1%, 44%)';
        input.style.border = '1px solid hsl(0, 0%, 86%)';
    }, 3000);
}

document.querySelector('.submit-btn').addEventListener('click', () => {
    const dayInput = document.getElementById('day').value;
    const monthInput = document.getElementById('month').value;
    const yearInput = document.getElementById('year').value;

    const dayWrap = document.querySelector('.day-wrap');
    const monthWrap = document.querySelector('.month-wrap');
    const yearWrap = document.querySelector('.year-wrap');

    const inputDay = dayWrap.querySelector('input');
    const labelDay = dayWrap.querySelector('label');
    const messageDay = dayWrap.querySelector('.error-massage');

    const inputMonth = monthWrap.querySelector('input');
    const labelMonth = monthWrap.querySelector('label');
    const messageMonth = monthWrap.querySelector('.error-massage');

    const inputYear = yearWrap.querySelector('input');
    const labelYear = yearWrap.querySelector('label');
    const messageYear = yearWrap.querySelector('.error-massage');

    const dayResTxt = document.getElementById('day-res');
    const monthResTxt = document.getElementById('month-res');
    const yearResTxt = document.getElementById('year-res');


    let isDateValid = true;

    if (!dayInput) {
        showError(inputDay, messageDay, labelDay, errorNull);
        isDateValid = false;
    }
    if (!monthInput) {
        showError(inputMonth, messageMonth, labelMonth, errorNull);
        isDateValid = false;
    }
    if (!yearInput) {
        showError(inputYear, messageYear, labelYear, errorNull);
        isDateValid = false;
    }

    if (isDateValid) {
        if (dayInput < 1 || dayInput > 31) {
            showError(inputDay, messageDay, labelDay, errorDay);
            isDateValid = false;
        }
        if (monthInput < 1 || monthInput > 12) {
            showError(inputMonth, messageMonth, labelMonth, errorMonth);
            isDateValid = false;
        }
        if (yearInput > currentYear) {
            showError(inputYear, messageYear, labelYear, errorYear);
            isDateValid = false;
        }
    }


    if (isDateValid && !isValidDate(dayInput, monthInput, yearInput)) {
        showError(inputDay, messageDay, labelDay, errorValid);
        showError(inputMonth, messageMonth, labelMonth, errorEmpty);
        showError(inputYear, messageYear, labelYear, errorEmpty);
        isDateValid = false;
    }


    if (isDateValid && yearInput > currentYear) {
        showError(inputYear, messageYear, labelYear, errorYear);
        isDateValid = false;
    }

    if (isDateValid) {
        calculateAge(dayInput, monthInput, yearInput);
        dayResTxt.textContent = dayRes
        monthResTxt.textContent = monthRes
        yearResTxt.textContent = yearRes
    }
});
