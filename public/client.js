const body = document.getElementsByTagName('body')

let account = hoodie.account

// UI Components
const signInForm = '<div id="sign-in-form" class="input-forms">'
  + '<h3>Sign In</h3><br>'
  + '<input type="text" placeholder="Name"><br>'
  + '<input type="password" placeholder="Password"><br>'
  + '<button class="hoodie-button">SIGN IN</button>'
  + '</div>'

const signUpForm = '<div id="sign-up-form" class="input-forms">'
  + '<h3>Sign Up</h3><br>'
  + '<input type="text" placeholder="Name"><br>'
  + '<input type="password" placeholder="Password"><br>'
  + '<button class="hoodie-button">SIGN UP</button>'
  + '</div>'

const pwdResetForm = '<div id="pwd-reset-form" class="input-forms">'
  + '<h3>Reset Password</h3><br>'
  + '<input type="text" placeholder="Email"><br>'
  + '<button class="hoodie-button">REQUEST</button>'
  + '</div>'

const updateUsername = username => (
  `<div id="update-username-form" class="profile-forms">`
  + `<h3>Username</h3><br>`
  + `<input type="text" placeholder="Username" value="${username}"><br>`
  + `<button class="hoodie-button">Update Username</button>`
  + `</div>`
)

const deleteAccount = '<div id="destroy-user-form" class="profile-forms">'
  + '<h3>Destroy Account</h3><br>'
  + '<button class="hoodie-button">Confirm</button>'
  + '</div>'

// Client rendering logic
if (account.isSignedIn()) {
  body[0].innerHTML = updateUsername(account.username) + deleteAccount
} else {
  body[0].innerHTML = signInForm + signUpForm + pwdResetForm
}
