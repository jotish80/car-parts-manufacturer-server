const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const Product = require('./models/product')
const Review = require('./models/review')
const Order = require('./models/order')
const Admin = require('./models/admin')

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


//GET get all products
app.get('/products', async (req, res) => {

  try {
    const products = await Product.find()
    console.log(products)
    res.send(products)
  }
  catch (err) {
    console.log(err)
  }

})

// GET get single product by id
app.get('/products/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const product = await Product.findById(req.params.id)
    console.log(product)
    res.send(product)
  }
  catch (err) {
    console.log(err)
  }
})

// POST add single review
app.post('/review', async (req, res) => {
  console.log(req.body);
  const { name, rating, description } = req.body;
  try {
    const newReview = Review.create({ name, rating, description });
    const result = await newReview.save();
    console.log(newReview)
    res.send(newReview);
  }
  catch (err) {
    res.send(err);
  }

});

app.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find()
    res.send(reviews);
  }
  catch (err) {
    res.send(err)
  }
})

app.post('/order', async (req, res) => {
  const { productId, quantity, email, phone, address } = req.body
  console.log(req.body)
  try {
    const newOrder = new Order({ productId, quantity, email, phone, address })
    const result = await newOrder.save()
    res.send(result)
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})


// Get logged user orders
app.get('/order/:email', async (req, res) => {
  const { email } = req.params
  try {
    const order = await Order.find({email}).populate('productId')
   
    res.send(order)
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

app.patch('/product/updateQuantity', async (req, res) => {
  const { id, quantity } = req.body

  try {
    const updatedQuantityProduct = await Product.findById(id)
    updatedQuantityProduct.availableQuantity = quantity
    updatedQuantityProduct.save()
    res.send(updatedQuantityProduct)
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}
)

app.post('/makeAdmin',async (req, res)=> {

  try{
    const newAdmin =  Admin.create({email: req.body.email})
    const result = await newAdmin.save()
    res.send(result)
  }
  catch(err){
    res.send(err)
    
  }
})
app.post('/isAdmin',async (req, res)=> {

  try{
    const newAdmin =  Admin.findOne({email: req.body.email})
    res.send(newAdmin.email && {isAdmin: true})
  }
  catch(err){
    res.send(err)
  }
})


//DELETE logged users items delete
// app.delete('/orders/:id/:email', async (req, res) => {
//     const id = req.params.id;
//     const email = req.params.email;
//     const query = { _id: ObjectId(id) };
//     const result = await itemsCollection.deleteOne(query);
//     const items = await itemsCollection.find({email});
//     console.log(result)

//     res.send(items);

// })

// app.patch('/updatequantity/:id', async (req, res) => {
//   const id = req.params.id;
//   Product.findOne({ _id: ObjectId(id) }).then(result => {
//     Product.updateOne(
//       { _id: ObjectId(id) },

//       {
//         $set: {
//           quantity: Number(result.quantity) + Number(req.body.number)
//         },
//       }
//     ).then(result => {
//       console.log(result)
//       res.send(result)
//     })
//   })
// })





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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})