import React, { useState } from 'react';
import { Slider, TextField, Checkbox } from '@material-ui/core';

import {storage} from "../../db/db";

const dateString = () => {
    return new Date().toISOString();
};

export default function Modal({ priority, closeModalHandler, addTodoItem }) {
    console.log('env ' ,process.env.NODE_ENV)
    const [todoContent, setTodoContent] = useState('');
    const [todoDuration, setTodoDuration] = useState(25);
    const [todoSchedule, setTodoSchedule] = useState(dateString());
    const [isSchedule, setIsSchedule] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const todoContentChangeHanlder = (event) => {
        setTodoContent(() => event.target.value);
    };
    const valuetext = (value) => {
        setTodoDuration(() => value);
        console.log(value);
    };

    const handleFileChange = (event) => {
        // Handle the file selection here
        const selected = event.target.files[0];
        // Check if a file is selected
        if (selected) {
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(selected.type)) {
                setError('Please select a valid image file (jpg, jpeg, or png).');
                setSelectedFile(null);
                return;
            }

            // Check file size (in bytes)
            const maxSize = 200 * 1024; // 200 KB
            if (selected.size > maxSize) {
                setError('File size exceeds the limit (200 KB).');
                setSelectedFile(null);
                return;
            }

            // File is valid, clear any previous error
            setError('');
            setSelectedFile(selected);
            uploadFiles(selected);
        }
    };

    const uploadFiles = (selected) => {
        
        const uploadTask = storage.ref(`files/${selected.name}`).put(selected);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.log(error),
          () => {
            storage
              .ref("files")
              .child(selected.name)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
              });
          }
        );
      };

    return (
        <>
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Add New Todo
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModalHandler}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <form>
                                    <div>
                                        <label className="block text-lg">
                                            <span>Todo Title</span>
                                        </label>
                                        <input
                                            autoFocus
                                            className="text-lg rounded-l-lg mt-2 px-4 py-2 border text-gray-800 border-gray-200 bg-white focus:outline-none"
                                            placeholder="Water the plants!"
                                            value={todoContent}
                                            onChange={todoContentChangeHanlder}
                                        ></input>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-lg">
                                            <p>
                                                Duration:{' '}
                                                <span className="font-bold">
                                                    {todoDuration} mins
                                                </span>
                                            </p>
                                        </label>
                                        <div className="mt-7">
                                            <Slider
                                                defaultValue={25}
                                                getAriaValueText={valuetext}
                                                aria-labelledby="discrete-slider-small-steps"
                                                step={5}
                                                marks
                                                min={5}
                                                max={60}
                                                valueLabelDisplay="auto"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-lg">
                                            <span>Schedule</span>
                                            <Checkbox
                                                checked={isSchedule}
                                                onChange={(e) => {
                                                    setIsSchedule(
                                                        e.target.checked
                                                    );
                                                }}
                                                inputProps={{
                                                    'aria-label':
                                                        'primary checkbox',
                                                }}
                                            />
                                        </label>

                                        {isSchedule ? (
                                            <TextField
                                                id="datetime-local"
                                                type="datetime-local"
                                                value={todoSchedule}
                                                onChange={(e) => {
                                                    setTodoSchedule(
                                                        e.target.value
                                                    );
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                    <div>
                                        <label className="block text-lg" htmlFor="fileInput">Choose a file:</label>
                                        <input
                                            type="file"
                                            data-testid="fileUploadInput"
                                            id="fileInput"
                                            //accept=".jpg, .jpeg, .png" // Specify accepted file types if needed
                                            onChange={handleFileChange}
                                        />

                                        {error && <p data-testid='errorText' style={{ color: 'red' }}>{error}</p>}

                                        {selectedFile && (
                                            
                                            <div data-testid='successText'>
                                                <p>Selected File: {selectedFile.name}</p>
                                                <p>File Size: {selectedFile.size} bytes</p>
                                                <p>File Type: {selectedFile.type}</p>
                                                {/* You can display additional information about the selected file here */}
                                            </div>
                                            
                                        )}
                                         <h2 data-testid='uploadingDoneText'>Uploading done {progress}%</h2>
                                        
                                    </div>
                                </form>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                <button
                                    className="text-red-500 hover:bg-red-500 hover:text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                    onClick={closeModalHandler}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transform hover:scale-110"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                    onClick={() => {
                                        addTodoItem(
                                            todoContent,
                                            priority,
                                            todoDuration,
                                            todoSchedule,
                                            isSchedule,
                                            selectedFile
                                        );
                                        setTodoContent('');
                                        closeModalHandler();
                                    }}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        </>
    );
}
/*
addTodoItem = (
    content,
    priority,
    duration,
    scheduleStart,
    scheduleEnd
)
*/