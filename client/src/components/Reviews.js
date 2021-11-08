import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarRating } from './StarRating'

export const Reviews = (props) => {
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);

    const getAllReviews = async () => {
        try {
            const response = await fetch(`/restaurants/${id}/review`);
            const jsonData = await response.json();

            setReviews(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getAllReviews();
    }, []);


return (
    <div className="row row-cols-3 mb-2">
        {reviews.map(review => (
                <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StarRating rating={review.rating} /></span>
                    </div>

                    <div className="card-body">
                        <p className="card-text">{review.review}</p>
                    </div>
                </div>
            ))}
    </div>
    );
}

