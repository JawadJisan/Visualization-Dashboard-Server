const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')

require('dotenv').config()

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.sxsq1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const data = client.db("Database").collection("Data");


        app.get('/info', async(req, res)=>{
            const info = await data.find().toArray();
            res.send(info);
        })

        app.get('/abc', (req, res) => {
            res.send("MongoDb Connected!!")
        })

    }
    finally {

    }

}
run().catch(console.dir);


app.get('/members', (req, res) => {
    res.send("All Members")
})
app.get('/', (req, res) => {
    res.send('Hello New Worlds!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})