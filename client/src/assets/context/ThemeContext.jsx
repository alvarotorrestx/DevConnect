import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export const ThemeProvider = (props) => {

    const [themeMode, setThemeMode] = useState(true)

    const handleThemeMode = () => {
        setThemeMode(prevValue => !prevValue)

        if (!themeMode) {
            localStorage.setItem('themeMode', true)
        } else {
            localStorage.setItem('themeMode', false)
        }
    }

    useEffect(() => {
        if (localStorage) {
            if (JSON.parse(localStorage.getItem('themeMode')) === true) {
                setThemeMode(true)
            } else if (JSON.parse(localStorage.getItem('themeMode')) === false) {
                setThemeMode(false)
            }
        }
    }, [])

    return (
        <ThemeContext.Provider value={
            {
                themeMode,
                actions: {
                    toggleTheme: handleThemeMode
                }
            }
        }>
            {props.children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext