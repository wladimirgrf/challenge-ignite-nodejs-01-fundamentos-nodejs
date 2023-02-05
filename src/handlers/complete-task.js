import { database } from "../database.js";

export const completeTask = (req, res) => {
  const { id } = req.params;

  const taskFound = database.select('tasks', { id });

  if(!taskFound || taskFound.length === 0) {
    return res.writeHead(400).end(JSON.stringify({
      message: "Task not found!"
    }));
  }

  database.update('tasks', id, {
    completed_at: new Date(),
    updated_at: new Date()
  })

  return res.writeHead(204).end()
}

