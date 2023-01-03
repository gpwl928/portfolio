import styled from '@emotion/styled';

const MainFooter = styled.footer`
  background: black;
`;

const Content = styled.div`
  padding: 20px;
  color: #fff;
`;

const Footer = () => {
  return (
    <MainFooter>
      <Content>
        Email: gpwl928@gmail.com
        GitHub: https://github.com/gpwl928
        Notion: https://www.notion.so/8ed2f64994224788a4267f084b581ce7
      </Content>
    </MainFooter>
  );
};

export default Footer;