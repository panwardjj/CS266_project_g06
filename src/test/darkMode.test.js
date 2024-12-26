import React from 'react'
import { fireEvent, getByTestId, render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import DarkMode from '../components/DarkMode'
import Home from '../page/Home/Home'
import { Input } from '@material-ui/core'

describe('DarkModeToggle Component', () => {
    
    test('toggle enable to dark mode after clicking', () => {
        const mockOnToggle = jest.fn();
        const { rerender } = render(<DarkMode isDarkMode={false} toggleTheme={mockOnToggle} />);
        const checkbox = screen.getByTestId('dark-mode-toggle');

        //Initial render with dark mode off
        expect(checkbox).not.toBeChecked()
        // Simulate user clicking the checkbox to enable dark mode
        fireEvent.click(checkbox);
        
        // Re-render with dark mode on
        rerender(<DarkMode isDarkMode={true} onToggle={mockOnToggle} />);
        expect(checkbox).toBeChecked();

    });
    

    test('toggle display initial SVG images (Sun) ', () => {
        render(<DarkMode />);

         // Initially, the first SVG should be displayed
         expect(screen.getByTestId('Sun')).toBeInTheDocument();
         expect(screen.queryByTestId('Moon')).not.toBeInTheDocument();

    });

    test('toggle display SVG images (Moon) after clicking ', () => {
        render(<DarkMode />);
        const toggleButton = screen.getByTestId('dark-mode-toggle');

        // After clicking the button, the second SVG should be displayed
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('Moon')).toBeInTheDocument();
        expect(screen.queryByTestId('Sun')).not.toBeInTheDocument();

    });

     

    test('set attributes in body to "dark" after clicking', () => {
        render(<DarkMode />);
        const toggleButton = screen.getByTestId('dark-mode-toggle');
        const attributeName = 'data-theme';
        const attributeValue = 'dark';

        fireEvent.click(toggleButton);
        expect(document.body.getAttribute(attributeName)).toBe(attributeValue);
       
    });

    test('set attributes in body to "light" after click to change dark mode to light mode', () => {
        render(<DarkMode />);
        const toggleButton = screen.getByTestId('dark-mode-toggle');
        const attributeName = 'data-theme';
        const attributeValue = 'light';

        fireEvent.click(toggleButton);
        fireEvent.click(toggleButton);
        expect(document.body.getAttribute(attributeName)).toBe(attributeValue);
       
    });

    
});