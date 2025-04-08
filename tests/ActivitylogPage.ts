import { Page } from '@playwright/test';

export class ActivitylogPage {
    readonly page: Page;
    private readonly url: string;
    readonly filter: string;
    readonly advanced: string;
  

    constructor(page: Page) {
        this.page = page;
        this.url = "https://app.cymulate.com/cym/activity_logs";
        this.filter = '[data-test-id="filter-bar"] #icon_';
        
    }

    async navigateActivitylog() {
        await this.page.goto(this.url);
    }

    async filterAdvanced() {
    await this.page.locator(this.filter).waitFor()
    await this.page.locator(this.filter).click();
    await this.page.locator('div').filter({ hasText: /^Type$/ }).nth(3).click();
    await this.page.getByRole('button', { name: 'Advanced Scenarios' }).click();
    await this.page.getByRole('button', { name: 'Apply Filters' }).click();
    }

}