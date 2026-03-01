import toDo from "../models/toDo.js";

export const create=async(req,res)=>{
    try{
         const newtask=new toDo(req.body);
         const {task}=newtask;
         const taskExist=await toDo.findOne({task});
         if(taskExist){
            return res.status(404).json({message:"task exist"})
         }
         const savedtask=await newtask.save();
         res.status(200).json(savedtask);
    }catch(error){
        res.status(500).json({errorMessage:error.Message});
    }
}

export const allTasks=async(req,res)=>{
    try{
        const taskData=await toDo.find();
        if(!taskData || taskData.length===0){
            return res.status(404).json({errorMessage:"task not found"});
        }
        res.status(200).json({taskData});

    }catch(error){
        res.status(500).json({errorMessage:error.message});
    }
}

export const updateTask=async(req,res)=>{
    try{
        const id=req.params.id;
        const taskExist=await toDo.findById(id);
        if(!taskExist){
            return res.status(404).json({errorMessage:"task not found"});
        }
        const updatedTask=await toDo.findByIdAndUpdate(id,req.body,{new:true,});
        res.status(200).json({updatedTask});

    }catch(error){
        res.status(500).json({errorMessage:error.message});
    }
}

export const deleteTask=async(req,res)=>{
    try{
        const id= req.params.id;
        const taskExist=await toDo.findById(id);
        if(!taskExist){
            return res.status(404).json({errorMessage:"task not found"});
        }
        const deletedtask= await toDo.findByIdAndDelete(id);
        res.status(200).json({deletedtask});

    }catch(error){
        res.status(500).json({errorMessage:error.message});
    }
}