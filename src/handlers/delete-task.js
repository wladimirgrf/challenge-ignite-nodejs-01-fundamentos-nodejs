import { database } from "../database.js";

export const deleteTask = (req, res) => {
  const { id } = req.params;

  database.delete('tasks', id)

  return res.writeHead(204).end()
}
