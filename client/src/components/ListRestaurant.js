import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import * as _ from 'underscore'

export const ListRestaurant = (props) => {
    const {id} = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [reviews, setReviews] = useState([]);
    let navigate = useNavigate();
    

    //DELETE FUNCTION
    const deleteRestaurant = async (e, id) => {
        e.stopPropagation();
        try {
            // eslint-disable-next-line
            const deleteReq = await fetch(`/restaurants/${id}`, {
                method: "DELETE"
            });

            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };


    //UPDATE FUNCTION
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`)
    };

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }


    const getRestaurants = async () => {
        try {
            const response = await fetch("/restaurants");
            const jsonData = await response.json();

            setRestaurants(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getRestaurants();
    }, []);


    const getAllReviews = async () => {
        try {
            const results = await fetch('/review');
            const organizedData = await results.json();

            setReviews(organizedData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getAllReviews();
    }, []);

    //console.log(reviews);
    //let grouped = {};
    //for (let i=0; i<reviews.length; i++) {
    //    var p = reviews[i].restaurant_id;
    //    if (!grouped[p]) { grouped[p] = []; }
    //    grouped[p].push(reviews[i]);
    //}
    //console.log(grouped[11])
    //let num2 = 0;
    //for (let z=0; z<grouped[11].length; z++) {
    //    num2 += grouped[11][z].rating;
    //}
    //console.log(num2/grouped[11].length)

    return (
        <Fragment>
            {" "}
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th>Name</th>
                        <th>Location</th>
                        <th>Price Range</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {restaurants.map(restaurant => (
                    <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id} >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>
                            <button className="btn btn-warning" onClick={(e) => handleUpdate(e, restaurant.id)} >Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={(e) => deleteRestaurant(e, restaurant.id)} >Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}
