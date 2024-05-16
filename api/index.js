const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok running successfully' });
});

const Transaction = require('./models/transaction');

app.post('/api/transaction', async(req, res) => {
    // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,date,price}=req.body;
    const transaction=await Transaction.create({name,description,date,price});
    res.json(transaction);
});

app.get('/api/transactions', async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions= await Transaction.find();
    res.json(transactions);
})

app.listen(4000);
