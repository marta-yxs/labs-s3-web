function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}

function isValidPassword(password) {
    if (typeof password !== 'string') return false;
    if (password.length < 8) return false;
    return /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

function isValidAge(age) {
    if (typeof age !== 'number') return false;
    if (!Number.isInteger(age)) return false;
    return age >= 14 && age <= 120;
}

function validateUser(user) {
    const errors = [];
    
    if (!isValidEmail(user.email)) {
        errors.push('Некорректный email');
    }
    if (!isValidPassword(user.password)) {
        errors.push('Некорректный пароль');
    }
    if (!isValidAge(user.age)) {
        errors.push('Некорректный возраст');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

module.exports = { isValidEmail, isValidPassword, isValidAge, validateUser };