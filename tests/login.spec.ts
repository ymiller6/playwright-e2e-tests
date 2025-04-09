import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.ts';
import { ActivitylogPage } from './ActivitylogPage.ts'
import { DashboardPage } from './DashboardPage.ts'
const userData = require('./userData.js');

test('GID-100: Cymulate login and extract top 3 Attack IDs', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const activitylogPage = new ActivitylogPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
    await loginPage.login(userData.validUser.username, userData.validUser.password);
    await dashboardPage.verifySidebarApearence();
    await activitylogPage.navigateActivitylog();
    await activitylogPage.filterAdvanced();

    
    // Wait for the response matching activity-log URL
    const response = await page.waitForResponse(response =>
        response.url().includes('/api/activity-log?') && response.status() === 200
    );
    await page.waitForTimeout(1000);
    const jsonData = await response.json();

    const attackIds: string[] = [];

    if (jsonData && jsonData.data && Array.isArray(jsonData.data.items)) {
        for (const item of jsonData.data.items) {
            if (item.attackID) {
                attackIds.push(item.attackID);
                if (attackIds.length === 3) break;
            }
        }
    }

    if (attackIds.length > 0) {
        console.log('Top 3 attackID values:');
        attackIds.forEach((id, index) => {
            console.log(`${index + 1}. ${id}`);
        });
    } else {
        console.log('No attackID values found in the response.');
    }

});



