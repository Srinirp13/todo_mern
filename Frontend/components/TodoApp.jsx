import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      if (title && description) {
        await axios.post("http://localhost:5000/tasks", { title, description });
        setTitle("");
        setDescription("");
        fetchTodos(); // Refresh the list after adding a new todo
      } else {
        alert("Please enter both title and description");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const editTodo = async (id, index) => {
    try {
      const newTitle = prompt("Enter new title:", todos[index].title);
      const newDescription = prompt(
        "Enter new description:",
        todos[index].description
      );
      if (newTitle !== null && newDescription !== null) {
        await axios.put(`http://localhost:5000/tasks/${id}`, {
          title: newTitle,
          description: newDescription,
        });
        fetchTodos(); // Refresh the list after editing todo
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const deleteTodo = async (id, index) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add here todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Add here todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
        <button onClick={addTodo}>Add</button>
        </div>
        
      </div>
      {todos.map((todo, index) => (
        <div key={todo.id} className="todo-item">
          <h2>
            Title: <span>{todo.title}</span>
          </h2>
          <p>
            Description: <span>{todo.description}</span>
          </p>
          <button onClick={() => editTodo(todo.id, index)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id, index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
