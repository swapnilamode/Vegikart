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

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    // const [currentProduct, setCurrentProduct] = useState("");
    // const [openEditModal, setOpenEditModal] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleDelete = (userId) => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/deleteUser/${userId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(deletedUser => {
                setUsers(users.filter(user => user._id !== userId));
                console.log('User deleted:', deletedUser);
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
                        {users.map((user) => (
                            <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{user.firstName}</TableCell>
                                <TableCell align="left">{user.lastName}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UsersTable;
