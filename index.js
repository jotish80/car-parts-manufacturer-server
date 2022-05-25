const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const Product = require('./models/product')

const app = express();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rzqgb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(
  uri
).then((data) => {
  console.log(
    `MongoDb Database Connected ${data}`
  );
})
  .catch((err) => {
    console.log(`Some Database Connection Error Occured :- ${err}`);
  });


app.use(cors());
app.use(express.json());

app.get('/products',async (req, res)=> {

  try{
    const products = await Product.find()
    console.log(products)
    res.send(products)
  }
  catch(err){
    console.log(err)
  }

})

app.get('/products/:id', async (req, res)=> {
  try{
    const product = await Product.findById(req.params.id)
    console.log(product)
    res.send(product)
  }
  catch(err){
    console.log(err)
  }
})



app.get("/", (req, res) => res.send('Hello world'))

































// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function run(){
//     try{
//         await client.connect();
//         const partsCollection = client.db('car-parts').collection('products');

//         app.get('/products', async(req, res) =>{
//             const query = {};
//             const cursor = partsCollection.find(query);
//             const parts =  await cursor.toArray();
//             res.send(parts)
//         })
// // app.get('/item/:id', async (req, res) => {
// //             const id = req.params.id;
// //             const query = { _id: ObjectId(id) };
// //             const item = await itemsCollection.findOne(query);
// //             console.log(item)
// //             res.send(item);
// //         });



//     }
//     finally{

//     }
// }

// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})