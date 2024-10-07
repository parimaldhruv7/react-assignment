import React from 'react';

const Table = ({ data }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>City</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.supplierName}</td>
                        <td>{row.itemName}</td>
                        <td>{row.quantity}</td>
                        <td>{row.unitPrice}</td>
                        <td>{row.cityName}</td>
                        <td>{row.email}</td>
                        <td>{row.phoneNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
