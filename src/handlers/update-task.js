import { database } from "../database.js";

export const updateTask = (req, res) => {
  const { id } = req.params;

  const { title, description } = req.body;

  if (!title || !description) {
    return res.writeHead(400).end(JSON.stringify({
      message: "Missing parameters!"
    }))
  };

  const taskFound = database.select('tasks', { id });

  if(!taskFound || taskFound.length === 0) {
    return res.writeHead(400).end(JSON.stringify({
      message: "Task not found!"
    }));
  }

  database.update('tasks', id, {
    title,
    description,
    updated_at: new Date()
  })

  return res.writeHead(204).end()
}