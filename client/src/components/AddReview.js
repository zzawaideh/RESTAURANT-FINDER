import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export const AddReview = (props) => {
    const {id} = useParams();
    const [name, setName] = useState([]);
    const [rating, setRating] = useState("Rating");
    const [review, setReview] = useState([]);


    //GET INFORMATION ABOUT RESTAURANT
    const getItem = async () => {
        try {
            const newItem = await fetch(`/restaurants/${id}`);
            const jsonData = await newItem.json();
                    
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getItem();
    }, []);


    //TIME TO REVIEW
    const reviewRestaurant = async (e) => {
        e.preventDefault();
        try {
            const body = { name, rating, review };
            console.log(body);
            // eslint-disable-next-line
            const newReview = await fetch(`/restaurants/${id}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <div className="mb-2">
                <form>
                    <div className="form-row">
                        <div className="form-group col-8">
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control"/>
                        </div>

                        <div className="form-group col-4">
                            <label htmlFor="rating">Rating</label>
                            <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
                                <option disabled>Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Review">Review</label>
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} id="Review" className="form-control"></textarea>
                    </div>

                    <button type="submit" onClick={reviewRestaurant} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Fragment>
    )
};