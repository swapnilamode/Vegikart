// import React, { useState, useEffect } from 'react';
// import './Table.css';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Button } from '@mui/material';
// import EditProductModal from './EditProductModal';

// const OrdersTable = () => {
//     const [orders, setOrders] = useState([]);
//     // const [currentProduct, setCurrentProduct] = useState("");
//     // const [openEditModal, setOpenEditModal] = useState(false);

//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_SERVER_DOMIN}/orders`)
//             .then(response => response.json())
//             .then(data => setOrders(data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);



//     return (
//         <div className="Table">
//             <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029", maxHeight:"400px" }}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell align="left">Price</TableCell>
//                             <TableCell align="left">Quantity</TableCell>
//                             <TableCell align="left">Total Amount</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {orders.map((order) => (
//                             order.items.map((item) => (
//                                 <TableRow key={item.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                                     <TableCell component="th" scope="row">{item.name}</TableCell>
//                                     <TableCell align="left">{item.price}</TableCell>
//                                     <TableCell align="left">{item.quantity}</TableCell>
//                                     <TableCell align="left">{order.totalAmount}</TableCell>
//                                 </TableRow>
//                             ))
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }

// export default OrdersTable;


import React, { useState, useEffect } from 'react';
import './Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/orders`)
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div className="Table">
            <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029", maxHeight:"400px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            {/* <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Quantity</TableCell> */}
                            <TableCell align="left">Total Amount</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{order._id}</TableCell>
                                {/* <TableCell align="left">{order.price}</TableCell>
                                <TableCell align="left">{order.quantity}</TableCell> */}
                                <TableCell align="left">{order.totalAmount}</TableCell>
                                <TableCell align="left">
                                    <Button variant="outlined" onClick={() => handleOrderClick(order)}>
                                        View Products
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {selectedOrder && (
                <div>
                    <h2>Products in Order: {selectedOrder.name}</h2>
                    <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder.items.map((item) => (
                                    <TableRow key={item.productId}>
                                        <TableCell component="th" scope="row">{item.name}</TableCell>
                                        <TableCell align="left">{item.price}</TableCell>
                                        <TableCell align="left">{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
}

export default OrdersTable;

