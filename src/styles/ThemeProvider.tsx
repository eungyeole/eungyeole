import { Global } from "@emotion/react";
import { FC } from "react";
import globalStyle from "./globalStyle";

interface ThemeProviderProps{
    children : React.ReactNode
}
const ThemeProvider:FC<ThemeProviderProps> = ({children}) => {
    return(
        <>
            <Global styles={globalStyle} />
            {children}
        </>
    )
}
export default ThemeProvider;