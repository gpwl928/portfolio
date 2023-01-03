import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import { useRouter } from 'next/router';
import { HEADER_ITEM_LIST } from '../../index';

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 0 14px;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: saturate(180%) blur(15px);
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 2.5rem;
`;

const MenuUl = styled.ul`
  display: flex;
  height: 100%;
  gap: 16px;
  margin: 0 auto;
`;

const MenuLi = styled.li<{ isActvie: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  height: 100%;
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

interface HeaderProps {
  currentSection?: string;
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const router = useRouter();

  const onScrollMove= (id: string): void => {
    router.push(
      {
        hash: id
      }
    );
  }

  return (
    <MainHeader>
      <Logo>Potofolio</Logo>
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
    </MainHeader>
  );
};

export default Header;