const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  formControl.querySelector('small').innerText = message
}

function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(email.value.trim())) {
    showSuccess(email)
  } else {
    showError(email, 'Email is not valid')
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} this is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Get fieldname
function getFieldName(input) {
  //making the first letter Uppercase, if we remove
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//Check Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    )
  } else {
    showSuccess(input)
  }
}

// passwords match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()

  // if (username.value === '') {
  //   showError(username, 'Username is required')
  // } else {
  //   showSuccess(username)
  // }

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 15)
  isValidEmail(email)
  checkPasswordsMatch(password, password2)
})
