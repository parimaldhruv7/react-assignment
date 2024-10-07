import React, { useState } from 'react';

const ItemForm = ({ onSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [submissionDate, setSubmissionDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { itemName, quantity, unitPrice, submissionDate };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Item Name" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                maxLength="225" 
                required 
            />
            <input 
                type="number" 
                placeholder="Quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                required 
            />
            <input 
                type="number" 
                step="0.01" 
                placeholder="Unit Price" 
                value={unitPrice} 
                onChange={(e) => setUnitPrice(e.target.value)} 
                required 
            />
            <input 
                type="date" 
                value={submissionDate} 
                onChange={(e) => setSubmissionDate(e.target.value)} 
                required 
            />
            <button type="submit">Submit Item</button>
        </form>
    );
};

export default ItemForm;
