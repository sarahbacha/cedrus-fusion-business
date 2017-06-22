import { ComponentsDemoPage } from './app.po';

describe('components-demo App', () => {
  let page: ComponentsDemoPage;

  beforeEach(() => {
    page = new ComponentsDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
