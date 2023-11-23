import { app } from "./app"

const port = process.env.PORT || 3001

app.listen(port, ()=> {
    console.log(`🎉 Running! | Server is running on http://localhost:${port}.`)
})