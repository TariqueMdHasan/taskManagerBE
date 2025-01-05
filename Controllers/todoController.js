const Todo = require('../Model/todoModel.js')


// Get Todos (Only the user's own todos) - **Change**
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ author: req.user.id }); // **Fetch todos of the logged-in user**
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err });
  }
};

// Add a new Todo - Automatically assign author - **Change**
const addTodo = async (req, res) => {
  const { title, description, date, priority, status } = req.body;

  try {
    const newTodo = new Todo({
      title,
    //   description: description.map(subTodo => ({
    //     text: subTodo.text,
    //     isCompleted: subTodo.isCompleted || false,
    //   })),
      description,
      date,
      priority,
      status: status || 'done',
      author: req.user.id 
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('error in addTodo', error)
    res.status(500).json({ message: 'Error adding todo' });
  }
};

// Update a Todo (Only if it belongs to the user) - **Change**
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, priority, status } = req.body;

  try {
    const todo = await Todo.findOne({ _id: id, author: req.user.id }); // **Ensure user owns the todo**
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }

    // Update the todo
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.date = date || todo.date;
    todo.priority = priority || todo.priority;
    todo.status = status || todo.status;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err });
  }
};

// Delete a Todo (Only if it belongs to the user) - **Change**
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, author: req.user.id }); // **Ensure user owns the todo**
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err });
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
