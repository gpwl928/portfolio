import styled from '@emotion/styled';
import GitIcon from 'public/images/github.svg';
import NotionIcon from 'public/images/notion.svg';
import MailIcon from 'public/images/mail.svg';

const MainFooter = styled.footer`
  background: black;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 24px;
  max-width: 1460px;
  color: #c6c6c6;
  text-align: center;
`;

const Rights = styled.div`
  margin-top: 18px;
  font-size: 14px;
  font-family: ${(props): string => props.theme.defaultFontFamily};
  color: #ececec;
  word-break: break-word;
  white-space: pre-line;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;

  svg {
    cursor: pointer;
    &:hover {
      fill: ${(props): string => props.theme.mainColor};
    }
  }
`;

const LINKS = [
  { "key": "github", "url": "https://github.com/gpwl928/portfolio" },
  { "key": "notion", "url": "https://heyyyyggi.notion.site/Hi-I-m-HyeJi-8ed2f64994224788a4267f084b581ce7" },
  { "key": "mail", "url": "gpwl928@gmail.com" },
];

const Footer = () => {
  const onClickIcon = (icon: 'github' | 'notion' | 'mail') => {
    let link = LINKS.find(item => item['key'] === icon);

    if (icon === 'mail' && link) {
      window.navigator.clipboard.writeText(link.url).then(() => {
        alert("이메일 주소 복사 완료!")
      });
    } else {
      window.open(link?.url,' _blank');
    }
  };

  return (
    <MainFooter>
      <Content>
        <Icons>
          <GitIcon width="40" height="40" fill="white" onClick={():void => {onClickIcon('github')}}/>
          <NotionIcon width="40" height="40" fill="white" onClick={():void => {onClickIcon('notion')}}/>
          <MailIcon width="40" height="40" fill="white" onClick={():void => {onClickIcon('mail')}}/>
        </Icons>
        <Rights>© 2023 — Website created using Next.js / All rights reserved</Rights>
      </Content>
    </MainFooter>
  );
};

export default Footer;