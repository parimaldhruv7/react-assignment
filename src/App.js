import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import SupplierForm from './components/SupplierForm';
import Table from './components/Table';
import { saveItemsSuppliers } from './components/services/api';


const App = () => {
    const [data, setData] = useState([]);
    const [itemChecked, setItemChecked] = useState(false);
    const [supplierChecked, setSupplierChecked] = useState(false);

    const handleSubmit = async (itemData, supplierData) => {
        try {
            const response = await saveItemsSuppliers({ itemDetails: itemData, supplier: supplierData });
            setData([...data, response.data]);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div>
            <h1>Item & Supplier Form</h1>
            <label>
                <input type="checkbox" checked={itemChecked} onChange={() => setItemChecked(!itemChecked)} />
                Item
            </label>
            <label>
                <input type="checkbox" checked={supplierChecked} onChange={() => setSupplierChecked(!supplierChecked)} />
                Supplier
            </label>

            {itemChecked && <ItemForm onSubmit={handleSubmit} />}
            {supplierChecked && <SupplierForm onSubmit={handleSubmit} />}
            
            <Table data={data} />
        </div>
    );
};

export default App;
