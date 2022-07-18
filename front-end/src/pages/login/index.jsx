import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'

export default function LogIn() {
    const [input, setInput] = useState({
        name: '',
        password: '',
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    const [logs, setLogs] = useState([])
    const getLogs = () => {
        fetch('http://localhost:5000/authenticate').then(response => {
            return response.json()
        }).then(data => setLogs(data))
    }
    useEffect(() => {
        getLogs();
    }, [])

    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        const aut = logs[0]
        if (aut.name === input.name && aut.password === input.password) {
            navigate("/logged/" + aut.id);
        }
        else alert('User name or password incorrect')
    }
    return (
        <div className="App">
            <form onSubmit={(e) => handleSubmit(e)} className={styles.userForm}>
                <div className="App-inp">
                    <label>User Name</label>
                    <input
                        type='text'
                        placeholder='...'
                        value={input.name}
                        name='name'
                        onChange={handleChange}
                    />
                </div>
                <div className="App-inp">
                    <label>User Password</label>
                    <input
                        type='password'
                        placeholder='...'
                        value={input.password}
                        name='password'
                        onChange={handleChange}
                    />
                </div>
                <div className="App-inp">
                    <button type='submit' >Log In</button>
                </div>
            </form>
        </div>
    );
}