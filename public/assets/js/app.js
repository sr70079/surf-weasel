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
      // $('#user-info').modal('hide');
    }
  });
});

// $('#update-user').on('click', function (event) {
//   event.preventDefault();

//   const id = $(this).data('id');

//   // capture All changes
//   const changeUser = {
//     firstName: $('#inputFirst').val().trim(),
//     lastName: $('#inputLast').val().trim(),
//     email: $('#inputEmail').val().trim(),
//     password: $('#inputPassword').val().trim()
//   };
//   $('#err-msg').empty('');
//   // $('#change-user-modal').modal('show');
//   console.log(changeUser);

//   if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
//     $.ajax({
//       type: 'PUT',
//       url: `/api/user/${id}`,
//       data: changeUser
//     }).then((result) => {
//       console.log('Updated user:', result);
//       // Reload the page to get the updated list
//       window.location.href = '/logout';
//     });
//   } else {
//     console.log('**Please fill out entire form**');
//     $('#update-err-msg').empty('').text('**Please fill out entire form**');
//   }
// });

// DELETE   ***************************************************
// $('#delete-user').on('click', function (event) {
//   event.preventDefault();
//   $('#err-msg').empty('');
//   $('#delete-user-modal').modal('show');
// });

// $('#confirm-delete').on('click', function (event) {
//   event.preventDefault();

//   const id = $(this).data('id');

//   const deleteUser = {
//     email: $('#userEmail').val().trim(),
//     password: $('#userPassword').val().trim()
//   };

//   if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
//     $.ajax({
//       type: 'POST',
//       url: '/api/user/confirm',
//       data: deleteUser
//     }).then((result) => {
//       if (result) {
//         $.ajax(`/api/user/${id}`, {
//           type: 'DELETE'
//         }).then(() => {
//           console.log('Deleted user', deleteUser);
//           // Reload the page to get the updated list
//           window.location.href = '/logout';
//         });
//       } else {
//         $('#err-msg').empty('').text('Wrong credentials!');
//       }
//     });
//   } else {
//     console.log('fill out entire form');
//     $('#err-msg').empty('').text('fill out entire form');
//   }
// });

// $('#register').on('click', function (event) {
//   event.preventDefault();
//   window.location.href = '/register';
// });

// $('#login-modal').on('click', function (event) {
//   event.preventDefault();
//   $('#user-info').modal('show');
// });

// $('#go-home').on('click', function (event) {
//   event.preventDefault();
//   window.location.href = '/';
// });
