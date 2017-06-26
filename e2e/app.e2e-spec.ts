import { GraphDataPage } from './app.po';

describe('graph-data App', () => {
  let page: GraphDataPage;

  beforeEach(() => {
    page = new GraphDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
