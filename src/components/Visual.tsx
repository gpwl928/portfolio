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
  background: #fcfcfc;
  text-align: center;
  @media (max-width: ${(props): number => props.theme.MOBILE_LANDSCAPE_MAX}px) {
    scroll-margin-top: ${(props): number => props.theme.MOBILE_HEADER_HEIGHT}px;
    /* height: calc(100vh - ${(props): number => props.theme.HEADER_HEIGHT}px); */
  }
`;

const StickyElem = styled.div<{ 
  svgType?: string, 
  translateYValue?: number, 
  translateXValue?: number, 
  opacityValue?: number, 
  dashOffset?: number 
}>`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: 10;

  ${(props): number | SerializedStyles | boolean => 
    props.opacityValue > -1 && css`
      opacity: ${props.opacityValue};
    `
  }

  ${(props): number | SerializedStyles | undefined => 
    props.translateYValue && css`
      transform: translate3d(-50%, ${props.translateYValue}%, 0);
    `
  }

  ${(props): string | SerializedStyles | boolean => 
    props.svgType === "text" && css`
      transform: translate3d(${props.translateXValue}%, ${props.translateYValue}%, 0);
      z-index: 1;
    `
  }

${(props): boolean | number | SerializedStyles | undefined => 
    props.svgType === "stroke" && props.dashOffset && css`
      svg {
        path {
          stroke: #FF0044;
          stroke-width: 72;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1401;
          stroke-dashoffset: ${props.dashOffset};
        }
      }
    `
  }

  &:last-of-type {
    transform: translate(-50%, -72%);
  }
`;

const ScrollMsg = styled.p`
  color: white;
  font-size: 8vw;
  font-family: ${(props): string => props.theme.defaultFontFamily};
  font-weight: 600;
  text-transform: uppercase;
`;

const StickyMsg = styled.p`
  color: white;
  font-size: 6vw;
  font-family: ${(props): string => props.theme.defaultFontFamily};
  font-weight: 600;
  text-transform: uppercase;
`;

const Visual = () => {
  const [sceneInfo, setSceneInfo] = useState(
    {
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
          width: 100,
          opacity: 0,
          translateX: -150,
          translateY: -20
        },
        stroke: {
          opacity: 0,
          dashOffset: 0
        },
        messageC: {
          opacity: 0,
        }
      },
      values: {
        messageA_opacity_inout: [1, 0, {start: 0, end: 0.15}],
        messageA_translateY_inout: [-50, -70, {start: 0, end: 0.15}],
        messageB_opacity_in: [0, 1, {start: 0.16, end: 0.28}],
        messageB_opacity_out: [1, 0, {start: 0.3, end: 0.45}],
        messageB_translateY_in: [-40, -50, {start: 0.16, end: 0.28}],
        messageB_translateY_out: [-50, -70, {start: 0.3, end: 0.45}],
        textSvg_width_inout: [8400, 95, { start: 0.45, end: 0.62 }],
				textSvg_translateX_inout: [-150, -50, { start: 0.45, end: 0.62 }],
				textSvg_translateY_inout: [-57, -50, { start: 0.45, end: 0.62 }],
				textSvg_opacity_out: [1, 0, { start: 0.78, end: 0.88 }],
        path_dashoffset_in: [1401, 0, { start: 0.62, end: 0.73 }],
				path_dashoffset_out: [0, -1401, { start: 0.74, end: 0.86 }],
        messageC_opacity_in: [0, 1, {start: 0.67, end: 0.72}],
        messageC_opacity_out: [1, 0, {start: 0.77, end: 0.8}],
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
                opacity: calcValues(values.messageA_opacity_inout, yOffset),
                translateY: calcValues(values.messageA_translateY_inout, yOffset)
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
                translateY: calcValues(values.messageA_translateY_inout, yOffset)
              }
            }
          }
        ));
      }

      if (scrollRatio <= 0.35) {
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

      if (scrollRatio <= 0.5) {
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              ...prevState.objs,
              textSvg: {
                width: calcValues(values.textSvg_width_inout, yOffset),
                opacity: 1,
                translateX: calcValues(values.textSvg_translateX_inout, yOffset),
                translateY: calcValues(values.textSvg_translateY_inout, yOffset)
              }
            }
          }
        ));
      } else {
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              ...prevState.objs,
              textSvg: {
                // ...prevState.objs.textSvg,
                // ??? : prevState값으로 넣으니깐 이전값에 저장되어있던 값에서 멈춘다.. 
                width:  calcValues(values.textSvg_width_inout, yOffset),
                opacity: calcValues(values.textSvg_opacity_out, yOffset),
                translateX: calcValues(values.textSvg_translateX_inout, yOffset),
                translateY: calcValues(values.textSvg_translateY_inout, yOffset)
              }
            }
          }
        ));
      }

      if (scrollRatio <= 0.725) {
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              ...prevState.objs,
              stroke: {
                opacity: 1,
                dashOffset: calcValues(values.path_dashoffset_in, yOffset)
              },
              messageC: {
                opacity: calcValues(values.messageC_opacity_in, yOffset)
              }
            }
          }
        ));
      } else {
        setSceneInfo((prevState) => (
          {
            ...prevState,
            objs: {
              ...prevState.objs,
              stroke: {
                opacity: 1,
                dashOffset: calcValues(values.path_dashoffset_out, yOffset)
              },
              messageC: {
                opacity: calcValues(values.messageC_opacity_out, yOffset)
              }
            }
          }
        ));
      }
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
      <StickyElem
        opacityValue={sceneInfo.objs.messageA.opacity}
        translateYValue={sceneInfo.objs.messageA.translateY}
      >
        <ScrollMsg>
          Are you curious
        </ScrollMsg>
      </StickyElem>
      <StickyElem
        opacityValue={sceneInfo.objs.messageB.opacity}
        translateYValue={sceneInfo.objs.messageB.translateY}
      >
        <ScrollMsg>
          about who I am
        </ScrollMsg>
      </StickyElem>
      <StickyElem 
        svgType="text"
        opacityValue={sceneInfo.objs.textSvg.opacity}
        translateXValue={sceneInfo.objs.textSvg.translateX}
        translateYValue={sceneInfo.objs.textSvg.translateY}
      >
        <TextSvg width={`${sceneInfo.objs.textSvg.width}vw`} height="auto" />
      </StickyElem>
      <StickyElem 
        svgType="stroke" 
        dashOffset={sceneInfo.objs.stroke.dashOffset}
      >
        <Stroke width="100%" height="100%" fill="transparent" />  
      </StickyElem>
      <StickyElem
        opacityValue={sceneInfo.objs.messageC.opacity}
      >
        <StickyMsg>
          scroll
        </StickyMsg>
        <StickyMsg>
          down
        </StickyMsg>
      </StickyElem>
    </Section>
  );
};

export default Visual;