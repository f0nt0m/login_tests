const puppeteer = require('puppeteer');

describe('Тесты формы логина', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:5500');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Страница содержит форму авторизации', async () => {
        // Проверяем, что на странице есть элемент формы с id "loginForm"
        const form = await page.$('#loginForm');
        expect(form).not.toBeNull();
    });

    test('Успешная авторизация (правильные данные)', async () => {
        await page.type('#email', 'test@example.com');
        await page.type('#password', 'password123');

        const [response] = await Promise.all([
            page.waitForResponse(resp => resp.url().includes('/login') && resp.status() === 200),
            page.click('button[type="submit"]')
        ]);

        const json = await response.json();
        expect(json.success).toBe(true);
    });

    test('Неуспешная авторизация (неверные данные)', async () => {
        await page.evaluate(() => document.getElementById('loginForm').reset());
        await page.type('#email', 'wrong@example.com');
        await page.type('#password', 'wrongpassword');

        const [response] = await Promise.all([
            page.waitForResponse(resp => resp.url().includes('/login') && resp.status() === 200),
            page.click('button[type="submit"]')
        ]);

        const json = await response.json();
        expect(json.success).toBe(false);
    });
});