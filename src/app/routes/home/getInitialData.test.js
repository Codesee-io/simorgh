import getInitialData from './getInitialData';
import frontPageJson from '../../../../data/pidgin/frontpage/index.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  status: 200,
  pageData: frontPageJson,
}));

it('should fetch page data, process the data and return it', async () => {
  const { pageData } = await getInitialData('mock-frontpage-path');
  const isProcessedPageData = pageData !== frontPageJson;

  expect(isProcessedPageData).toBeTruthy();
});

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData('mock-frontpage-path');

  expect(pageData.metadata.language).toEqual('pcm');
  expect(pageData.metadata.summary).toEqual(
    'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
  );
  expect(pageData.promo.name).toEqual('Domot');
  expect(pageData.content.groups.length).toBeTruthy();
});
