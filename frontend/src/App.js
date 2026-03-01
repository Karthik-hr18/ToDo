import { useEffect, useState } from "react";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "./services/api";
import "./App.css"
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await getAllTasks();
    setTasks(res.data.taskData);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (!task) return;

    if (editId) {
      await updateTask(editId, { task });
      setEditId(null);
    } else {
      await createTask({ task });
    }

    setTask("");
    fetchTasks();
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setTask(text);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };
  const toggleStatus = async (id, currentStatus) => {
  await updateTask(id, { status: !currentStatus });
  fetchTasks();
};


  return (
    <div >
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>
     <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Task</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr >
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td
                style={{
    textDecoration: task.status ? "line-through" : "none",
    color: task.status ? "gray" : "black",
  }}
                >{task.task}</td>
                <td>{task.createdAt}</td>
                <td>{task.updatedAt}</td>
               <td>
  <input
    type="checkbox"
    checked={task.status}
    onChange={() => toggleStatus(task._id, task.status)}
  />
  {task.status ? " Completed" : " Pending"}
</td>

                <td className="actionButtons">
                 
                   <button
                    onClick={() => handleEdit(task._id,task.task)}
                    type="button"
                    className="btn btn-info"
                  >
                   <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    type="button"
                    class="btn btn-danger"
                    disabled={task.status}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
