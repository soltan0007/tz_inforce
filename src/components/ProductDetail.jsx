import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, delItem } from '../redux/actions/index';
import Modal from './Modal';
import DATA from "../Data";

const ProductDetail = () => {
    const [cartBtn, setCartBtn] = useState("Add to Cart");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { id } = useParams();
    const product = DATA.find(item => item.id === parseInt(id));

    const dispatch = useDispatch();

    const handleCart = () => {
        if (cartBtn === "Add to Cart") {
            dispatch(addItem(product));
            setCartBtn("Remove from Cart");
        } else {
            setShowDeleteModal(true);
        }
    };

    const handleConfirmDelete = () => {
        dispatch(delItem(product));
        setCartBtn("Add to Cart");
        setShowDeleteModal(false);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="container my-5 py-3">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center mx-auto product">
                        <img src={product.img} alt={product.title} height="400px" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="display-5 fw-bold">{product.title}</h1>
                        <hr />
                        <h2 className="my-4">{product.price} UAH</h2>
                        <p className="lead">{product.desc}</p>
                        <button onClick={handleCart} className="btn btn-outline-primary my-2">{cartBtn}</button>
                        <Modal
                            isOpen={showDeleteModal}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmDelete}
                            title="Confirm Removal"
                            content="Are you sure you want to remove this item from your cart?"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
