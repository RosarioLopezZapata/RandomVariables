import { React, useState } from 'react';
import VblsChart from '../../components/chart';
import Form from "../../components/form";

export default function Graphic() {
    const [input, setInput] = useState({
        variables: '',
        probabilities: '',
        sampling: 0,
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    const [infoTreated, setInfoTreated] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:5000/api/create', {
            method: ["POST"],
            body: JSON.stringify({
                content: input
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(message => {
                setInfoTreated(message[201])
                setInput({
                    variables: '',
                    probabilities: '',
                    sampling: 0,
                })
            })
    }
    var value = {};
    if (infoTreated.variables) value = infoTreated
    return (
        <div className="App">
            <div>
                <Form handleSubmit={handleSubmit} input={input} handleChange={handleChange} />
            </div>
            <div>
                <VblsChart api={value} />
            </div>
        </div>
    );
}