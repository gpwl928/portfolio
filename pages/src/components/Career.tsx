import styled from '@emotion/styled';

const Section = styled.section`
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  height: 60vh;
  background-color: pink;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  }
`;

const Career = () => {
  return (
    <Section id="career">
      Career
    </Section>
  );
};

export default Career;