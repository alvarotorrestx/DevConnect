import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export const ThemeProvider = (props) => {

    const [darkMode, setDarkMode] = useState(false)

    const handleDarkMode = () => {
        setDarkMode(prevValue => !prevValue)

        if (!darkMode) {
            localStorage.setItem('darkMode', true)
        } else {
            localStorage.setItem('darkMode', false)
        }
    }

    useEffect(() => {
        if (localStorage) {
            if (JSON.parse(localStorage.getItem('darkMode')) === true) {
                setDarkMode(true)
            } else if (JSON.parse(localStorage.getItem('darkMode')) === false) {
                setDarkMode(false)
            }
        }
    }, [])

    return (
        <ThemeContext.Provider value={
            {
                darkMode,
                actions: {
                    toggleTheme: handleDarkMode
                }
            }
        }>
            {props.children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext