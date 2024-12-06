// Gestion des formulaires
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

loginBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
});

switchToSignup.addEventListener('click', () => {
    signupBtn.click();
});

switchToLogin.addEventListener('click', () => {
    loginBtn.click();
});
