const mongoose = require('mongoose');
require('dotenv').config();
const collection=process.env.collection;
const Schema = new mongoose.Schema({
  username: { type: String },
  password:String,
});

const model=mongoose.model('users',Schema);
async function connect()
{      await mongoose.connect(`mongodb://127.0.0.1:27017/${collection}`);
  console.log('mongo db conneced Connected!');
}


module.exports={model,connect};

