import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//App config
const app = express()
//backend will start on port 4000
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())


// API endpoints
app.get('/',(req,res)=>{
    res.send("my API is working!")
})

app.listen(port, ()=> console.log('Server has started on PORT: ' + port)
)

