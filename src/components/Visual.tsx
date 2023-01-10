import { useEffect, useState } from 'react';
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
  /* opacity: 1; */
  ${(props): number | SerializedStyles | undefined => 
    props.opacityValue && css `
      opacity: ${props.opacityValue}d;
    `
  }
  ${(props): number | SerializedStyles | undefined => 
    props.translateYValue && css `
      transform: translate3d(0, ${props.translateYValue}%, 0);
    `
  }
`;

const StickyMsgB = styled.p<{ opacityValue: number, translateYValue: number}>`
  opacity: 0;
  ${(props): number | SerializedStyles | undefined => 
    props.opacityValue && css `
      opacity: ${props.opacityValue};
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

  ${StickyMsgA}, ${StickyMsgB} {
    color: white;
    font-size: 10vw;
    font-family: ${(props): string => props.theme.defaultFontFamily};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

// const sceneInfo = {
//   type: 'sticky',
//   heightNum: 5,
//   scrollHeight: window.innerHeight * 5,
//   objs: {
//     container: document.querySelector('#visual'),
//     messageA: {
//       opacity: 0,
//       translateY: 0
//     }
//   },
//   values: {
//     messageA_opacity_in: [1, 0, {start: 0, end: 0.1}],
//     messageA_translateY_in: [20, 0, {start: 0, end: 0.1}],
//     messageA_opacity_out: [1, 0, {start: 0.15, end: 0.2}],
//     messageA_translateY_out: [0, -20, {start: 0.15, end: 0.2}],
//   }
// }

const Visual = () => {
  const [sceneInfo, setSceneInfo] = useState(
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: window.innerHeight * 5,
      objs: {
        messageA: {
          opacity: 1,
          translateY: 0
        },
        // messageB: {
        //   opacity: 0,
        //   translateY: 0
        // }
      },
      values: {
        messageA_opacity_in: [1, 0, {start: 0, end: 0.1}],
        messageA_translateY_in: [0, -20, {start: 0, end: 0.1}],
        messageA_opacity_out: [1, 0, {start: 0.15, end: 0.2}],
        messageA_translateY_out: [0, -20, {start: 0.15, end: 0.2}],
        // messageB_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        // messageB_translateY_in: [0, 20, {start: 0.35, end: 0.45}],
        // messageB_opacity_out: [1, 0, {start: 0.2, end: 0.3}],
        // messageB_translateY_out: [0, -20, {start: 0.35, end: 0.45}],
      }
    }
  );

  useEffect(() => {
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true

    const setLayout = () => {
      sceneInfo.scrollHeight = window.innerHeight * sceneInfo.heightNum;
    };

    const scrollLoop = () => {
      playAnimation();
      console.log('opacity😥😥', sceneInfo.objs.messageA.opacity);
    };

    const calcValues = (values: any, currentYOffset: number) => {
      let returnValue;
      const scrollHeight = sceneInfo.scrollHeight;
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
      const objs = sceneInfo.objs;
      const values = sceneInfo.values;
      const scrollHeight = sceneInfo.scrollHeight;
      const yOffset = window.pageYOffset;
      const scrollRatio = yOffset / scrollHeight;

      if (scrollRatio <= 0.3) {
        // in
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              messageA: {
                opacity: calcValues(values.messageA_opacity_in, yOffset),
                translateY: calcValues(values.messageA_translateY_in, yOffset)
              }
            }
          }
        ));
      } else {
        // out
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              messageA: {
                opacity: 0,
                translateY: calcValues(values.messageA_translateY_out, yOffset)
              }
            }
          }
        ));
      }

      console.log('✈✈', objs.messageA.opacity);
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
    <Section id="visual" scrollHeight={sceneInfo.scrollHeight}>
      <StickyElem>
        <StickyMsgA 
          opacityValue={sceneInfo.objs.messageA.opacity}
          translateYValue={sceneInfo.objs.messageA.translateY}
        >
          Are you curious
        </StickyMsgA>
      </StickyElem>
      {/* <StickyElem>
        <StickyMsgB 
          opacityValue={sceneInfo.objs.messageB.opacity}
          translateYValue={sceneInfo.objs.messageB.translateY}
        >
          about who I am
        </StickyMsgB>
      </StickyElem> */}
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