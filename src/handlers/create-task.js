import { randomUUID } from 'node:crypto';
import { database } from "../database.js";

export const createTask = (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.writeHead(400).end(JSON.stringify({
      message: "Missing parameters!"
    }))
  }

  const tasks = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date()
  }

  database.insert('tasks', tasks)

  return res.writeHead(201).end()
}
