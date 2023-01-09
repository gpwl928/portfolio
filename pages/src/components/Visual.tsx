import styled from '@emotion/styled';

const Section = styled.section`
  position: relative;
  padding: 32px 20px;
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  height: calc(100vh - ${(props): number => props.theme.HEADER_HEIGHT}px);
  background: black;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
    height: calc(100vh - ${(props): number => props.theme.HEADER_HEIGHT}px);
  }
`;

const StickyText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  font-size: 10vw;
  font-family: ${(props): string => props.theme.defaultFontFamily};
  font-weight: 600;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
`;

const About = () => {
  return (
    <Section>
      <StickyText>Are you</StickyText>
      <StickyText>curious</StickyText>
      <StickyText>about</StickyText>
      <StickyText>who I am</StickyText>
    </Section>
  );
};

export default About;