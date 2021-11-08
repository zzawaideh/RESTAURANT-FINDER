import React from 'react';

//COMPONENTS
import { AddRestaurant } from './components/AddRestaurant';
import { Header } from './components/Header';
import { ListRestaurant } from './components/ListRestaurant';

const Home = () => {
    return (
        <div>
            <Header />
            <AddRestaurant />
            <ListRestaurant />
        </div>
    )
}

export default Home;