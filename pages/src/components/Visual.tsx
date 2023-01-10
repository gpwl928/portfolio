import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import Stroke from 'public/images/stroke.svg'

const Section = styled.section<{ scrollHeight: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 32px 20px;
  scroll-margin-top: ${(props): number => props.theme.HEADER_HEIGHT}px;
  ${(props): boolean | SerializedStyles | undefined => 
    props.scrollHeight > 0 && css `
      height: ${props.scrollHeight}px;
    `
  }
  background: black;
  text-align: center;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
    /* height: calc(100vh - ${(props): number => props.theme.HEADER_HEIGHT}px); */
  }
`;

const StickyMsgA = styled.p<{ opacityValue: number, translateYValue: number}>`
  ${(props): number | SerializedStyles | undefined => 
    props.opacityValue && css `
      opacity: ${props.opacityValue};
      border: 1px solid red;
    `
  }
  ${(props): number | SerializedStyles | undefined => 
    props.translateYValue && css `
      transform: translate3d(0, ${props.translateYValue}%, 0);
    `
  }
`;

const StickyElem = styled.div`
  /* display: none; */
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  svg {
    min-width: 850px;
    stroke: #FF0044;
    stroke-width: 62;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1401, 1401;
    stroke-dashoffset: 1401;
  }

  ${StickyMsgA} {
    color: white;
    font-size: 10vw;
    font-family: ${(props): string => props.theme.defaultFontFamily};
    font-weight: 600;
    text-transform: uppercase;
    /* opacity: 0; */
  }
`;

const SceneInfo = {
  type: 'sticky',
  heightNum: 5,
  scrollHeight: window.innerHeight * 5,
  objs: {
    container: document.querySelector('#visual'),
    messageA: {
      opacity: 0,
      translateY: 0
    }
  },
  values: {
    messageA_opacity_in: [1, 0, {start: 0, end: 0.1}],
    messageA_translateY_in: [20, 0, {start: 0, end: 0.1}],
    messageA_opacity_out: [1, 0, {start: 0.15, end: 0.2}],
    messageA_translateY_out: [0, -20, {start: 0.15, end: 0.2}],
  }
}

const Visual = () => {
  useEffect(() => {
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true

    const setLayout = () => {
      SceneInfo.scrollHeight = window.innerHeight * SceneInfo.heightNum;
    };

    const scrollLoop = () => {
      playAnimation();
      console.log('opacity😥😥', SceneInfo.objs.messageA.opacity);
    };

    const calcValues = (values: any, currentYOffset: number) => {
      let returnValue;
      const scrollHeight = SceneInfo.scrollHeight;
      const scrollRatio = currentYOffset / scrollHeight;

      if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
  
        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
          returnValue = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollStart) {
          returnValue = values[0];
        } else if (currentYOffset > partScrollEnd) {
          returnValue = values[1];
        }
      } else {
        returnValue = scrollRatio * (values[1] - values[0]) + values[0];
      }
  
      return returnValue;
    };

    const playAnimation = () => {
      const objs = SceneInfo.objs;
      const values = SceneInfo.values;
      const scrollHeight = SceneInfo.scrollHeight;
      const yOffset = window.pageYOffset;
      const scrollRatio = yOffset / scrollHeight;

      if (scrollRatio <= 0.2) {
        // in
        objs.messageA.opacity = calcValues(values.messageA_opacity_in, yOffset);
        objs.messageA.translateY = calcValues(values.messageA_translateY_in, yOffset);
      } else {
        // out
        objs.messageA.opacity = calcValues(values.messageA_opacity_out, yOffset);
        objs.messageA.translateY = calcValues(values.messageA_translateY_out, yOffset);
      }

      // console.log(yOffset, scrollRatio, objs.messageA.opacity);
    }

    setLayout();

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', scrollLoop);

    return (): void => {
      window.removeEventListener('resize', setLayout);
      window.removeEventListener('scroll', scrollLoop);
    };
  })

  return (
    <Section id="visual" scrollHeight={SceneInfo.scrollHeight}>
      <StickyElem>
        <StickyMsgA 
          opacityValue={SceneInfo.objs.messageA.opacity}
          translateYValue={SceneInfo.objs.messageA.translateY}
        >
          Are you
        </StickyMsgA>
      </StickyElem>
      {/* <StickyElem>
        <StickyText className='message_b'>curious</StickyText>
      </StickyElem>
      <StickyElem>
        <StickyText className='message_c'>about</StickyText>
      </StickyElem>
      <StickyElem>
        <StickyText className='message_d'>who I am</StickyText>
      </StickyElem>
      <StickyElem>
        <Stroke width="100vw" height="100vh" fill="none" />
      </StickyElem>
      <StickyElem>
        <StickyText className='message_e'>Show Me</StickyText>
      </StickyElem> */}
    </Section>
  );
};

export default Visual;