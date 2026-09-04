const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('prof-fname').value = currentUser.fname || '';
document.getElementById('prof-lname').value = currentUser.lname || '';

// Save Profile Info
document.getElementById('profile-info-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const updatedFname = document.getElementById('prof-fname').value.trim();
  const updatedLname = document.getElementById('prof-lname').value.trim();

  currentUser.fname = updatedFname;
  currentUser.lname = updatedLname;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  const userIdx = users.findIndex(u => u.email === currentUser.email);
  if (userIdx !== -1) {
    users[userIdx].fname = updatedFname;
    users[userIdx].lname = updatedLname;
    localStorage.setItem('users', JSON.stringify(users));
  }

  alert("Profile information updated successfully!");
});

// Change Password
document.getElementById('password-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const oldPass = document.getElementById('old-pass').value;
  const newPass = document.getElementById('new-pass').value;
  const cNewPass = document.getElementById('confirm-new-pass').value;

  if (oldPass !== currentUser.password) {
    alert("Old password does not match!");
    return;
  }
  if (newPass !== cNewPass) {
    alert("New passwords do not match!");
    return;
  }

  currentUser.password = newPass;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  const userIdx = users.findIndex(u => u.email === currentUser.email);
  if (userIdx !== -1) {
    users[userIdx].password = newPass;
    localStorage.setItem('users', JSON.stringify(users));
  }

  alert("Password changed successfully!");
  document.getElementById('password-form').reset();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});