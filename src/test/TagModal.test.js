import React from 'react';
import { render ,screen,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import TagModal from '../components/Modal/TagModal';



describe('ValidationInput Component', () => {
    test('validates tag name with character less than 5', () => {
        const {getByTestId} = render(<TagModal />);
        const input = screen.getByTestId('tag-name-input');
        
        // Test with invalid input
        fireEvent.change(input, { target: { value: 'abc' } });
        expect(getByTestId('error-message').textContent).toBe('Name must be at least 5 characters long!')

    });

    test('validates tag name with character more than 5', () => {
      const {getByTestId} = render(<TagModal />);
      const input = screen.getByTestId('tag-name-input');

      // Test with valid input
      fireEvent.change(input, { target: { value: 'abcde' } });
      expect(getByTestId('success-message').textContent).toBe('This name can save.');
    });

    test('validates tag name with invalid character ', () => {
    const {getByTestId} = render(<TagModal />);
    const input = screen.getByTestId('tag-name-input');

    // Test with valid input
    fireEvent.change(input, { target: { value: 'hello!' } });
    expect(getByTestId('error-message').textContent).toBe('Only alphanumeric characters are  allowed!');
    });

    test('validates tag name with valid character ', () => {
      const {getByTestId} = render(<TagModal />);
      const input = screen.getByTestId('tag-name-input');
  
      // Test with valid input
      fireEvent.change(input, { target: { value: 'hello' } });
      expect(getByTestId('success-message').textContent).toBe('This name can save.');
      });

});
