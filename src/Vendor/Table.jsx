import React, { useState, useEffect } from 'react';
import './Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import EditProductModal from './EditProductModal';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (productId) => {
        const productToEdit = products.find(product => product._id === productId);
        setCurrentProduct(productToEdit);
        setOpenEditModal(true);
    };

    const handleDelete = (productId) => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/deleteProduct/${productId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(deletedProduct => {
                setProducts(products.filter(product => product._id !== productId));
                console.log('Product deleted:', deletedProduct);
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleSaveChanges = async (productId, updatedProduct) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/updateProduct/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProductData = await response.json();
            // Update products state with the updated product data
            setProducts(products.map(product => product._id === productId ? updatedProductData : product));
            setOpenEditModal(false); // Close the edit modal after successful update
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="Table">
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029", maxHeight : "400px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Action</TableCell>
                            {/* <TableCell align="left"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{product.name}</TableCell>
                                <TableCell align="left">{product.category}</TableCell>
                                <TableCell align="left">{product.qty}</TableCell>
                                <TableCell align="left">{product.price}</TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => handleEdit(product._id)}>Edit</Button>
                                    &nbsp;
                                    <Button onClick={() => handleDelete(product._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditProductModal
                open={openEditModal}
                handleClose={() => setOpenEditModal(false)}
                product={currentProduct}
                handleSaveChanges={handleSaveChanges} // Pass handleSaveChanges function to the modal
            />
        </div>
    );
}

export default ProductTable;
