import { database } from "../database.js";

export const completeTask = (req, res) => {
  const { id } = req.params;

  database.update('tasks', id, {
    completed_at: new Date(),
    updated_at: new Date()
  })

  return res.writeHead(204).end()
}

