const Todo = require('../Model/todoModel.js')

// task count by date toEnd
const getTaskCountsByDateToEnd = async(req, res) => {
    try{
        const todos = await Todo.find({author: req.user.id})

        const dateCounts = {}

        todos.forEach((todo)=>{
            const toEndDate = new Date(todo.toEnd);
            const year = toEndDate.getFullYear();
            const month = toEndDate.getMonth()+1;
            const day = toEndDate.getDate();

            const key = `${year}-${month}-${day}`

            if(!dateCounts[key]){
                dateCounts[key] = 0;
            }
            dateCounts[key]++;
        })
        res.status(200).json(dateCounts)


    }catch(err){
        console.error('error in getTaskCountsByDateToEnd', err)
        res.status(500).json({message:"error in getTaskCountsByDateToEnd", error: err})
    }
}



// task count by month toEnd
const getTaskCountsByMontsToEnd = async(req, res) => {
    try{
        const todos = await Todo.find({author: req.user.id })

        const monthCounts = {};

        todos.forEach((todo)=>{
            const toEndDate = new Date(todo.toEnd);
            const year = toEndDate.getFullYear();
            const month = toEndDate.getMonth()+1;

            const key = `${year}-${month}`

            if(!monthCounts[key]){
                monthCounts[key] = 0;
            }
            monthCounts[key]++
        })
        res.status(200).json(monthCounts)
    }catch(err){
        console.log('error in getTaskCountsByMontsToEnd', err)
        res.status(500).json({message: 'error in getTaskCountsByMontsToEnd', error: err})
    }
}



// task count by year toEnd
const getTaskCountsByYearsToEnd = async(req, res) => {
    try{
        const todos = await Todo.find({author: req.user.id })

        const yearCounts = {};

        todos.forEach((todo)=>{
            const toEndDate = new Date(todo.toEnd);
            const year = toEndDate.getFullYear();

           

            if(!yearCounts[year]){
                yearCounts[year] = 0;
            }
            yearCounts[year]++
        })
        res.status(200).json(yearCounts)
    }catch(err){
        console.log('error in getTaskCountsByYearToEnd', err)
        res.status(500).json({message: 'error in getTaskCountsByYearToEnd', error: err})
    }
}






// task count by date toStart
const getTaskCountsByDateToStart = async (req, res) => {
    try {
      const todos = await Todo.find({ author: req.user.id }); // Fetch all todos for the logged-in user
  
      const dayCounts = {};
  
      todos.forEach((todo) => {
        const toStartDate = new Date(todo.toStart); // Convert to Date object
        const year = toStartDate.getFullYear();
        const month = toStartDate.getMonth() + 1; // getMonth() returns 0-11
        const day = toStartDate.getDate();
  
        const key = `${year}-${month}-${day}`; // Create a unique key for year-month-day
  
        if (!dayCounts[key]) {
          dayCounts[key] = 0;
        }
  
        dayCounts[key]++;
      });
  
      res.status(200).json(dayCounts);
    } catch (err) {
      console.error('Error in getTaskCountsByDayToStart:', err);
      res.status(500).json({ message: 'Error in getting task counts by day', error: err });
    }
  };
  







// task count by month toStart
const getTaskCountsByMonthToStart = async (req, res) => {
    try {
      const todos = await Todo.find({ author: req.user.id }); // Fetch all todos for the logged-in user
  
      const monthCounts = {};
  
      todos.forEach((todo) => {
        const toStartDate = new Date(todo.toStart); // Convert to Date object
        const year = toStartDate.getFullYear();
        const month = toStartDate.getMonth() + 1; // getMonth() returns 0-11
  
        const key = `${year}-${month}`; // Create a unique key for year-month
  
        if (!monthCounts[key]) {
          monthCounts[key] = 0;
        }
  
        monthCounts[key]++;
      });
  
      res.status(200).json(monthCounts);
    } catch (err) {
      console.error('Error in getTaskCountsByMonthToStart:', err);
      res.status(500).json({ message: 'Error in getting task counts by month', error: err });
    }
  };
  







// task count by year toStart
const getTaskCountsByYearToStart = async (req, res) => {
    try {
      const todos = await Todo.find({ author: req.user.id }); // Fetch all todos for the logged-in user
  
      const yearCounts = {};
  
      todos.forEach((todo) => {
        const toStartDate = new Date(todo.toStart); // Convert to Date object
        const year = toStartDate.getFullYear(); // Extract year
  
        if (!yearCounts[year]) {
          yearCounts[year] = 0;
        }
  
        yearCounts[year]++;
      });
  
      res.status(200).json(yearCounts);
    } catch (err) {
      console.error('Error in getTaskCountsByYearToStart:', err);
      res.status(500).json({ message: 'Error in getting task counts by year', error: err });
    }
  };
  





module.exports = { 
    getTaskCountsByDateToEnd,
    getTaskCountsByYearsToEnd, 
    getTaskCountsByMontsToEnd,
    getTaskCountsByDateToStart,
    getTaskCountsByMonthToStart,
    getTaskCountsByYearToStart
};