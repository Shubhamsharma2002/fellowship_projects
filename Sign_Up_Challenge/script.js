// Dom Element Declarations
const authForm = document.getElementById('authForm');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');

const emailFeedback = document.getElementById('emailFeedback');
const passwordFeedback = document.getElementById('passwordFeedback');
const globalSuccess = document.getElementById('globalSuccess');

// Bind inputs dynamically for live validation updates
userEmail.addEventListener('input', runValidationPipeline);
userPassword.addEventListener('input', runValidationPipeline);
authForm.addEventListener('submit', performFormSubmit);

/**
 * Validates inputs against project criteria rules
 * @returns {boolean} True if completely valid
 */
function runValidationPipeline() {
    const emailVal = userEmail.value.trim();
    const passVal = userPassword.value;

    // Rules Evaluation Framework
    const emailLengthPass = emailVal.length > 3;
    const emailSymbolsPass = emailVal.includes('@') && emailVal.includes('.');
    const isEmailValid = emailLengthPass && emailSymbolsPass;

    const isPasswordValid = passVal.length > 8;

    // UI Feedback Mapping - Email Component
    if (isEmailValid || emailVal === '') {
        emailFeedback.classList.add('hide');
    } else {
        emailFeedback.classList.remove('hide');
    }

    // UI Feedback Mapping - Password Component
    if (isPasswordValid || passVal === '') {
        passwordFeedback.classList.add('hide');
    } else {
        passwordFeedback.classList.remove('hide');
    }

    // Global Evaluation State Mapping
    if (isEmailValid && isPasswordValid) {
        emailFeedback.classList.add('hide');
        passwordFeedback.classList.add('hide');
        globalSuccess.classList.remove('hide');
        return true;
    } else {
        globalSuccess.classList.add('hide');
        return false;
    }
}

/**
 * Handles target form submission sequence logic
 */
function performFormSubmit(event) {
    event.preventDefault(); // Stop native page rerouting routines

    // Block logic routine processing if criteria flags are unpassed
    if (!runValidationPipeline()) {
        alert('Please complete fields successfully according to rules.');
        return;
    }

    // Modal Confirmation Screen Frame Window
    const selection = confirm('Confirm form details submission?');

    if (selection) {
        alert('Successful signup!');
    } else {
        // Clear variables/values state and flush form input panels completely
        authForm.reset();
        runValidationPipeline();
    }
}