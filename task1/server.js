const express = require('express')
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.send(' your port is running on port 8080')
})

const userRouter = require('../routes/user')
app.use('/users', userRouter)



app.listen(8080, () => {
    console.log('http://localhost:8080')
})
