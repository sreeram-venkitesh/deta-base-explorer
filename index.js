const express = require('express')
const favicon = require('express-favicon')

const app = express()

app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/views' + '/images' + '/detalogo.png'));
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

//uncomment these lines to test locally
// const PORT = process.env.PORT || 3000

// app.listen(PORT,()=>{
//     if(PORT===3000){
//         console.log('listening to port 3000')
//     }
// })

//uncomment this line before deploying on deta
module.exports = app