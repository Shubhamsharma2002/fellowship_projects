// Check Protected Route
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || !currentUser.token) {
    window.location.href = 'login.html';
  }
}

// Token Generator (16 bytes random string)
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// Signup Handling
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      alert("Email already registered. Try logging in.");
      return;
    }

    users.push({ fname, lname, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup Successful!");
    window.location.href = 'login.html';
  });
}

// Login Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    const currentUser = { ...user, token: generateToken() };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = 'shop.html';
  });
}