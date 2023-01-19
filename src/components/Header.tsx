import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import { useRouter } from 'next/router';
import { HEADER_ITEM_LIST } from 'pages/index';

const HamburgerBtnStyle = css`
  width: 25px;
  height: 2px;
  background: gray;
  transition: all 0.5s ease;
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 0 14px;
  width: 100%;
  height: ${(props): number => props.theme.HEADER_HEIGHT}px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: saturate(180%) blur(15px);
  z-index: 100;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    padding: 0;
    height: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
    background: #fff;
  }
`;

// const Logo = styled.div`
//   font-weight: 800;
//   font-size: 2.5rem;
// `;

const MenuUl = styled.ul`
  display: flex;
  height: 100%;
  gap: 16px;
  margin: 0 auto;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    display: none;
  }
`;

const MenuLi = styled.li<{ isActvie: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 12px;
  height: 100%;
  color: ${(props): string => props.theme.mainTextColor};
  font-size: 18px;
  /* font-weight: 600; */
  text-transform: uppercase;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: red;
    }
  }
  ${(props): boolean | undefined => 
    props.isActive && css `
      color: red;
    `
  }
`;

const MobileButtonBox = styled.button`
  visibility: hidden;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    visibility: visible;
    margin-left: auto;
    width: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
    height: 100%;
  }
`;

const MobileButton = styled.div<{ isMobile: boolean }>`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  ${HamburgerBtnStyle}
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    ${HamburgerBtnStyle}
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    ${HamburgerBtnStyle}
  }  
  ${(props): boolean | SerializedStyles | undefined => 
    props.isMobile && css `
      background: rgba(0, 0, 0, 0);
      &::before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    `
  }
`;

const MobileMenu = styled.div`
  overflow: auto;
  position: fixed;
  top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  width: 100vw;
  height: calc(100vh - ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px);
  padding: 12px 20px 60px;
  background: #fff;
  @media (min-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX + 1}px) {
    display: none;
  }
`;

const MobileMenuUl = styled.ul`
  padding: 20px;
  max-width: 300px;
`;

interface HeaderProps {
  currentSection?: string;
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const router = useRouter();

  const [isMobileVisible, setIsMobileVisible] = useState(false);

  const onScrollMove= (id: string): void => {
    router.push(
      {
        hash: id
      }
    );
  }

  return (
    <MainHeader>
      {/* <Logo>Potofolio</Logo> */}
      <MenuUl>
        {HEADER_ITEM_LIST && HEADER_ITEM_LIST.map((item) => {
          return (
            <MenuLi 
              key={item.key}
              isActive={ currentSection === item.key }
              onClick={():void => onScrollMove(item.key)}
            >
              {item.key}
            </MenuLi>
          )
        })}
      </MenuUl>
      <MobileButtonBox onClick={():void => setIsMobileVisible(!isMobileVisible)}>
        <MobileButton isMobile={isMobileVisible}>
          {/* <MobileButtonLine isMobile={isMobileVisible} /> */}
        </MobileButton>
      </MobileButtonBox>
      {isMobileVisible && (
        <MobileMenu>
          <MobileMenuUl>
            {HEADER_ITEM_LIST && HEADER_ITEM_LIST.map((item) => {
              return (
                <MenuLi 
                  key={item.key}
                  isActive={ currentSection === item.key }
                  onClick={():void => onScrollMove(item.key)}
                >
                  {item.key}
                </MenuLi>
              )
            })}
          </MobileMenuUl>
        </MobileMenu>
      )}
    </MainHeader>
  );
};

export default Header;