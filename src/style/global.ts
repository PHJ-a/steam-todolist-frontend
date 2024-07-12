import { createGlobalStyle } from 'styled-components';
import 'sanitize.css';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: url(https://cdn.akamai.steamstatic.com/store/promo/summer2024/summer2024_tile_bg.png) repeat center top, #202531;
  }

  p {
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

  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #1b2838;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2a475e;
    border-radius: 10px;
    border: 3px solid #1b2838;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #4a6f8a;
  }

  /* 파이어폭스 전역 스크롤 스타일 설정 */
  * {
    scrollbar-width: thin;
    scrollbar-color: #2a475e #1b2838;
  }
`;
