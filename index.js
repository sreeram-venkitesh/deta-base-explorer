const express = require('express')

const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res)=>{
    res.render('dashboard')
})

const PORT = 3000

if(!process.env.DETA_RUNTIME){
    app.listen(PORT,()=>{
        console.log('Listening to local port')
    })
}
// export 'app'
module.exports = app