import { completeTask } from "./handlers/complete-task.js";
import { createTask } from "./handlers/create-task.js";
import { deleteTask } from "./handlers/delete-task.js";
import { findTasks } from "./handlers/find-tasks.js";
import { importTasks } from "./handlers/import-tasks.js";
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
    handler: importTasks
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