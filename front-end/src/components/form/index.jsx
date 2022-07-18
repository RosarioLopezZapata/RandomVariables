import React from "react";
export default function Form({ handleSubmit, input, handleChange }) {

    return (
        <div className="App">
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="App-inp">
                        <label>Set of Random Variable</label>
                        <input
                            type='text'
                            required
                            placeholder='Example: Var1,Var2'
                            value={input.variables}
                            name='variables'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="App-inp">
                        <label>Set of Probabilities</label>
                        <input
                            type='text'
                            required
                            placeholder='Example: [0.59,0.97]'
                            value={input.probabilities}
                            name='probabilities'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="App-inp">
                        <label>Number of samples</label>
                        <input
                            type='number'
                            required
                            placeholder='No. of samples...'
                            value={input.sampling}
                            name='sampling'
                            onChange={handleChange}
                        />
                        <button type='submit' >Sampling</button>
                    </div>
                </form>
            </div>
        </div>
    );
}