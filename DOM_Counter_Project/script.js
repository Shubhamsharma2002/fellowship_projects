// Selecting DOM Elements
const counterDisplay = document.getElementById('counter-display');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const clearBtn = document.getElementById('clear-btn');
const errorMessage = document.getElementById('error-message');

// Internal state tracker
let count = 0;

// Update UI logic wrapper
function updateUI(showError = false) {
    // 1. Update the display text
    counterDisplay.textContent = count;

    // 2. Clear Button Visibility Logic
    if (count > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }

    // 3. Error Message Logic
    if (showError) {
        errorMessage.style.visibility = 'visible';
    } else {
        errorMessage.style.visibility = 'hidden';
    }
}

// Event Listeners
incrementBtn.addEventListener('click', () => {
    count++;
    updateUI(false); // Incrementing clears active errors natively
});

decrementBtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateUI(false);
    } else {
        // Trigger red error message if trying to drop below zero
        updateUI(true);
    }
});

clearBtn.addEventListener('click', () => {
    count = 0;
    updateUI(false);
});