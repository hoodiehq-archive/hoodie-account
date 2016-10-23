const body = document.querySelector('body')

const actions = {
  login: () => {
    let username = document.querySelector('input[name="login-username-field"]').value
    let password = document.querySelector('input[name="login-password-field"]').value
    return account.signIn({username, password})
  },
  register: () => {
    let username = document.querySelector('input[name="register-username-field"]').value
    let password = document.querySelector('input[name="register-password-field"]').value
    return account.signUp({username, password})
  },
  reset: () => {
    let contact = document.querySelector('input[name="reset-email-field"]').value
    return account.request({type: 'passwordreset', contact: contact})
  },
  update: () => {
    let username = document.querySelector('input[name="update-username-field"]').value
    let password = document.querySelector('input[name="update-password-field"]').value
    if (password === '') {
      return account.update({username})
    } else {
      return account.update({username, password})
    }
  },
  logout: () => {
    return account.signOut()
  },
  destroy: () => {
    return account.destroy()
  }
}

// Account instance for hoodie-account-client
let account = hoodie.account

// Event Listener for Actions
document.querySelector('body').addEventListener('click', event => {
  if (actions[event.target.id] !== undefined) {
    actions[event.target.id]()
    .then((r) => {
      if (event.target.id === 'login') {
        document.querySelectorAll('.input-forms').forEach(node => node.setAttribute('data-hide', 'true'))
        document.querySelectorAll('.profile-forms').forEach(node => node.setAttribute('data-hide', 'false'))
      } else if (event.target.id === 'register') {
        alert('Succesfully registered! Please sign in to access profile settings.')
      } else if (event.target.id === 'destroy' || event.target.id === 'logout') {
        document.querySelectorAll('.profile-forms').forEach(node => node.setAttribute('data-hide', 'true'))
        document.querySelectorAll('.input-forms').forEach(node => node.setAttribute('data-hide', 'false'))
      }
    })
    .catch((e) => {
      alert(e)
    })
  }
})

// Client Rendering Logic
if (account.isSignedIn()) {
  document.querySelector('.generic-loader-wrap').setAttribute('data-hide', 'true')
  document.querySelectorAll('.profile-forms').forEach(node => node.setAttribute('data-hide', 'false'))
} else {
  document.querySelector('.generic-loader-wrap').setAttribute('data-hide', 'true')
  document.querySelectorAll('.input-forms').forEach(node => node.setAttribute('data-hide', 'false'))
}
