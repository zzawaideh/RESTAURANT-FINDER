const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 2005

//LOCAL FILES
const db = require('./database');

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
};


//ROUTES

//GET ALL RESTAURANTS
app.get('/restaurants', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM restaurants');
        res.json(response.rows);
    } catch(err) {
        console.error(err.message);
    }
});

//GET ONE RESTAURANT
app.get('/restaurants/:id', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM restaurants WHERE id=$1', [req.params.id]);
        res.json(response.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});

//CREATE RESTAURANT
app.post('/restaurants', async (req, res) => {
    try {
        const response = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3)', [req.body.name, req.body.location, req.body.price_range]);
        res.json('new restaurant added.');
    } catch (err) {
        console.error(err.message);
    }
});

//UPDATE RESTAURANT
app.put('/restaurants/:id', async (req, res) => {
    try {
        const response = await db.query('UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4', [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.json('restaurant has been updated.');
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE RESTAURANT
app.delete('/restaurants/:id', async (req, res) => {
    try {
        const response = await db.query('DELETE FROM restaurants WHERE id=$1', [req.params.id]);
        res.json('restaurant has been deleted.');
    } catch (err) {
        console.error(err.message);
    }
});

//REVIEW ROUTES

//GET ONE REVIEW
app.get('/restaurants/:id/review', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM reviews WHERE restaurant_id=$1', [req.params.id]);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//GET ALL REVIEWS
app.get('/review', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM reviews');
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//POST REVIEW
app.post('/restaurants/:id/review', async (req, res) => {
    try {
        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *', [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.json("new review.");
    } catch (err) {
        console.error(err.message);
    }
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//LISTEN ON PORT
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});