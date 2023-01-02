import styled from '@emotion/styled';

const MainHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid gray;
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 48px;
`;

const MenuUl = styled.ul``;

const MenuLi = styled.li``;

const HEADER_ITEM_LIST = [
  {key: 'about'},
  {key: 'career'},
  {key: 'project'},
  {key: 'study'},
];

const Header = () => {
  return (
    <MainHeader>
      <Logo>Potofolio</Logo>
      <MenuUl>
        {HEADER_ITEM_LIST.length !== 0 && HEADER_ITEM_LIST.map((item) => {
          return (
            <MenuLi key={item.key}>{item.key}</MenuLi>
          )
        })}
      </MenuUl>
    </MainHeader>
  );
};

export default Header;