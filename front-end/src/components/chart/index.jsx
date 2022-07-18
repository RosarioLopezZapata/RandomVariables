import React from 'react';
import { useMemo } from 'react';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
Chart.register(
    CategoryScale,
    LinearScale, LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
export default function VblsChart({ api }) {
    //values from client
    const labels = [];// x
    var maximum = [];// will serve for graphic resolution
    let values = [];//information

    if (api.variables) {

        if (api.variables && api.distributions && api.sampling) {

            var graph = api.variables.split(',');
            for (let j = 0; j < api.distributions.length; j++) {

                let arr = [];
                for (let i = 0; i < 3; i++) {
                    arr.push(Math.floor(Math.random() * 397).toString())
                }
                var info = {
                    score: api.distributions[j],
                    title: graph[j],
                    borderColors: "rgba(" + arr + ",1)",
                    backgroundColor: "rgba(" + arr + ",0.4)"
                };
                var x = parseInt(api.sampling * 1.5)
                for (let i = 0; i < x; i++) {
                    labels[i] = i;
                }

                maximum.push(Math.max(...api.distributions[j]));
                values.push(info)
            }
            var max = Math.max(...maximum);
        }
    }

    const options = {
        fill: true,
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: max + 0.01
            },
        },
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const data = useMemo(function () {
        const scores = values.map((val) => {
            return {
                label: val.title,
                data: val.score,
                tension: 0.3,
                pointRadius: 6,
                borderColor: val.borderColors,
                backgroundColor: val.backgroundColor,
            };
        }
        )
        return {
            datasets: scores,
            labels
        };
    });
    //CSV file

    var csvFileData = values.map((value => {
        return [value.title, value.score]
    }))

    function downloadFile() {

        var csv = 'Variable,Distribution\n';
        csvFileData.forEach(function (row) {
            csv += row.join(',');
            csv += "\n";
        });
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';

        hiddenElement.download = 'DistOfRndVbles.csv';
        hiddenElement.click();
    }
    return (
        <>
            <Line data={data} options={options} />
            <button className="App-btn" onClick={() => downloadFile()}> Download CSV </button>
        </>
    )
}