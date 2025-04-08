import { Page } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly sidebar: string;
    
  

    constructor(page: Page) {
        this.page = page;
        this.sidebar = '#main-sidebar';
        
        
    }

    async verifySidebarApearence() {
        await this.page.waitForSelector(this.sidebar);
    }

}