import express from 'express'
import bodyParse from 'body-parser'
import taskRoutes from './routes/taskRoutes'


const app = express()

app.use(bodyParse.json())
app.use('/tasks', taskRoutes)

export default app