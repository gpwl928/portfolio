import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import Stroke from 'public/images/stroke.svg'
import TextSvg from 'public/images/text.svg'

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

const StickyElem = styled.div<{ svgType?: string, translateYValue?: number, translateXValue?: number, opacity?: number }>`
  /* display: none; */
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  ${(props): string | SerializedStyles | boolean => 
    props.svgType === "text" && css`
      transform: translate3d(${props.translateXValue}%, -50%, 0);
    `
  }

${(props): string | SerializedStyles | boolean => 
    props.svgType === "stroke" && css`
      svg {
        min-width: 850px;
        stroke: #FF0044;
        stroke-width: 62;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 1401, 1401;
        stroke-dashoffset: 1401;
        transform: translate3d(0, ${props.translateYValue}%, 0);
      }
    `
  }
`;

const StickyMsg = styled.p<{ opacityValue: number, translateYValue: number}>`
  color: white;
  font-size: 10vw;
  font-family: ${(props): string => props.theme.defaultFontFamily};
  font-weight: 600;
  text-transform: uppercase;
  ${(props): number | SerializedStyles | boolean => 
    props.opacityValue > -1 && css`
      opacity: ${props.opacityValue};
    `
  }
  ${(props): number | SerializedStyles | undefined => 
    props.translateYValue && css`
      transform: translate3d(0, ${props.translateYValue}%, 0);
    `
  }
`;

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
        messageB: {
          opacity: 0,
          translateY: 0
        },
        textSvg: {
          width: 0,
          opacity: 0,
          translateX: 0
        },
        stroke: {
          opacity: 0,
          translateY: 0
        },
        messageC: {
          opacity: 0,
          translateY: 0
        }
      },
      values: {
        messageA_opacity_in: [1, 0, {start: 0, end: 0.1}],
        messageB_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        messageA_translateY_in: [0, -20, {start: 0, end: 0.1}],
        messageB_translateY_in: [20, 0, {start: 0.35, end: 0.45}],
        messageA_opacity_out: [1, 0, {start: 0.15, end: 0.2}],
        messageB_opacity_out: [1, 0, {start: 0.2, end: 0.3}],
        messageA_translateY_out: [0, -20, {start: 0.15, end: 0.2}],
        messageB_translateY_out: [0, -20, {start: 0.35, end: 0.45}],
        textSvg_width_in: [1000, 200, { start: 0.1, end: 0.4 }],
				textSvg_width_out: [200, 50, { start: 0.4, end: 0.8 }],
				textSvg_translateX_in: [-10, -20, { start: 0.2, end: 0.4 }],
				textSvg_translateX_out: [-20, -50, { start: 0.4, end: 0.8 }],
				textSvg_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
        path_dashoffset_in: [1401, 0, { start: 0.2, end: 0.4 }],
				path_dashoffset_out: [0, -1401, { start: 0.6, end: 0.8 }]
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

      if (scrollRatio <= 0.2) {
        // in
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              ...prevState.objs,
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
              ...prevState.objs,
              messageA: {
                opacity: 0,
                translateY: calcValues(values.messageA_translateY_out, yOffset)
              }
            }
          }
        ));
      }

      if (scrollRatio <= 0.3) {
        // in
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              ...prevState.objs,
              messageB: {
                opacity: calcValues(values.messageB_opacity_in, yOffset),
                translateY: calcValues(values.messageB_translateY_in, yOffset)
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
              ...prevState.objs,
              messageB: {
                opacity: calcValues(values.messageB_opacity_out, yOffset),
                translateY: calcValues(values.messageB_translateY_out, yOffset)
              }
            }
          }
        ));
      }

      // if (scrollRatio <= 0.4) {
      //   setSceneInfo((prevState) => (
      //     {
      //       ...prevState,
      //       objs: {
      //         ...prevState.objs,
      //         textSvg: {
      //           width: 0,
      //           opacity: 0,
      //           translateX: 0,
      //           opacity: calcValues(values.messageB_opacity_out, yOffset),
      //           translateY: calcValues(values.messageB_translateY_out, yOffset)
      //         }
      //       }
      //     }
      //   ));
      //   objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_in, currentYOffset)}vw`;
      //   objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_in, currentYOffset)}%, -50%)`;
      // } else {
      //   objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_out, currentYOffset)}vw`;
      //   objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_out, currentYOffset)}%, -50%)`;
      // }

      // // 빨간 리본 패스(줄 긋기)
      // if (scrollRatio <= 0.5) {
      //   objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_in, currentYOffset);
      // } else {
      //   objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_out, currentYOffset);
      // }

      // objs.pencilLogo.style.opacity = calcValues(values.pencilLogo_opacity_out, currentYOffset);

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
        <StickyMsg 
          opacityValue={sceneInfo.objs.messageA.opacity}
          translateYValue={sceneInfo.objs.messageA.translateY}
        >
          Are you curious
        </StickyMsg>
      </StickyElem>
      <StickyElem>
        <StickyMsg 
          opacityValue={sceneInfo.objs.messageB.opacity}
          translateYValue={sceneInfo.objs.messageB.translateY}
        >
          about who I am
        </StickyMsg>
      </StickyElem>
      <StickyElem svgType="text">
        <TextSvg width={sceneInfo.objs.textSvg.width} height="auto" />
      </StickyElem>
      <StickyElem>
        <Stroke />  
      </StickyElem>
      <StickyElem svgType="stroke">
        <StickyMsg 
          opacityValue={sceneInfo.objs.messageC.opacity}
          translateYValue={sceneInfo.objs.messageC.translateY}
        >
          Show me
        </StickyMsg>
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