const express   = require('express');
const app       = express();
const mongoose   = require('mongoose');
const cors          = require('cors')
const bodyParser    = require('body-parser')
const Task          = require('./models/Task')

app.use(bodyParser.json())
app.use(cors());
app.use(express.urlencoded({extended: true}));

// ***************** TASKS ***************
// Add item
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    
    task.save()
        .then(result => {
            console.log('task added', task)
            res.send('Task added')
        })
        .catch(error => console.log(error))
})

// Get all items
app.get('/tasks', async (req, res) => {
    Task.find()
        .then(data => {
            res.json(data)
            
        })
        .catch(error => console.log(error))
})

app.get('/', (req, res) => {
    res.redirect('/tasks')
}) 

//Get specific item
app.get('/tasks/:taskId', async (req, res) => {
    // console.log(req.params.itemId)
    Task.findById(req.params.taskId)
        .then(data => res.json(data))
        .catch(error => console.log(error))
})

// Delete specific item
app.delete('/tasks/:taskId', async (req, res) => {
    Item.deleteOne({_id: req.params.taskId})
        .then(data => {
            console.log('Item deleted')
            res.json(data)
        })
        .catch(error => console.log(data))
})

// Update specific item
app.patch('/tasks/:taskId', async (req, res) => {
    Item.updateOne({_id : req.params.taskId}, 
        {$set: { 
            img_link: req.body.img_link,
            prize: req.body.prize,
            bio: req.body.bio,
            new: req.body.new,
            bestseller: req.body.bestsellers
        }
        })
        .then(data => {
            console.log('Task patched')
            res.json(data)
        })
        .catch(error => console.log(error))
})



mongoose.connect(
    'mongodb+srv://user:1234@cluster0.i297s.mongodb.net/toDoList?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
)


// How do we start listeneing to the server
app.listen(5000, () => {
    console.log('Listening to port 5000')
}) // the port to listen to