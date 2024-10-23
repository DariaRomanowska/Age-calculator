const inputArr = document.querySelectorAll('.input-wrap');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

let dayEnter = '- -'
let monthEnter = '- -'
let yearEnter = '- -'
let dayCheck = 0;
let monthCheck = 0;

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
}

function dayValidation(input, errorMessage, label, result) {
    const daysInCurrentMonth = getDaysInMonth(month, year);
    if (input.value < 0 || input.value > 31) {

        errorMessage.textContent = 'Must be a valid day'
        errorStyle(input, errorMessage, label)
        result.textContent = '- -'
        return false;
    }


    if (input.value.length > 0) {
        dayEnter = day - input.value

    }
    if (dayEnter < 0) {
        dayCheck = dayEnter + daysInCurrentMonth
    }

    return true;
}

function monthValidation(input, errorMessage, label, result) {
    if (input.value < 0 || input.value > 12) {
        errorMessage.textContent = 'Must be a valid month'
        errorStyle(input, errorMessage, label)
        result.textContent = '- -'
        return false;
    }

    if (input.value.length > 0) {
        monthEnter = month - input.value
        if (dayCheck !== 0) {
            console.log(dayEnter)
            monthEnter--
        }
    }
    if (monthEnter < 0) {
        monthCheck = monthEnter + 12
    }

    return true;
}

function yearValidation(input, errorMessage, label, result) {
    if (input.value > year) {
        errorMessage.textContent = 'Must be in the past'
        errorStyle(input, errorMessage, label)
        result.textContent = '- -'
        return false;
    } else if (input.value.length > 0) {
        yearEnter = year - input.value
        if (monthCheck !== 0) {
            yearEnter--
        }
    }
    return true;
}

function validationInput(input, label, errorMessage) {
    if (input.value.length === 0) {
        errorMessage.textContent = 'The field is required';
        errorStyle(input, errorMessage, label)
        return false;
    }
    return true;
}

function errorStyle(input, errorMessage, label) {
    label.style.color = 'hsl(0, 100%, 67%)'
    input.style.border = '1px solid hsl(0, 100%, 67%)'
    setTimeout(() => {
        errorMessage.textContent = ''
        label.style.color = 'hsl(0, 1%, 44%)'
        input.style.border = '1px solid hsl(0, 0%, 86%)'
    }, 3000);
}


document.querySelector('.submit-btn').addEventListener('click', (e) => {
    const dayRes = document.getElementById('day-res');
    const monthRes = document.getElementById('month-res');
    const yearRes = document.getElementById('year-res');

    let isValid = true;


    inputArr.forEach((block) => {
        const input = block.querySelector('input')
        const label = block.querySelector('label')
        const message = block.querySelector('.error-massage')

        if (!validationInput(input, label, message)) {
            isValid = false;
            return;
        }

        if (block.classList.contains('day-wrap')) {
            if (!dayValidation(input, message, label, dayRes)) {
                isValid = false;
            }
        }
        if (block.classList.contains('month-wrap')) {
            if (!monthValidation(input, message, label, monthRes)) {
                isValid = false;
            }
        }
        if (block.classList.contains('year-wrap')) {
            if (!yearValidation(input, message, label, yearRes)) {
                isValid = false;
            }
        }
        if (isValid) {
            if (dayCheck !== 0) {
                dayRes.textContent = dayCheck;

            } else {
                dayRes.textContent = dayEnter;
            }

            if (monthCheck !== 0) {
                monthRes.textContent = monthCheck;
            } else {
                monthRes.textContent = monthEnter;
            }
            yearRes.textContent = yearEnter;
        }
    })
    dayEnter = 0;
    dayCheck = 0;
    monthEnter = 0;
    monthCheck = 0;
    yearEnter = 0;
    console.log(dayEnter, dayCheck, monthEnter, monthCheck, yearEnter)
})