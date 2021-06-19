const express = require('express')
const app = express()
const port = 4000

const { User } = require("./models/User")
const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(express.urlencoded({exteded: true}));
//application/json
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect( config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello world! This is my place!'))

app.post('/register', (req, res) => {
    //회원가입시 필요한 정보들을 client에서 가져오고 MongoDB에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ 
            success: false, err
        })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
