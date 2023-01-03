import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import Header from './src/components/Header';
import About from './src/components/About';
import Career from './src/components/Career';
import Project from './src/components/Project';
import Study from './src/components/Study';

const Main = styled.div`
  margin-top: 60px;
  background: ${(props): string => props.theme.backgroundColor};
  width: 100%;
  height: 100%;
`;

export const HEADER_ITEM_LIST = [
  {key: 'about'},
  {key: 'career'},
  {key: 'project'},
  {key: 'study'},
];

const clamp = (value: number): number => Math.max(0, value);

// 스크롤이 해당 포지션에 포함되있는지 여부
const isBetween = (value: number, floor: number, ceil: number): boolean =>
  value >= floor && value <= ceil;

export const Home = () => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = ():void => {
      const scroll = window.pageYOffset;
      const position = HEADER_ITEM_LIST.map((item) => {
        const element = document.getElementById(item.key);

        if (!element) return { id: item.key, top: -1, bottom: -1 };
        const rect = element.getBoundingClientRect();
        const top = clamp(rect.top + scroll - rect.height / 4);
        const bottom = clamp(rect.bottom + scroll - rect.height / 4);
        return { id: item.key, top, bottom };
      }).find(({ top, bottom }) => isBetween(scroll, top, bottom));

      const currentId = position?.id || '';
      setActiveId(currentId);
    }

    listener();

    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return (): void => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  });

  return (
    <>
      <Header currentSection={activeId} />
      <Main>
        <About />
        <Career />
        <Project />
        <Study />
      </Main>
    </>
  )
};

export default Home;
