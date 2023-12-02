import React from 'react';
import { Line } from 'react-chartjs-2';

const getLabelDates = () => {
    const time = new Date();
    const size = 10;
    time.setDate(time.getDate() - size);
    let now = time.toISOString().split('T')[0];
    let j = 0;
    let final = [];
    while (j < size) {
        time.setDate(time.getDate() + 1);
        now = time.toISOString().split('T')[0];
        let timeArr = now.split('-');
        final.push(timeArr[2] + '/' + timeArr[1] + '/' + timeArr[0]);
        j += 1;
    }
    return final;
};

const getISODates = () => {
    const time = new Date();
    const size = 10;
    time.setDate(time.getDate() - size);
    let now = time.toISOString().split('T')[0];
    let j = 0;
    let final = [];
    while (j < size) {
        time.setDate(time.getDate() + 1);
        now = time.toISOString().split('T')[0];
        final.push(now);
        j += 1;
    }
    return final;
};

const getDateScore = (points) => {
    const dates = getISODates();
    let score = [];
    dates.forEach((dt) => {
        let ptArr = points.filter((pt) => pt.date === dt);
        score.push(ptArr.reduce((acc, pt) => acc + pt.points, 0));
    });
    return score;
};
function LineChart({ points }) {
    return (
       
        <Line

            data={{
                labels: getLabelDates(),
                datasets: [
                    {
                        label: 'Daily Performance',
                        data: getDateScore(points),
                        backgroundColor: ['rgba(75, 0, 130,0.6)'],

                        borderWidth: 1,
                    },
                ],
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        fontSize: 25,
                    },
                },
            }}
        />
    );
}

export default LineChart;
