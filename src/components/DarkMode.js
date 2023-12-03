import { useState } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";
import Home from "../page/Home/Home";

const DarkMode = () => {
    const[isDarkMode, setIsDarkMode] = useState(false);
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme','dark')
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme','light')
    }

    const toggleTheme = (e) => {
        if(e.target.checked) {
            setDarkMode(); 
            setIsDarkMode(!isDarkMode);
        }
        else {
            setLightMode();
            setIsDarkMode(!isDarkMode);
        }
    };

    

    return (
        <div className='dark_mode' >
            
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
               
                checked={isDarkMode}
                onChange={toggleTheme}
                data-testid='dark-mode-toggle'
            />
            
            
            <label className='dark_mode_label' htmlFor='darkmode-toggle'  >
                {isDarkMode? <Moon data-testid="Moon" />
                            : <Sun data-testid="Sun" />
                }
            </label>
            <div></div>
            
        </div>
    );
};

export default DarkMode;