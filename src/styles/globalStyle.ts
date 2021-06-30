import { css } from '@emotion/react'
const globalStyle = css`
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    ol, ul {
        list-style: none;
    }
    #__next{
        height: 100%;
    }
`
export default globalStyle;