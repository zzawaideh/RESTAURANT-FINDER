import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const UpdateRestaurant = (props) => {
    const {id} = useParams();
    //console.log(id);
    const [name, setName] = useState([]);
    const [location, setLocation] = useState([]);
    const [price_range, setPriceRange] = useState([]);
    

    //GET INFORMATION ABOUT RESTAURANT
    const getItem = async () => {
        try {
            const newItem = await fetch(`/restaurants/${id}`);
            const jsonData = await newItem.json();

            
            setName(jsonData.name);
            setLocation(jsonData.location);
            setPriceRange(jsonData.price_range);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getItem();
    }, []);


    //TIME TO EDIT
    const editRestaurant = async (e) => {
        e.preventDefault();
        try {
            const body = { name, location, price_range };
            // eslint-disable-next-line
            const newResponse = await fetch(`/restaurants/${id}`, {
                method: "PUT",
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
            <form>
                <div className="form-group" >
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
                </div>

                <div className="form-group" >
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
                </div>

                <div className="form-group" >
                    <label htmlFor="price_range">Price Range</label>
                    <select className="form-control" value={price_range} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>

                <button type="submit" onClick={editRestaurant} className="btn btn-primary">
                    Submit
                </button>
            </form>
        </Fragment>
    );
};
