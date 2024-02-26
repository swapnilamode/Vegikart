
import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const EditProductModal = ({ open, handleClose, product, handleSaveChanges }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await handleSaveChanges(product._id, editedProduct);
            handleClose(); // Close modal on successful update
        } catch (error) {
            console.error('Error editing product:', error);
            // Optionally, you can show an error message to the user
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-product-modal"
            aria-describedby="modal-to-edit-product"
        >
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0px 3px 6px #00000029',
                width: '400px'
            }}>
                <h2>Edit Product</h2>
                <TextField
                    label="Name"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Category"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantity"
                    name="qty"
                    value={editedProduct.qty}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Price"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Update Product
                </Button>
            </div>
        </Modal>
    );
};

export default EditProductModal;

