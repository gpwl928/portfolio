import styled from '@emotion/styled';
import SectionTitle from './SectionTitle';

const Section = styled.section`
  padding: 32px 20px;
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  height: 60vh;
  background-color: #ffd1a2;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  }
`;

const Study = () => {
  return (
    <Section id="study">
      <SectionTitle title="study" />
    </Section>
  );
};

export default Study;