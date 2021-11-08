import React, { Fragment, useState } from 'react';


export const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price_range, setPrice_Range] = useState("Price Range");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name, location, price_range };
            // eslint-disable-next-line
            const response = await fetch('/restaurants', {
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
            <div className="mb-4">
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                            <input type="text" placeholder="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <select className="form-control" value={price_range} onChange={(e) => setPrice_Range(e.target.value)}>
                                <option disabled>Price Range</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                        <button type="submit" className="btn btn-primary" >Add</button>
                </form>
            </div>
        </Fragment>
    )
}
