export const isNoErrors = errorsObj => {
  for (let key in errorsObj) {
    if (errorsObj.hasOwnProperty(key) && errorsObj[key] !== '') {
      return false
    }
  }
  return true
}

export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'Password needs to be at least 6 characters long'
  }
  return ''
}

export const checkPasswordsMatch = (password1, password2) => {
  if (password1 !== password2) {
    return 'Passwords do not match'
  }
  return ''
}

export const validateEmail = email => {
  if (!email.match(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)) {
    return 'email address is required'
  }

  return ''
}

export const validateUsername = username => {
  if (username.length < 6) {
    return 'username needs to be at least 6 characters long'
  }

  return ''
}