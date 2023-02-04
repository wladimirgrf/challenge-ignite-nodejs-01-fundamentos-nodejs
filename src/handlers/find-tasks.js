import { database } from "../database.js";

export const findTasks = (req, res) => {
  const { search } = req.query

  const tasks = database.select('tasks', {
    title: search,
    description: search
  })

  return res.end(JSON.stringify(tasks))
}

