describe('GrabFormInputExample', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have two inputs visible', async () => {
    await expect(element(by.id('text_input_1'))).toBeVisible();
    await expect(element(by.id('text_input_2'))).toBeVisible();
  });
});
