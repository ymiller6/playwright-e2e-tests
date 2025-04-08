import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userInput: string;
    readonly passwordInput: string;
    readonly loginButton: string;
    private readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.userInput = '#email';
        this.passwordInput = '#password';
        this.loginButton = 'button[type="submit"]';
        this.url = "https://app.cymulate.com/cym/login";
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.page.locator(this.userInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }
}