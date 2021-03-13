import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Countdown.css';
import {
    faCheckCircle,
    faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
//import video from './video.mp4';

function Countdown({ todo, giveUpFn, completeFn }) {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
        info: {
            color: 'green',
        },
        warning: {
            color: 'orange',
            threshold: WARNING_THRESHOLD,
        },
        alert: {
            color: 'red',
            threshold: ALERT_THRESHOLD,
        },
    };
    let TIME_LIMIT = null;
    let timePassed = 0;
    let timeLeft = null;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    async function startTimer(duration) {
        //console.log("start timer called");
        TIME_LIMIT = duration;
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = duration - timePassed;
            if (document.getElementById('base-timer-label')) {
                document.getElementById(
                    'base-timer-label'
                ).innerHTML = formatTime(timeLeft);
            }
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
        console.log(timerInterval);
    }

    useEffect(() => {
        if (todo && todo.duration !== undefined) {
            startTimer(todo.duration * 60);
        }
    }, [todo]);

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function giveUp() {
        onTimesUp();
        giveUpFn();
    }
    function done() {
        onTimesUp();
        completeFn(todo);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById('base-timer-path-remaining')
                .classList.remove(warning.color);
            document
                .getElementById('base-timer-path-remaining')
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById('base-timer-path-remaining')
                .classList.remove(info.color);
            document
                .getElementById('base-timer-path-remaining')
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById('base-timer-path-remaining')
            .setAttribute('strokeDasharray', circleDasharray);
    }

    return (
        <div className="countdown-wrap h-screen">
            {/* <video loop autoPlay style={{ position: "absolute", height: "100%", width: "100%", objectFit: "cover" }}>
                <source src={process.env.PUBLIC_URL + "/assets/video.mp4"} type="video/mp4" />
            </video> */}
            <audio loop autoplay>
                <source
                    src={process.env.PUBLIC_URL + '/assets/rain.mp3'}
                    type="audio/mp3"
                />
            </audio>
            <div id="app" className="countdown-app border border-red-700">
                <div className="base-timer ">
                    <svg
                        className="base-timer__svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g className="base-timer__circle">
                            <circle
                                className="base-timer__path-elapsed"
                                cx="50"
                                cy="50"
                                r="45"
                            ></circle>
                            <path
                                id="base-timer-path-remaining"
                                strokeDasharray="283"
                                class={`base-timer__path-remaining ${remainingPathColor}`}
                                d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0"
                            ></path>
                        </g>
                    </svg>
                    <span id="base-timer-label" className="base-timer__label">
                        {formatTime(timeLeft)}
                    </span>
                </div>
            </div>
            <div className="countdown-button-wrap">
                <div
                    onClick={done}
                    className="countdown-button hover:bg-gray-500 cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        size="2x"
                        className="mr-2"
                    />
                    Done
                </div>
                <div
                    onClick={giveUp}
                    className="countdown-button hover:bg-gray-500 cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={faExclamationCircle}
                        size="2x"
                        className="mr-2"
                    />{' '}
                    Give Up
                </div>
            </div>
        </div>
    );
}

export default Countdown;
