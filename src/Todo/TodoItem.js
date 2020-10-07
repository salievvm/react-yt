import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem( { todo, onChange } ) {
    const { removeTodo } = useContext(Context);
    const { id, completed, title, index } = todo;
    let classes = [];

    if (completed)
        classes.push('done')

    return (
        <li style={styles.li} className={classes.join(' ')}>
            <label>
                <input 
                    onChange={() => onChange(id)}
                    style={styles.input}
                    type="checkbox"
                    checked={completed}/>
                <b>{index+1}</b>.&nbsp;{title}
            </label>
            <button className="rm" onClick={removeTodo.bind(null, id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;