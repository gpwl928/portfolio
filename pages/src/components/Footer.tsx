import styled from '@emotion/styled';
import GitSvg from 'public/images/github-mark-white.svg';

const MainFooter = styled.footer`
  background: black;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 1460px;
  color: #c6c6c6;
  text-align: center;
`;

const Rights = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-family: ${(props): string => props.theme.defaultFontFamily};
  color: #ececec;
  word-break: break-word;
  white-space: pre-line;
`;

const Icons = styled.div`
  border: 1px solid red;

  svg {
    fill: red;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  &:hover {
    fill: pink;
  }
`;

const Footer = () => {
  return (
    <MainFooter>
      <Content>
        <Icons>
          <Icon>
            <GitSvg fill="pink" />
          </Icon>
        </Icons>
        <Rights>© 2023 — Website created using Next.js / All rights reserved</Rights>
      </Content>
    </MainFooter>
  );
};

export default Footer;