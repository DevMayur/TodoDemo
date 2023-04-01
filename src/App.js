import { useEffect, useState } from "react";
import Todo from "./Todo.js";
import TodoInput from "./TodoInput.js";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(6);
    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.log(error));
    }, []);

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const totalPages = Math.ceil(todos.length / todosPerPage);

    const handlePageClick = event => {
        setCurrentPage(Number(event.target.id));
    };

    const handleDeleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleAddTodo = () => {
        if (todoInput.trim() !== "") {
            const newTodo = {
                userId: 1,
                id: todos.length + 1,
                title: todoInput,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setTodoInput("");
        }
    };

    const handleTodoInputChange = event => {
        setTodoInput(event.target.value);
    };

    const addTodo = newTodo => {
        setTodos([...todos, newTodo]);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            let pageNumberClass = i === currentPage ? "active" : "";
            if (
                i !== 1 &&
                i !== totalPages &&
                (i < currentPage - 2 || i > currentPage + 2)
            ) {
                pageNumberClass += " hide";
            }
            pageNumbers.push(
                <li
                    key={i}
                    id={i}
                    className={pageNumberClass}
                    onClick={handlePageClick}>
                    {i}
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <ul className="taskList">
                {currentTodos.map(todo => (
                    <Todo
                        key={todo.id}
                        userId={todo.userId}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onDelete={handleDeleteTodo}
                    />
                ))}
            </ul>
            <ul>
                <TodoInput
                    addTodo={addTodo}
                    value={todoInput}
                    onChange={handleTodoInputChange}
                    onSubmit={handleAddTodo}
                />
            </ul>
            <ul className="pagination">{renderPageNumbers()}</ul>
        </div>
    );
}

export default App;
