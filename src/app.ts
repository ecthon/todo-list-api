import express from 'express'

const app = express();
const port = 3001

app.listen(port, ()=> {
    console.log(`🎉 Running! | Server is running on http://localhost:${port}.`)
})