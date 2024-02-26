
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const connectDB = require("./utils/db");
const Stripe = require('stripe');
const { default: toast } = require("react-hot-toast");
const Order = require("./model/order");


const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}))
connectDB();

const helmet = require("helmet");

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // other directives...
      "font-src": ["'self'", "https://fonts.gstatic.com"],
    },
  })
);

const PORT = process.env.PORT || 8080

// User Schema
const userschema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true, },
    password: String,
    confirmpassword: String,
    image: String
})

//User Model
const usermodel = mongoose.model("user", userschema)
app.get("/", (req,resp)=>{
    resp.send("server is running..!")
})

//Fetching user's data from Database

app.get('/users', async(req,res)=>{
    try {
        const user = await usermodel.find({})
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// Delete User API
app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await usermodel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: `Cannot find any user with ID ${id}` });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/signup", async(req,resp)=>{
    // console.log(req.body)
    const {email} = req.body

    try {
        const result = await usermodel.findOne({ email:email });
        // console.log(result)
        if(result){
            resp.send({message : "This email ID is already registered..!", alert : false})
         }else{
            const data = usermodel(req.body)
            const save = data.save()
            resp.send({message : "Successfully signed up..!",  alert : true})
         }
     } catch (err) {
       console.log(err)
     }    
})

// API Login
app.post("/login", async(req,res) => {
    // console.log(req.body);
    const {email, password} = req.body;

    try {
        const result = await usermodel.findOne({ email:email, password : password });
        
        if(result){
            const datasend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            console.log(datasend)
            res.send({message : "Logged In Successfully", alert : true,data : datasend})
         }else{
            res.send({message : "Please Enter Valid Credentials", alert : false})
         }
     } catch (err) {
       console.log(err)
     }  
})

// Vendor Schema
const vendorschema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true, },
    password: String,
    confirmpassword: String,
    image: String
})
//Vendor Model
const vendormodel = mongoose.model("vendor", vendorschema)

//Fetching vendor's data from Database

app.get('/vendors', async(req,res)=>{
    try {
        const vendor = await vendormodel.find({})
        res.status(200).json(vendor);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// Delete Vendor API
app.delete("/deleteVendor/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await vendormodel.findByIdAndDelete(id);
        if (!deletedVendor) {
            return res.status(404).json({ message: `Cannot find any user with ID ${id}` });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Posting Signup data to the Database
app.post("/vsignup", async(req,resp)=>{
    // console.log(req.body)
    const {email} = req.body

    try {
        const result = await vendormodel.findOne({ email:email });
        // console.log(result)
        if(result){
            resp.send({message : "This email ID is already registered..!", alert : false})
         }else{
            const data = vendormodel(req.body)
            const save = data.save()
            resp.send({message : "Successfully signed up..!",  alert : true})
         }
     } catch (err) {
       console.log(err)
     }    
})

// API Login
app.post("/vlogin", async(req,res) => {
    // console.log(req.body);
    const {email, password} = req.body;

    try {
        const result = await vendormodel.findOne({ email:email, password : password });
        
        if(result){
            const datasend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            console.log(datasend)
            res.send({message : "Logged In Successfully", alert : true,data : datasend})
         }else{
            res.send({message : "Please Enter Valid Credentials", alert : false})
         }
     } catch (err) {
       console.log(err)
     }  
})

// Product Section
const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    qty : String,
    price : String,
    description : String
})

const productModel = mongoose.model("product", schemaProduct)

// Save product in database
// API
app.post("/uploadProduct", async(req, res) => {
    // console.log(req.body)
    // const data = await productModel(req.body)
    const data = new productModel(req.body)
    const datasave = await data.save()
    res.send({message: "Product uploaded successfully"})
})

// Fetch Product Details from DB
// API

app.get("/product", async(req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// update Product API
app.put("/updateProduct/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Product API
app.delete("/deleteProduct/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Orders of MongoDB
app.get("/orders", async(req, res) => {
    const data = await Order.find({})
    res.send(JSON.stringify(data))
})

// Payment Gateway
console.log(process.env.STRIPE_SECRET_KEY)


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout-payment-session", async(req, res) => {

    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "KE", "IN"]
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "inr",
                        },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "inr",
                        },
                        display_name: "Next day air",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: parseInt(item.price * 100)
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: parseInt(item.qty)
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params)

        const newOrder = new Order({
            items: req.body.map((item) => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.qty,
            })),
            totalAmount: req.body.reduce((acc, item) => acc + (parseFloat(item.price) * item.qty), 0).toString(),
            shippingAddress: req.body.shippingAddress,
        });

        // Save the order to MongoDB
        const savedOrder = await newOrder.save();

        res.status(200).json(session.id);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
});

// Contact Query Schema Model
const queryschema = mongoose.Schema({
    name:String,
    email: {
        type: String,
        unique: true, },
    message: String,
})
//Query Model
const querymodel = mongoose.model("query", queryschema)

//Fetching Queries from Database

app.get('/queries', async(req,res)=>{
    try {
        const query = await querymodel.find({})
        res.status(200).json(query);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})


// Posting a Query from the Contact to the database.
app.post("/queries", async(req,resp)=>{
    // console.log(req.body)
    const {email} = req.body

    try {
        const result = await querymodel.findOne({ email:email });
        // console.log(result)
        if(result){
            resp.send({message : "This Request has been already Submitted, We will get back to you soon..!", alert : false})
         }else{
            const data = querymodel(req.body)
            const save = data.save()
            resp.send({message : "Response has been submitted sucessfully..!",  alert : true})
         }
     } catch (err) {
       console.log(err)
     }    
})



app.listen(PORT, ()=>console.log("server is running at port: " + PORT))