import express from  'express'

import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController'

const router = express.Router()

router.get('/', getTasks)
router.post('/newtask', createTask)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

export default router