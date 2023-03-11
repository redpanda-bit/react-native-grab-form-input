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

  it('drags and drop input 1 value to input 2', async () => {
    await element(by.id('text_input_1')).multiTap(2);
    await element(by.id('text_input_1')).longPressAndDrag(
      2800,
      0.1,
      0.5,
      element(by.id('text_input_2')),
      0.1,
      0.5
    );
    await expect(element(by.id('text_input_2'))).toHaveText('hello');
  });
});
