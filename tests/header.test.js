const Page = require("./factories/helpers/Page");

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("The Header has the correct text", async () => {
  const text = await page.getContent("a.brand-logo");

  expect(text).toEqual("Blogster");
});

/***
 *  NOTE: This test needs to be connected to the internet to be able to test the correct
 *         URL not the error connection URL
 **/
test("Clicking login", async () => {
  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("logging in, and showing logout button", async () => {
  await page.login();
  const text = await page.getContent('a[href="/auth/logout"]');

  expect(text).toEqual("Logout");
});
