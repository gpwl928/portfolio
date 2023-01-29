import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter} from 'next/router';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import Header from 'src/components/Header';
// import Visual from 'src/components/Visual';
import About from 'src/components/About';
import Career from 'src/components/Career';
import Project from 'src/components/Project';
import Study from 'src/components/Study';
import Footer from 'src/components/Footer';
const Visual = dynamic(
  () => import('src/components/Visual'),
  {
    ssr: false,
  }
);


const Main = styled.div`
  padding-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  background: ${(props): string => props.theme.backgroundColor};
  width: 100%;
  height: 100%;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    padding-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
  }
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
  const [isSticky, setIsSticky] = useState(false);

  const router = useRouter;

  useEffect(() => {
    const setLayout = ():void => {
      console.log('😊😊😊😊👀👀setLayout');
      // window.location.hash = '';
      // scrollTo({top: 0});
      // setActiveId('');
    }

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
      setIsSticky(currentId ? true : false);
    }

    listener();

    //TODO: 새로고침시 hash문제 해결하기
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return (): void => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  });

  return (
    <>
      <Header currentSection={activeId} isSticky={isSticky} />
      <Main>
        <Visual />
        <About />
        <Career />
        <Project />
        <Study />
      </Main>
      <Footer />
    </>
  )
};

export default Home;
