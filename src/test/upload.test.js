import React from 'react'
import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../components/Modal/Modal'
import HandleFileChange from '../components/Modal/Modal'

describe('Modal Test', () => {
    it('should display "Add New Todo" Title', () => {
        const {getByText} = render(<Modal />)

        expect(getByText('Add New Todo')).toBeInTheDocument()

    })

    it('should display "Choose file" button for select file to upload', () => {
        const {getByTestId} = render(<Modal />)

        expect(getByTestId('fileUploadInput')).toBeInTheDocument()

    })

    it('should upload success when upload PNG file', () => {
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        const {getByTestId} = render(<Modal />)

        expect(getByTestId('fileUploadInput')).toBeInTheDocument()

        userEvent.upload(getByTestId('fileUploadInput'), file)

        expect(getByTestId('successText')).toBeInTheDocument()

    })

    it('should upload success when upload JPG file', () => {
        const file = new File(['hello'], 'hello.jpg', {type: 'image/jpg'})
        const {getByTestId} = render(<Modal />)

        expect(getByTestId('fileUploadInput')).toBeInTheDocument()

        userEvent.upload(getByTestId('fileUploadInput'), file)

        expect(getByTestId('successText')).toBeInTheDocument()

    })

    it('should upload failed when upload another file type', () => {
        const file = new File(['hello'], 'hello.pdf', {type: 'image/pdf'})
        const {getByTestId} = render(<Modal />)

        expect(getByTestId('fileUploadInput')).toBeInTheDocument()

        userEvent.upload(getByTestId('fileUploadInput'), file)

        expect(getByTestId('errorText').textContent).toBe('Please select a valid image file (jpg, jpeg, or png).')
    })

    it('should upload failed when upload another file type', () => {
        const file = new File(['hello'], 'hello.pdf', {type: 'image/pdf'})
        const {getByTestId} = render(<Modal />)

        expect(getByTestId('fileUploadInput')).toBeInTheDocument()

        userEvent.upload(getByTestId('fileUploadInput'), file)

        expect(getByTestId('errorText').textContent).toBe('Please select a valid image file (jpg, jpeg, or png).')
    })

    it('should upload success and store file infirebase', () => {
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        const {getByTestId} = render(<Modal />)

        expect(getByTestId('fileUploadInput')).toBeInTheDocument()

        userEvent.upload(getByTestId('fileUploadInput'), file)

        expect(getByTestId('uploadingDoneText')).toBeInTheDocument()
    })

    
    
})