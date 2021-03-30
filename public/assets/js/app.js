// for login and signup
console.log('app.js is running on this');
// Signup *****************************************
$('#signupBtn').on('click', function (event) {
  event.preventDefault();

  // check if passwords match
  const passwordTxt = $('#inputPass1').val().trim();
  const passwordCheck = $('#inputPass2').val().trim();

  if (passwordTxt !== passwordCheck) {
    $('#CheckPasswordMatch').html('Passwords do not not match!');
    return;
  };

  const firstName = $('#inputFirst').val().trim();
  const lastName = $('#inputLast').val().trim();

  const newAccount = {
    name: firstName + ' ' + lastName,
    email: $('#inputEmail').val().trim(),
    password: $('#inputPass2').val().trim(),
    fav_beach: null
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.name.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount,
      statusCode: {
        // if user already exists in database show this message
        403: function () {
          $('#CheckPasswordMatch').html('That user already exists or the email entered is not an email address');
        }
      }
    }).then(() => {
      window.location.href = '/';
      console.log(newAccount);
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#CheckPasswordMatch').empty('').text('**Please fill out entire form**');
  }
});

// login ********************************************
$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };
  console.log(user);

  $.post('/api/login', user, (result) => {
    console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/dashboard');
    } else {
      $('#login-err-msg').text(result.error);
    }
  });
});
