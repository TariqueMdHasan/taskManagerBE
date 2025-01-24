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
  const { title, description, toStart, toEnd, priority, status } = req.body;

  try {
    const newTodo = new Todo({
      title,
      description: description.map(subTodo => ({
        text: subTodo.text,
        isCompleted: subTodo.isCompleted || false,
      })),
      // description,
      toStart,
      toEnd,
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
  const { title, description, toStart, toEnd, priority, status } = req.body;

  try {
    const todo = await Todo.findOne({ _id: id, author: req.user.id }); // **Ensure user owns the todo**
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }

    // Update the todo
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.toStart = toStart || todo.toStart;
    todo.toEnd = toEnd || todo.toEnd;
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


// to get total status counts
const getStatusCounts = async(req, res) => {
  try{
    const todos = await Todo.find({author: req.user.id}); //fetching all todos of the user

    // initialize the counts
    const statusCounts = {
      Personal: 0,
      Work: 0,
      Family: 0,
      General: 0,
    }

    todos.forEach((todo)=>{
      if(statusCounts[todo.status] !== undefined){
        statusCounts[todo.status]++
      }
    })

    res.status(200).json(statusCounts)

  }catch(err){
    console.error('something error in getting status count', err)
    res.status(500).json({message: 'Error fetching status counts', error: err})
  }
}



// now getting priority count
const getPriorityCounts = async(req, res) => {
  try{
    const todos = await Todo.find({author: req.user.id})

    const priorityCounts = {
      High: 0,
      Low: 0,
      Moderate: 0,
    }

    todos.forEach((todo)=>{
      if(priorityCounts[todo.priority] !== undefined){
        priorityCounts[todo.priority]++
      }
    })
    res.status(200).json(priorityCounts)

  }catch(err){
    console.error('error in priority count'. err)
    res.status(500).json({message:'Error in priority count', error: err})
  }
}



module.exports = { getTodos, addTodo, updateTodo, deleteTodo, getStatusCounts, getPriorityCounts };
