import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DATA from '../Data';

const Product = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [sortType, setSortType] = useState('alphabetical');
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        desc: '',
        img: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.price || !newProduct.desc || !newProduct.img) {
            alert("Please fill in all fields before adding the product.");
            return;
        }
        DATA.push({ ...newProduct, id: DATA.length });
        setNewProduct({
            title: '',
            price: '',
            desc: '',
            img: ''
        });
        setShowAddForm(false);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const sortAlphabetically = (a, b) => {
        return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
    };

    const sortByQuantity = (a, b) => {
        return a.price - b.price;
    };

    const sortedData = [...DATA].sort(sortType === 'alphabetical' ? sortAlphabetically : sortByQuantity);

    const cardItem = (item) => {
        return (
            <NavLink className="card my-5 py-4" style={{ width: "18rem" }} to={`/products/${item.id}`} key={item.id}>
                <img src={item.img} className="card-img-top" alt={item.title} />
                <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="lead">{item.price} UAH</p>
                    <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary">Buy Now</NavLink>
                </div>
            </NavLink>
        );
    };

    return (
        <div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Products for your pet!</h1>
                        <hr />
                        <div className="sort d-flex justify-content-between align-items-center">
                            <button className="btn btn-outline-primary" onClick={() => setShowAddForm(true)}>Add Product</button>
                            <select className="form-select mb-3 w-auto" value={sortType} onChange={handleSortChange}>
                                <option value="alphabetical">Sort Alphabetically</option>
                                <option value="quantity">Sort by Price</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {showAddForm && (
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="title" value={newProduct.title} onChange={handleChange} placeholder="Title" />
                                <input type="text" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" />
                                <input type="text" name="desc" value={newProduct.desc} onChange={handleChange} placeholder="Description" />
                                <input type="text" name="img" value={newProduct.img} onChange={handleChange} placeholder="Image URL" />
                                <button type="submit">Add Product</button>
                            </form>
                        </div>
                    )}
                    {sortedData.map(cardItem)}
                </div>
            </div>
        </div>
    );
};

export default Product;
