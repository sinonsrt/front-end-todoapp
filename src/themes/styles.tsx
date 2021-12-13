import { createGlobalStyle } from 'styled-components';
import { ThemeType } from 'themes';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
