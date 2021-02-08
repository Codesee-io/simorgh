/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { bool, string, arrayOf, element, oneOf, shape } from 'prop-types';
import styled from '@emotion/styled';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  C_CONSENT_BACKGROUND,
  C_CONSENT_ACTION,
  C_PEBBLE,
  C_WHITE,
  C_CONSENT_CONTENT,
  C_EBON,
} from '@bbc/psammead-styles/colours';
import {
  getDoublePica,
  getLongPrimer,
  getBodyCopy,
} from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '@bbc/gel-foundations/spacings';

const HEADING_STYLES = `
  color: ${C_WHITE};
  margin-top: 0;
  margin-bottom: 0;
`;

const CONTAINER_STYLES = `
  padding-left: ${GEL_MARGIN_BELOW_400PX};
  padding-right: ${GEL_MARGIN_BELOW_400PX};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-left: ${GEL_MARGIN_ABOVE_400PX};
    padding-right: ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_CONSENT_BACKGROUND};
  max-height: 100vh;
`;

const BannerPage = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-height: 100vh;
  max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};

  a {
    color: ${C_CONSENT_ACTION};
    text-decoration: underline;
    text-decoration-color: ${C_PEBBLE};
  }
`;

const Title = styled.h2`
  ${({ script }) => getDoublePica(script)}
  ${HEADING_STYLES}
  ${CONTAINER_STYLES}
  background-color: ${C_EBON};
  padding-top: ${GEL_SPACING_DBL};
  padding-bottom: ${GEL_SPACING_DBL};
`;

const ScrollBox = styled.div`
  ${CONTAINER_STYLES}
  overflow-y: auto;
`;

const Heading = styled.h3`
  ${HEADING_STYLES}
`;

const Text = styled.p`
  ${({ script }) => script && getBodyCopy(script)}
  color: ${C_CONSENT_CONTENT};
`;

const OptionsList = styled.ul`
  ${({ script }) => getLongPrimer(script)}
  ${CONTAINER_STYLES}
  align-items: center;
  background-color: ${C_EBON};
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0 -${GEL_SPACING};
  padding-top: ${GEL_SPACING_DBL};
  padding-bottom: ${GEL_SPACING_DBL};
  padding-left: 0;
`;

const OptionsItem = styled.li`
  margin-right: ${GEL_SPACING};
  margin-left: ${GEL_SPACING};

  button {
    ${({ script }) => getLongPrimer(script)}
    cursor: pointer;
  }
`;

const AmpCookieBanner = ({
  dir,
  id,
  pages,
  accept,
  reject,
  hidden,
  script,
  service,
}) => {
  const [initial, manage] = pages;

  return (
    <div id={id} hidden={hidden}>
      <Helmet>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
      </Helmet>
      <Wrapper dir={dir} service={service}>
        <BannerPage data-amp-bind-hidden="isManagingSettings">
          <Title script={script}>{initial.title}</Title>
          <ScrollBox>
            <Text script={script}>
              {initial.description.first}{' '}
              <a href={initial.description.linkUrl}>
                {initial.description.linkText}
              </a>{' '}
              {initial.description.last}
            </Text>
          </ScrollBox>
          <OptionsList script={script}>
            <OptionsItem script={script}>{accept}</OptionsItem>
            <OptionsItem script={script}>
              <button
                type="button"
                on="tap:AMP.setState({ isManagingSettings: true })"
              >
                {initial.manage}
              </button>
            </OptionsItem>
          </OptionsList>
        </BannerPage>
        <BannerPage hidden data-amp-bind-hidden="!isManagingSettings">
          <Title script={script}>{manage.title}</Title>
          <ScrollBox>
            <Text script={script}>{manage.description.para1}</Text>
            <Text script={script}>{manage.description.para2}</Text>
            <Heading>{manage.description.heading2}</Heading>
            <Text script={script}>{manage.description.para3}</Text>
            <Text script={script}>
              <a href={manage.description.para4.url}>
                {manage.description.para4.text}
              </a>
            </Text>
            <Text script={script}>{manage.description.para5}</Text>
            <Text script={script}>{manage.description.para6}</Text>
            <Text script={script}>
              <a href={manage.description.para7.url}>
                {manage.description.para7.text}
              </a>
            </Text>
            <Text script={script}>{manage.description.para8}</Text>
            <Text script={script}>{manage.description.para9}</Text>
          </ScrollBox>
          <OptionsList script={script}>
            <OptionsItem script={script}>{accept}</OptionsItem>
            <OptionsItem script={script}>{reject}</OptionsItem>
          </OptionsList>
        </BannerPage>
      </Wrapper>
    </div>
  );
};

AmpCookieBanner.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  pages: arrayOf(shape({})).isRequired,
  accept: element.isRequired,
  reject: element.isRequired,
  id: string,
  hidden: bool,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

AmpCookieBanner.defaultProps = {
  dir: 'ltr',
  id: null,
  hidden: null,
};

export default AmpCookieBanner;
