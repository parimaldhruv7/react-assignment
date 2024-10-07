import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import SupplierForm from './components/SupplierForm';
import Table from './components/Table';
import { saveItemsSuppliers } from './components/services/api';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <div className="container mt-5">
            <h1 className="mb-4">Item & Supplier Form</h1>
            
            <div className="form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="itemCheckbox" 
                    checked={itemChecked} 
                    onChange={() => setItemChecked(!itemChecked)} 
                />
                <label className="form-check-label" htmlFor="itemCheckbox">Item</label>
            </div>

            <div className="form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="supplierCheckbox" 
                    checked={supplierChecked} 
                    onChange={() => setSupplierChecked(!supplierChecked)} 
                />
                <label className="form-check-label" htmlFor="supplierCheckbox">Supplier</label>
            </div>

            {itemChecked && <ItemForm onSubmit={handleSubmit} />}
            {supplierChecked && <SupplierForm onSubmit={handleSubmit} />}
            
            <Table data={data} />
        </div>
    );
};

export default App;
