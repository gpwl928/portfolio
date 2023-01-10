import styled from '@emotion/styled';
import React from 'react';

const Title = styled.h1`
  color: ${(props): string => props.theme.mainTextColor};
  font-family: ${(props): string => props.theme.defaultFontFamily};
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
  text-decoration: underline;
  text-underline-position: under;
`;

interface TitleProps {
  title: string;
}

const SectionTitle: React.FC<TitleProps> = ({ title }) => {
  return (
    <Title>
      {title}
    </Title>
  );
};

export default SectionTitle;