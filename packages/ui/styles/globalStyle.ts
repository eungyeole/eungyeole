import { createGlobalStyle } from "styled-components";
import { normalize } from "./normalize";

export const GlobalStyle = createGlobalStyle`
    ${normalize}

    html,
    body {
        box-sizing: border-box;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
        'Noto Sans KR', 'Malgun Gothic', Tossface, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
