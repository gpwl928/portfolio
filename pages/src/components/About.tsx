import styled from '@emotion/styled';

const Section = styled.section`
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  height: 60vh;
  background-color: goldenrod;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  }
`;

const About = () => {
  return (
    <Section id="about">
      About
    </Section>
  );
};

export default About;