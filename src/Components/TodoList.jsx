function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            margin: "10px",
            padding: "10px",
            background: "white",
            width: "350px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "5px"
          }}
        >
          <div
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            <strong>{todo.text}</strong>
          </div>

          <small>Created: {todo.createdAt}</small><br />
          <small>Due: {todo.dueDate}</small>

          <div style={{ marginTop: "5px" }}>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;