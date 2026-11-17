import express from 'express';import cors from 'cors';import 'dotenv/config';
import books from './routes/books.js';import users from './routes/users.js';import transactions from './routes/transactions.js';
const app=express();app.use(cors({origin:'http://localhost:5173'}));app.use(express.json());
app.get('/api/health',(_req,res)=>res.json({status:'ok',message:'Library API is running'}));
app.use('/api/books',books);app.use('/api/users',users);app.use('/api/transactions',transactions);
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({message:'Unexpected server error'});});
const port=process.env.PORT||5000;app.listen(port,()=>console.log(`Library API running at http://localhost:${port}`));
