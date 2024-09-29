const express = require('express')
const { MongoClient, GridFSBucket} = require("mongodb");
const app = express()
const cors = require('cors')
const fs = require("fs")
require('dotenv').config()

//database 
const uri = process.env.MONGO_KEY;
const client = new MongoClient(uri);
let db
let bucket
const connect = async ()=>{
  try{
	console.log('Connecting to MongoDB Atlas cluster...');
    await client.connect();
	db = client.db('project_rhythm');
	bucket = new GridFSBucket(db);
    console.log('Successfully connected to MongoDB Atlas!');
  }	catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
  }
}
connect()

app.use(cors())
app.use(express.static('src'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/files/:fileName', async (req, res) => {
  try{
	const { fileName } = req.params;

	//check if exists
	const cursor = await bucket.find({filename : fileName}).toArray();
	if (cursor.length === 0) {
		return res.status(404).json({ error: { text: "File not found" } });
	}

	//create download stream
    bucket
      .openDownloadStreamByName(fileName)
      .pipe(res)

  }catch(error){
	console.log(error);
    res.status(400).json({error: { text: `Unable to download file`, error }});
  }
})

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
})

process.on('SIGTSTP', () => {
  console.log('SIGTSTP signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
})