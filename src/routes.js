import { completeTask } from "./handlers/complete-task.js";
import { createTask } from "./handlers/create-task.js";
import { deleteTask } from "./handlers/delete-task.js";
import { findTasks } from "./handlers/find-tasks.js";
import { updateTask } from "./handlers/update-task.js";
import { buildRoutePath } from './utils/build-route-path.js';


export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: findTasks
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: createTask
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/csv'),
    handler:  (req, res) => {
      // const { title, description } = req.body

      // if(!title || !description) {
      //   return res.writeHead(400).end(JSON.stringify({
      //     message: "Missing parameters!"
      //   }))
      // }

      const buffers = []

      req.on('data', function (chunk) {
        console.log(chunk)
      });

      // const tasks = {
      //   id: randomUUID(),
      //   title,
      //   description,
      //   completed_at: null,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // }

      // database.insert('tasks', tasks)

      return res.writeHead(203).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: deleteTask
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: updateTask
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: completeTask
  }
]