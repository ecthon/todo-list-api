import express from 'express'
import bodyParse from 'body-parser'
import taskRoutes from './routes/taskRoutes'


export const app = express();
const port = 3001

app.use(bodyParse.json())
app.use('/tasks', taskRoutes)