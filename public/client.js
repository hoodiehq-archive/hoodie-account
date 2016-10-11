const body = document.getElementsByTagName('body')

let account = hoodie.account

// UI Components
const signInForm = '<div id="sign-in-form" class="input-forms">'
  + '<h3>Sign In</h3><br>'
  + '<input name="login-username-field" type="text" placeholder="Username"><br>'
  + '<input name="login-password-field" type="password" placeholder="Password"><br>'
  + '<button id="login" class="hoodie-button">SIGN IN</button>'
  + '</div>'

const signUpForm = '<div class="input-forms">'
  + '<h3>Sign Up</h3><br>'
  + '<input name="register-username-field" type="text" placeholder="Username"><br>'
  + '<input name="register-password-field" type="password" placeholder="Password"><br>'
  + '<button id="register" class="hoodie-button">SIGN UP</button>'
  + '</div>'

const pwdResetForm = '<div class="input-forms">'
  + '<h3>Reset Password</h3><br>'
  + '<input name="reset-email-field" type="text" placeholder="Email"><br>'
  + '<button id="reset" class="hoodie-button">REQUEST</button>'
  + '</div>'

const updateAccount = username => (
  `<div class="profile-forms">`
  + `<h3>Account Settings</h3><br>`
  + `<input name="update-username-field" type="text" placeholder="Username" value="${username}"><br>`
  + `<input name="update-password-field" type="text" placeholder="Type New Password">`
  + `<div class="hoodie-tooltip">If you leave it blank, we won't modify the password</div><br>`
  + `<button id="update" class="hoodie-button">Update Account</button>`
  + `</div>`
)

const deleteAccount = '<div class="profile-forms">'
  + '<h3>Destroy Account</h3><br>'
  + '<button id="destroy" class="hoodie-button">Confirm</button>'
  + '</div>'

// Client rendering logic
if (account.isSignedIn()) {
  body[0].innerHTML = updateAccount(account.username) + deleteAccount
} else {
  body[0].innerHTML = signInForm + signUpForm + pwdResetForm
}
