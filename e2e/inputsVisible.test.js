describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  beforeAll(async () => {
    await device.launchApp();
  });
  beforeAll(async () => {});

  beforeEach(async () => {});

  it('should tap on a button', async () => {
    await element(by.id('ButtonID')).tap();
    await expect(element(by.text('The button has been pressed'))).toBeVisible();
  });
});
