import todoModel from "../models/todo.models.js";
import userModel from "../models/user.models.js"

//Add Todo functionality
export const addTodo = async (req, res) => {
    try {
        //Receive data from frontend
        const { title, description, isCompleted, priority, dueDate } = req.body;

        //Check if all fileds are present
        if (!title || !description || !priority || !dueDate) {
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

        return res.json({ success: true, message: "Created successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Send todo for a specific user
export const getTodo = async (req, res) => {
    try {
        //Get user from protected route
        const user = req.userId;

        //Finding todos related with specific user
        const todos = await todoModel.find({ user });

        if (!todos || todos.length === 0) {
            return res.json({ success: false, message: "No Todos found" });
        }

        res.json({ success: true, todos });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Get todo matching with specific id
export const getOneTodo = async (req,res) => {
    try {
        //Get todoId fron frontedn
        const { id } = req.body;

        //Get todo from DB
        const todo = await todoModel.findById(id);
        if(!todo){
            return res.json({success: false, message : "No Todo Found"})
        }

        return res.json({success: true, todo});
    } catch (error) {
        return res.json({success: false, message : error.message});
    }
}

//API to mark todo as completed or inCompleted
export const toggleIsCompleted = async (req, res) => {
    try {
        //Get todoId from frontend
        const { todoId } = req.body;

        //Fing todo By Id
        const todo = await todoModel.findById(todoId);

        //Tooggle isCompleted
        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        res.json({ success: true, message: "Updated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Delete Todo functionality
export const deleteTodo = async (req, res) => {
    try {
        //Get TodoID from frontend
        const { todoId } = req.body;

        //Find todo with _id === todoId and delete
        const todo = await todoModel.findByIdAndDelete(todoId);
        if (!todo) {
            return res.json({ success: false, message: "No Todo found" });
        }

        return res.json({ success: true, message: "Todo Deleted" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Change priority
export const changePriority = async (req,res) => {
    try {
        //Get TodoID from frontend
        const { todoId, newPriority } = req.body;

        //Find todo with _id === todoId and delete
        const todo = await todoModel.findById(todoId);
        if (!todo) {
            return res.json({ success: false, message: "No Todo found" });
        }

        todo.priority = newPriority;
        await todo.save();

        return res.json({ success: true, message: "Updated" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}