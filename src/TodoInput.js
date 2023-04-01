import { useState } from "react";
import "./TodoItem.css";

function TodoInput({ addTodo }) {
    const [title, setTitle] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        if (title.trim()) {
            addTodo({
                title: title.trim(),
                completed: false,
            });
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new todo..."
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoInput;
