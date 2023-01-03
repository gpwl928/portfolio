export const MEDIA_SIZE = {
  WEB_MAX: 1290,
  TABLET_MAX: 1024,
  MOBILE_LANDSCAPE_MAX: 767,
  MOBILE_PORTRAIT_MAX: 576,
}

export interface ThemeProps {
  backgroundColor: string;
  mainColor: string;
  mainHoverColor: string;
  mainDisabledColor: string;
  defaultFontFamily: string;
  defaultFontWeight: string;
  mainTextColor: string;
  textBasicColor1: string;
  textBasicColor2: string;
  WEB_MAX: number;
  TABLET_MAX: number;
  MOBILE_LANDSCAPE_MAX: number;
  MOBILE_PORTRAIT_MAX: number;
  HEADER_HEIGHT: number;
  MOBILE_HEADER_HEIGHT: number;
}

export const InitTheme = (): ThemeProps => {
  return (
    {
      backgroundColor: '#f2f2f2',
      mainColor: 'tomato',
      mainHoverColor: 'red',
      mainDisabledColor: 'darkgray',
      defaultFontFamily: 'Malgun Gothic, 맑은 고딕, Arial, sans-serif',
      defaultFontWeight: '700',
      mainTextColor: '#181818',
      textBasicColor1: '#D2D4E4',
      textBasicColor2: '#7E88BA',
      WEB_MAX: MEDIA_SIZE.WEB_MAX,
      TABLET_MAX: MEDIA_SIZE.TABLET_MAX,
      MOBILE_LANDSCAPE_MAX: MEDIA_SIZE.MOBILE_LANDSCAPE_MAX,
      MOBILE_PORTRAIT_MAX: MEDIA_SIZE.MOBILE_PORTRAIT_MAX,
      HEADER_HEIGHT: 60,
      MOBILE_HEADER_HEIGHT: 52,
    }
  )
}