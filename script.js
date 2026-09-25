// JavaScript Logic
const passwordInput = document.getElementById('passwordInput');
const toggleBtn = document.getElementById('toggleBtn');
const strengthBar = document.getElementById('strengthBar');
const feedbackText = document.getElementById('feedbackText');

// Criteria elements
const criteria = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special')
};

// Toggle password visibility
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// Evaluate password on input
passwordInput.addEventListener('input', evaluatePassword);

function evaluatePassword() {
    const password = passwordInput.value;
    let score = 0;

    // Check conditions using string manipulation and regex (conditional statements)
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    // Regex for special characters
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_+\-\[\]\\\/~`]/.test(password);

    // Update criteria checklist UI
    updateCriteria(criteria.length, hasLength);
    updateCriteria(criteria.uppercase, hasUppercase);
    updateCriteria(criteria.lowercase, hasLowercase);
    updateCriteria(criteria.number, hasNumber);
    updateCriteria(criteria.special, hasSpecial);

    // Calculate Score
    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Provide feedback based on score
    if (password.length === 0) {
        strengthBar.style.width = '0%';
        feedbackText.textContent = '';
        feedbackText.style.color = 'transparent';
        return;
    }

    if (score <= 2) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = 'var(--weak)';
        feedbackText.textContent = 'Weak';
        feedbackText.style.color = 'var(--weak)';
    } else if (score === 3 || score === 4) {
        strengthBar.style.width = '65%';
        strengthBar.style.backgroundColor = 'var(--moderate)';
        feedbackText.textContent = 'Moderate';
        feedbackText.style.color = 'var(--moderate)';
    } else if (score === 5) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--strong)';
        feedbackText.textContent = 'Strong';
        feedbackText.style.color = 'var(--strong)';
    }
}

// Helper function to update criteria UI classes
function updateCriteria(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
    } else {
        element.classList.remove('valid');
    }
}