import express, { response } from 'express'
import { PrismaClient } from '@prisma/client';
import { request } from 'http';
import { title } from 'process';

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

app.put('/task/:id', async (request, response) => {
    const { id } = request.params;
    const { title } = request.body; // Obtenha o novo título da solicitação do cliente

    // Verifique se o título foi fornecido
    if (!title) {
        return response.status(400).json({ error: 'O novo título da tarefa não foi fornecido.' });
    }

    try {
        const updatedTaskTitle = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                title: title // Atualize o título da tarefa com o novo título
            }
        });
        response.json(updatedTaskTitle);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Ocorreu um erro ao atualizar a tarefa.' });
    }
});

app.delete('/task/:id', async (request, response) => {
    const { id } = request.params
    const task = await prisma.task.delete({
        where: {
            "id": Number(id)
        }
    })
    response.json(task)
})

const server = app.listen( 3001, () => 
console.log(`🚀 Server ready at: http://localhost:3001`)
)