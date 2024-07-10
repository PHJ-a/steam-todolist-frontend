import { createGlobalStyle } from 'styled-components';
import 'sanitize.css';

export const GlobalStyle = createGlobalStyle`
body{
    margin : 0;
    padding : 0;
    box-sizing: border-box;
    background: url(https://cdn.akamai.steamstatic.com/store/promo/summer2024/summer2024_tile_bg.png) repeat center top, #202531;

}
p{
    margin: 0;
}

#snackbarRoot {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
`;
