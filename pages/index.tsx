import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import Header from './src/components/Header';

const Test = styled.div``;

const Main = styled.div`
  background: ${(props): string => props.theme.backgroundColor};
  width: 100vw;
  height: 100vh;

  ${Test} {
    color: pink;
  }
`;

const Text = styled.h1`
  color: white;
`;

export const Home = () => {
  return (
    <>
      <Main>
        <Header></Header>
        <Text>Hi</Text>
        <Test>Testttttttt</Test>
      </Main>
    </>
  )
};

export default Home;
