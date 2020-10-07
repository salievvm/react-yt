import React, { useState} from 'react';
import PropTypes from 'prop-types';
import './AddTodo.scss';

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }

}

function AddTodo( { onCreate }) {
    const input = useInputValue('');

    function submitHandler(event) {
        event.preventDefault();

        if (input.value().trim()) {
            onCreate(input.value());
            input.clear();
        }
    }

    return (
        <form className="add-todo__form" onSubmit={submitHandler}>
            <div className="field">
                <input 
                {...input.bind}
                    className="input" />
                <button 
                    className="button"
                    type="submit">Add Todo</button>
            </div>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;