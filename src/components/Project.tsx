import styled from '@emotion/styled';
import SectionTitle from './SectionTitle';

const Section = styled.section`
  padding: 32px 20px;
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  height: 60vh;
  background-color: #61a4fc;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  }
`;

const Project = () => {
  return (
    <Section id="project">
      <SectionTitle title="project" />
    </Section>
  );
};

export default Project;