const addTodo = (text, dueDate) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
    dueDate: dueDate || "No due date"
  };

  setTodos([...todos, newTodo]);
};