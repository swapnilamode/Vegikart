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

const VendorsTable = () => {
    const [vendors, setVendors] = useState([]);
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/vendors`)
            .then(response => response.json())
            .then(data => setVendors(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleDelete = (vendorId) => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/deleteVendor/${vendorId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(deletedVendor => {
                setVendors(vendors.filter(vendor => vendor._id !== vendorId));
                console.log('Vendor deleted:', deletedVendor);
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div className="Table">
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>FirstName</TableCell>
                            <TableCell align="left">LastName</TableCell>
                            <TableCell align="left">Email</TableCell>
                            {/* <TableCell align="left"></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendors.map((vendor) => (
                            <TableRow key={vendor._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{vendor.firstName}</TableCell>
                                <TableCell align="left">{vendor.lastName}</TableCell>
                                <TableCell align="left">{vendor.email}</TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => handleDelete(vendor._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default VendorsTable;
