import express, { response } from 'express'
import { PrismaClient } from '@prisma/client';
import { request } from 'http';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// async function main() {
//     const task =await prisma.task.create({
//         data: {
//             title: 'New task test',
//             completed: false
//         }
//     })
//     console.log(task)
// }

// main()
//     .then(async() => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.log(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

app.get('/', async(request, response) => {
    const tasks = await prisma.task.findMany()
    return response.json(tasks);    
})

app.post('/newtask', async (request, response) => {
    const { title } = request.body;

    if (!title) {
        return response.status(400).json({ error: 'O campo "title" é obrigatório.' });
    }

    try {
        const task = await prisma.task.create({
            data: {
                title,
                completed: false
            }
        });

        response.json(task);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao criar uma nova tarefa.' });
    }
});


const server = app.listen( 3000, () => 
console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)