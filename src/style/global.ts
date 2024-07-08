import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body{
    margin : 0;
    padding : 0;
    box-sizing: border-box;
   
}
#snackbarRoot {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }`;
