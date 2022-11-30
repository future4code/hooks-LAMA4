import { app } from "./app"
import { userRouter } from "./routes/userRouter"
import { bandRouter } from "./routes/bandRouter"

//Rotas raiz
app.use('/user', userRouter)
app.use("/band", bandRouter)