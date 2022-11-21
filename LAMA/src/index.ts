import { app } from "./app"
import { userRouter } from "./routes/userRouter"

//Rotas raiz
app.use('/user', userRouter)