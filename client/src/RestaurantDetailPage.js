import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddReview } from './components/AddReview';
import { Reviews } from './components/Reviews';
import { StarRating } from './components/StarRating';

const RestaurantDetailPage = (props) => {
    const {id} = useParams();
    const [selectedRestaurant, setSelectedRestaurant] = useState([]);
    const [reviews, setReviews] = useState([]);


    //GET INFORMATION ABOUT RESTAURANT
    const getRestaurantt = async () => {
        try {
            const restaurantDetail = await fetch(`/restaurants/${id}`);
            const jsonData = await restaurantDetail.json();
        
                    
            setSelectedRestaurant(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getRestaurantt();
    }, []);



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

    let arr1 = [];
    for (let i=0; i<reviews.length; i++) {
        arr1.push(reviews[i])
    }
    let num1 = 0;
    for (let z=0; z<arr1.length; z++) {
        num1 += arr1[z].rating;
    }
    let avgRating = num1/arr1.length;


    return (
        <Fragment>
            <div>
                <h1 className="text-center display-1" >{selectedRestaurant.name}</h1>

                <div className="text-center">
                    <StarRating rating={avgRating} />
                </div>

                <div className="mt-3">
                    <Reviews />
                </div>
                <AddReview />
            </div>
        </Fragment>
    )
}

export default RestaurantDetailPage;