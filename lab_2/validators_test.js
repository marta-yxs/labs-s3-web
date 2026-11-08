const { isValidEmail, isValidPassword, isValidAge, validateUser } = require('./validators');

describe('isValidEmail', () => {
    test('корректный email', () => {
        expect(isValidEmail('student@example.com')).toBeTruthy();
    });
    test('без символа @', () => {
        expect(isValidEmail('student.example.com')).toBeFalsy();
    });
    test('без точки в домене', () => {
        expect(isValidEmail('student@example')).toBeFalsy();
    });
    test('пустая строка', () => {
        expect(isValidEmail('')).toBeFalsy();
    });
    test('некорректный тип (число)', () => {
        expect(isValidEmail(12345)).toBeFalsy();
    });
    test('некорректный тип (null)', () => {
        expect(isValidEmail(null)).toBeFalsy();
    });
});

describe('isValidPassword', () => {
    test('корректный пароль', () => {
        expect(isValidPassword('abc12345')).toBeTruthy();
    });
    test('граничное значение 7 символов (false)', () => {
        expect(isValidPassword('abc1234')).toBe(false);
    });
    test('граничное значение 8 символов (true)', () => {
        expect(isValidPassword('abcd1234')).toBe(true);
    });
    test('только буквы', () => {
        expect(isValidPassword('abcdefgh')).toBeFalsy();
    });
    test('только цифры', () => {
        expect(isValidPassword('12345678')).toBeFalsy();
    });
    test('некорректный тип (число)', () => {
        expect(isValidPassword(12345678)).toBeFalsy();
    });
});

describe('isValidAge', () => {
    test('корректный возраст', () => {
        expect(isValidAge(18)).toBeTruthy();
    });
    test('ниже границы: 13 (false)', () => {
        expect(isValidAge(13)).toBe(false);
    });
    test('граничное значение 120 (true)', () => {
        expect(isValidAge(120)).toBe(true);
    });
    test('выше границы 121 (false)', () => {
        expect(isValidAge(121)).toBe(false);
    });
    test('дробное число', () => {
        expect(isValidAge(18.5)).toBeFalsy();
    });
    test('некорректный тип - строка', () => {
        expect(isValidAge('18')).toBeFalsy();
    });
});

describe('validateUser', () => {
    test('возвращает isValid: true для корректного пользователя', () => {
        const result = validateUser({
            email: 'student@example.com',
            password: 'abc12345',
            age: 18
        });
        expect(result).toEqual({
            isValid: true,
            errors: []
        });
    });

    test('возвращает ошибки для некорректного пользователя', () => {
        const result = validateUser({
            email: 'student',
            password: '123',
            age: 10
        });
        expect(result).toEqual({
            isValid: false,
            errors: [
                'Некорректный email',
                'Некорректный пароль',
                'Некорректный возраст'
            ]
        });
    });
});