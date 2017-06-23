import { VinocullPage } from './app.po';

describe('vinocull App', () => {
  let page: VinocullPage;

  beforeEach(() => {
    page = new VinocullPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
