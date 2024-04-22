const express = require('express');
const mongodb = require('mongodb');
const uri = "mongodb+srv://mathwizdavid:B5nlgLN7DEd910Mw@davidscluster.u4hxzhs.mongodb.net/?retryWrites=true&w=majority&appName=DavidsCluster";

const router = express.Router();

// get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
} );

//add posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//delete posts
router.delete('/:id', async (req , res) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(uri);

    return client.db('vue_express').collection('posts');
}

//mongodb+srv://dek90:<password>@cluster0.luya9l7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://dek90:<password>@cluster0.luya9l7.mongodb.net/



module.exports = router;