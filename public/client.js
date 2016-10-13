const body = document.querySelector('body')

// UI Components
const signInForm = '<div id="sign-in-form" class="input-forms">' +
  '<h3>Sign In</h3><br>' +
  '<input name="login-username-field" type="text" placeholder="Username"><br>' +
  '<input name="login-password-field" type="password" placeholder="Password"><br>' +
  '<button id="login" class="hoodie-button">SIGN IN</button>' +
  '</div>'

const signUpForm = '<div class="input-forms">' +
  '<h3>Sign Up</h3><br>' +
  '<input name="register-username-field" type="text" placeholder="Username"><br>' +
  '<input name="register-password-field" type="password" placeholder="Password"><br>' +
  '<button id="register" class="hoodie-button">SIGN UP</button>' +
  '</div>'

const pwdResetForm = '<div class="input-forms">' +
  '<h3>Reset Password</h3><br>' +
  '<input name="reset-email-field" type="text" placeholder="Email"><br>' +
  '<button id="reset" class="hoodie-button">REQUEST</button>' +
  '</div>'

const updateAccount = username => (
  `<div class="profile-forms">` +
  `<h3>Account Settings</h3><br>` +
  `<input name="update-username-field" type="text" placeholder="Username" value="${username}"><br>` +
  `<input name="update-password-field" type="text" placeholder="Type New Password">` +
  `<div class="hoodie-tooltip">If you leave it blank, we won't modify the password</div><br>` +
  `<button id="update" class="hoodie-button">Update Account</button>` +
  `</div>`
)

const signOutAccount = '<div class="profile-forms">' +
  '<h3>Sign Out</h3><br>' +
  '<button id="logout" class="hoodie-button">Confirm</button>' +
  '</div>'

const deleteAccount = '<div class="profile-forms">' +
  '<h3>Destroy Account</h3><br>' +
  '<button id="destroy" class="hoodie-button">Confirm</button>' +
  '</div>'

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
        body.innerHTML = updateAccount(account.username) + signOutAccount + deleteAccount
      } else if (event.target.id === 'register') {
        body.innerHTML = signInForm + signUpForm + pwdResetForm
        alert('Succesfully registered! Please sign in to access profile settings.')
      } else if (event.target.id === 'destroy' || event.target.id === 'logout') {
        body.innerHTML = signInForm + signUpForm + pwdResetForm
      }
    })
    .catch((e) => {
      alert(e)
    })
  }
})

// Client Rendering Logic
if (account.isSignedIn()) {
  body.innerHTML = updateAccount(account.username) + signOutAccount + deleteAccount
} else {
  body.innerHTML = signInForm + signUpForm + pwdResetForm
}
