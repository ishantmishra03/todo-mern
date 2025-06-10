import todoModel from "../models/todo.models.js";
import userModel from "../models/user.models.js"

//Add Todo functionality
export const addTodo = async (req, res) => {
    try {
        //Receive data from frontend
        const { title, description, isCompleted, priority, dueDate } = req.body;

        //Check if all fileds are present
        if (!title || !description  || !priority || !dueDate) {
            return res.json({ success: false, message: "All fields are required" });
        }

        //Finds user based on _id
        const user = await userModel.findById(req.userId);

        //Add Todo Data in backend
        const todo = await todoModel.create({
            title, description, isCompleted, priority, dueDate, user: req.userId,
        })

        //Add todo id to user model to make it identified
        user.todos.push(todo._id);
        await user.save();

        return res.json({success: true, message : "Created successfully"})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Send todo for a specific user
export const getTodo = async (req,res) => {
    try {
        const userId = req.userId;
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}