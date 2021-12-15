import express from "express";
import mongoose  from "mongoose";
import Message from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1317280",
    key: "22e32c7c8f14cc9f626d",
    secret: "a4a48680c1425571e8ed",
    cluster: "us2",
    useTLS: true
});

app.use(express.json());
app.use(cors());

const connection_url = 'mongodb+srv://admin:KS0To4uuxgaIT55y@cluster0.vs8tt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url);

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering pusher");
        }
    });
});

app.get('/', (req, res)=>res.status(200).send('hello'));

app.get('/messages/sync', (req, res) => {
    Message.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }       
    })
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Message.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.listen(port, ()=>console.log(`Listening on locahost:${port}`));