import React, { useContext } from 'react';
import { arrayOf, shape, bool } from 'prop-types';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import RelatedContentPromo from '../CpsRelatedContent/RelatedContentPromo';
import RelatedContentPromoList from '../CpsRelatedContent/RelatedContentPromoList';

const MostWatched = ({ data, isMostWatchedPage }) => {
  const { mostWatched } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const { header } = mostWatched;

  if (isAmp || !data || !data.length) {
    return null;
  }

  const parentColumns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 8,
  };

  return (
    <CpsOnwardJourney
      parentColumns={isMostWatchedPage && parentColumns}
      labelId="most-watched-heading"
      data-e2e="most-watched"
      title={isMostWatchedPage ? '' : header}
      isMapContent
      content={data}
      promoComponent={RelatedContentPromo}
      promoListComponent={RelatedContentPromoList}
      columnType="secondary"
    />
  );
};

MostWatched.propTypes = {
  data: arrayOf(shape(storyItem)),
  isMostWatchedPage: bool,
};

MostWatched.defaultProps = {
  data: null,
  isMostWatchedPage: false,
};

export default MostWatched;
