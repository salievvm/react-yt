import React, { useState, useEffect, lazy } from 'react';
import TodoList from './Todo/TodoList'
import Context from './context';
import Loader from './components/Loader';
import Modal from './Modal/Modal';

const AddTodo = lazy(() => import('./Todo/AddTodo'))

function App() {
  let [ todos, setTodos ] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos);
        setLoading(false);
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title, 
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React Tutorial</h1>

        <Modal />

        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {
          loading ? 
            <Loader /> : 
              todos.length ? (
                <TodoList 
                  todos={todos} 
                  onToggle={toggleTodo} />
              ) : (
              <p>Нет задач!</p>
              )
        }
      </div>
    </Context.Provider>
  );
}

export default App;
