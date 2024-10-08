const app=require('./app')
const port = 3000

app.get('/', (req, res) => {
    res.send('Welcome to DevConnect')
})

app.listen(port, () => {
    console.log(`Express server running on port: ${port}`)
})