import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";

import multer from "multer";
import { type } from "os";

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Link
// mongodb+srv://PBDeCommerce:<password>@cluster0.mjcfasy.mongodb.net/
//--------------------------------------------------------------------------------------------
mongoose.connect(
  "mongodb+srv://PBDeCommerce:platformbaseddevelopment@cluster0.mjcfasy.mongodb.net/e-commerce"
);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Store Images Algorithm
//--------------------------------------------------------------------------------------------

const imageStorage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: imageStorage });

app.use("/images", express.static("uploads/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// MongoDB Schema
//--------------------------------------------------------------------------------------------
// Adding Products
const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: false,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;

  if (products.length > 0) {
    let lastProductArray = products.slice(-1);
    let lastProduct = lastProductArray[0];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  res.json({
    success: 1,
    name: req.body.name,
    message: "Product Added Successfully",
  });
});
// --------------------------------------------------------------------------------------------
// Removing Products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
    message: "Product Removed Successfully",
  });
});

// --------------------------------------------------------------------------------------------
// Getting Products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched Successfully");
  res.json(products);
});

// --------------------------------------------------------------------------------------------
// Creating Users

const users = mongoose.model("users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

app.post("/signup", async (req, res) => {
  let check = await users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, message: "Email already used" });
  }
  let cart = {};
  for (let i = 0; i < 3000; i++) {
    cart[i] = 0;
  }
  const user = new users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: users.id,
    },
  };

  const token = jwt.sign(data, "secret");
  res.json({ success: true, token });
});

// --------------------------------------------------------------------------------------------
// Login Users
app.post("/login", async (req, res) => {
  let user = await users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email, Create an account instead",
    });
  }
  if (user) {
    const comparePassword = req.body.password === user.password;
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    } else {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret");
      res.json({ success: true, token });
    }
  }
});

// --------------------------------------------------------------------------------------------
// newCollections

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollections = products.slice(1).slice(-8);
  console.log("New Collections Fetched Successfully");
  res.json(newcollections);
});

// --------------------------------------------------------------------------------------------
// popular

app.get("/popular", async (req, res) => {
  let products = await Product.find({});
  let popular = products.slice(0, 4);
  console.log("Popular Products Fetched Successfully");
  res.json(popular);
});

// --------------------------------------------------------------------------------------------
// fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, errors: "Please Login" });
  } else {
    try {
      const verified = jwt.verify(token, "secret");
      req.user = verified.user;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Login or Create an account" });
    }
  }
};

// --------------------------------------------------------------------------------------------
// Add to Cart

app.post("/addtocart", fetchUser, async (req, res) => {
  let user = await users.findOne({ _id: req.user.id });
  user.cartData[req.body.itemId] += 1;
  await users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: user.cartData }
  );
  res.send("Item Added to Cart");
  console.log("Item Added to Cart");
});

// --------------------------------------------------------------------------------------------
// Remove from Cart

app.post("/removefromcart", fetchUser, async (req, res) => {
  let user = await users.findOne({ _id: req.user.id });
  if (user.cartData[req.body.itemId] > 0) user.cartData[req.body.itemId] -= 1;
  await users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: user.cartData }
  );
  res.send("Item Removed from Cart");
  console.log("Item Removed from Cart");
});

// --------------------------------------------------------------------------------------------
// get user cart
app.post("/getcart", fetchUser, async (req, res) => {
  let user = await users.findOne({ _id: req.user.id });
  res.json(user.cartData);
});

// --------------------------------------------------------------------------------------------
// listen to port
app.listen(port, (error) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
