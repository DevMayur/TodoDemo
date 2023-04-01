import React, { Component } from "react";
import "./TodoItem.css";

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            title: props.title,
        };
    }

    handleEditClick = () => {
        this.setState({ isEditing: true });
    };

    handleCancelClick = () => {
        this.setState({ isEditing: false, title: this.props.title });
    };

    handleUpdateClick = () => {
        this.setState({ isEditing: false });
        // You can call a function here to update the title on the server-side.
    };

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    };

    handleDeleteClick = () => {
        const { id, onDelete } = this.props;

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(() => onDelete(id))
            .catch(error => console.log(error));
    };

    render() {
        const { userId, id, completed } = this.props;

        let titleElement = (
            <h3 className="title" onClick={this.handleEditClick}>
                {this.state.title}
            </h3>
        );

        if (this.state.isEditing) {
            titleElement = (
                <div>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        className="titleInput"
                    />
                    <button
                        className="buttonInput"
                        onClick={this.handleUpdateClick}>
                        Update
                    </button>
                    <button
                        className="buttonInput"
                        onClick={this.handleCancelClick}>
                        Cancel
                    </button>
                </div>
            );
        }

        return (
            <div>
                <div className="todoItem">
                    {titleElement}
                    <div className="icons">
                        <i
                            className="icon fa-solid fa-pen-to-square"
                            onClick={this.handleEditClick}></i>
                        <i
                            className="icon fa-regular fa-rectangle-xmark"
                            onClick={this.handleDeleteClick}></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
