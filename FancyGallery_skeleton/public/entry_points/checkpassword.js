document.getElementById("password").addEventListener('keyup', e => {
        checkPassword();
      });

document.getElementById("confirm_password").addEventListener('keyup', e => {
        checkPassword();
      });

var checkPassword = function() {
  if (document.getElementById('password').value == document.getElementById('confirm_password').value) {
    console.log('password ok!');
    document.getElementById('message').innerHTML = '';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = '<b>NOT MATCHING</b>';
  }
}
