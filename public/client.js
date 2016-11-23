const body = document.querySelector('body')

// Account instance for hoodie-account-client
let account = hoodie.account

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

// Event Listener for Actions
document.querySelector('body').addEventListener('click', event => {
  document.querySelectorAll('.messages').forEach(node => node.innerHTML = '')
  if (actions[event.target.id] !== undefined) {
    actions[event.target.id]()
    .then((r) => {
      if (event.target.id === 'login') {
        document.querySelectorAll('.input-forms').forEach(node => node.setAttribute('data-hide', 'true'))
        document.querySelectorAll('.profile-forms').forEach(node => node.setAttribute('data-hide', 'false'))
      } else if (event.target.id === 'register') {
        let node = document.querySelector('#register-response')
        node.style.color = 'green'
        node.innerHTML = 'Successfully Registration: Please sign in to access profile settings'
      } else if (event.target.id === 'destroy' || event.target.id === 'logout') {
        document.querySelectorAll('.profile-forms').forEach(node => node.setAttribute('data-hide', 'true'))
        document.querySelectorAll('.input-forms').forEach(node => node.setAttribute('data-hide', 'false'))
      } else if (event.target.id === 'update' ) {
        let node = document.querySelector('#update-response')
        node.style.color = 'green'
        node.innerHTML = 'Successful Updation'
      }
    })
    .catch((e) => {
      if (event.target.id === 'login') {
        let node = document.querySelector('#login-response')
        node.style.color = 'red'
        node.innerHTML = e
      } else if (event.target.id === 'register') {
        let node = document.querySelector('#register-response')
        node.style.color = 'red'
        node.innerHTML = e
      } else if (event.target.id === 'reset') {
        let node = document.querySelector('#password-reset-response')
        node.style.color = 'red'
        node.innerHTML = e
      }
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
