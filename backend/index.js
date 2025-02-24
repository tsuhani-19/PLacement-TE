const express=require('express' )
const app=express()
const mongoose=require('mongoose');
const cors=require('cors')
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');


require('dotenv').config()
const port=process.env.PORT || 5001;
app.use(express.json({limit:"25mb"}));
app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


const authRoutes=require('./src/users/user.route');
app.use('/api/auth',authRoutes)


main().then(()=>console.log("mongodb is successfully connected")).catch(err => console.log(err));
async  function main(){
    await mongoose.connect(process.env.DB_URL);

}

app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
