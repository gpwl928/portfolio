import styled from '@emotion/styled';

const Section = styled.section`
  padding: 32px 20px;
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  background-color: #61a4fc;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  }
`;

const Projects = () => {
  return (
    <Section>
      projects 페이지
    </Section>
  );
};

export default Projects;