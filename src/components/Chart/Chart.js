import React, { useState, useEffect } from 'react';
import { fetchPoints } from '../../db/db';
import PieChart from './PieChart';
import LineChart from './LineChart';
import BarChart from './BarChart';

function Chart({ user }) {
    let [points, setPoints] = useState([]);

    useEffect(() => {
        console.log('Chart mounted...');
        fetchPoints(user).then((ptArr) => {
            setPoints(ptArr);
        });
    }, []);

    useEffect(() => {
        console.log('Points array upd', points);
    }, [points]);

    return (
        <div>
            <div>
                <LineChart points={points} />
            </div>
            <div className="flex justify-around">
                <div>
                    <PieChart points={points} />
                </div>
                <div>
                    <BarChart points={points} />
                </div>
            </div>
        </div>
    );
}

export default Chart;

/*
Pie: priority count
6-Mar 13-Mar
Line:
*/