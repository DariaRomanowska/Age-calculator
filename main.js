const inputArr = document.querySelectorAll('.input-wrap');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate()
console.log(month)
console.log(day)

function validationInput (input, label, errorMessage) {
           if(input.value.length === 0){
               errorMessage.textContent = 'The field is required';
               errorStyle (input, errorMessage, label)
        }
        console.log('ok')
}

function dayValidation(input, errorMessage, label, result) {
    if(input.value < 0 || input.value > 31){
        errorMessage.textContent = 'Must be a valid day'
        errorStyle (input, errorMessage, label)
    } else if(input.value.length > 0){
        result.textContent = day - input.value
    }
}

function monthValidation (input, errorMessage, label, result){
    if(input.value < 0 || input.value > 12){
        errorMessage.textContent = 'Must be a valid month'
        errorStyle (input, errorMessage, label)
    } else if(input.value.length > 0){
        result.textContent = month - input.value
    }
}

function yearValidation (input, errorMessage, label, result){
    if(input.value > year){
        errorMessage.textContent = 'Must be in the past'
        errorStyle (input, errorMessage, label)
        console.log(1, result)
    } else if(input.value.length > 0){
        result.textContent = year - input.value
        console.log(2, result)
    }
}


function errorStyle (input, errorMessage, label){
    label.style.color = 'hsl(0, 100%, 67%)'
    input.style.border = '1px solid hsl(0, 100%, 67%)'
    setTimeout(() => {
        errorMessage.textContent =''
        label.style.color = 'hsl(0, 1%, 44%)'
        input.style.border = '1px solid hsl(0, 0%, 86%)'
    }, 3000);
}

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    inputArr.forEach((block) => {
        const input = block.querySelector('input')
        const label = block.querySelector('label')
        const message = block.querySelector('.error-massage')

        validationInput (input, label, message);
        if(block.classList.contains('day-wrap')){
            const dayRes = document.getElementById('day-res')
            dayValidation(input, message, label, dayRes);
        }
        if(block.classList.contains('month-wrap')){
            const monthRes = document.getElementById('month-res')
            monthValidation(input, message, label, monthRes);
        }
        if(block.classList.contains('year-wrap')){
            const yearRes = document.getElementById('year-res')
            yearValidation(input, message, label, yearRes);
        }
    })
})

