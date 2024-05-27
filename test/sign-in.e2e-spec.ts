import { test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in')

  // playwright broken -- needs review to fix
})
