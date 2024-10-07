import React, { useState, useEffect } from 'react';
import { getCountryList, getStateList, getCityList } from './services/api';

const SupplierForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        itemDetails: {
            itemName: '',
            quantity: '',
            unitPrice: '',
            currency: '',
            submissionDate: ''
        },
        supplier: {
            supplierName: '',
            companyName: '',
            email: '',
            phoneNumber: '',
            phoneCode: '',
            countryId: '',
            stateId: '',
            cityId: ''
        }
    });
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getCountryList();
            if (res.status === 200 && res.data && res.data.data && Array.isArray(res.data.data.countyList)) {
                setCountries(res.data.data.countyList);
            } else {
                throw new Error('Failed to load countries');
            }
        } catch (err) {
            console.error('Error fetching countries:', err);
            setError('Failed to load countries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStates = async (countryId) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getStateList(countryId);
            if (res.status === 200 && res.data && res.data.data && Array.isArray(res.data.data.stateList)) {
                setStates(res.data.data.stateList);
            } else {
                throw new Error('Failed to load states');
            }
        } catch (err) {
            console.error('Error fetching states:', err);
            setError('Failed to load states. Please try again.');
            setStates([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCities = async (countryId, stateId) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getCityList(countryId, stateId);
            if (res.status === 200 && res.data && res.data.data && Array.isArray(res.data.data.cityList)) {
                setCities(res.data.data.cityList);
            } else {
                throw new Error('Failed to load cities');
            }
        } catch (err) {
            console.error('Error fetching cities:', err);
            setError('Failed to load cities. Please try again.');
            setCities([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e, section) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [name]: value
            }
        }));
    };

    const handleCountryChange = async (e) => {
        const countryId = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            supplier: {
                ...prevState.supplier,
                countryId,
                stateId: '',
                cityId: ''
            }
        }));
        await fetchStates(countryId);
        setCities([]);
    };

    const handleStateChange = async (e) => {
        const stateId = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            supplier: {
                ...prevState.supplier,
                stateId,
                cityId: ''
            }
        }));
        await fetchCities(formData.supplier.countryId, stateId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData.itemDetails, formData.supplier);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading && <div>Loading...</div>}
            
            <h2 className="mb-4">Item Details</h2>
            
            <div className="form-group">
                <label htmlFor="itemName">Item Name</label>
                <input 
                    type="text" 
                    name="itemName" 
                    className="form-control" 
                    placeholder="Item Name" 
                    value={formData.itemDetails.itemName} 
                    onChange={(e) => handleInputChange(e, 'itemDetails')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input 
                    type="number" 
                    name="quantity" 
                    className="form-control" 
                    placeholder="Quantity" 
                    value={formData.itemDetails.quantity} 
                    onChange={(e) => handleInputChange(e, 'itemDetails')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="unitPrice">Unit Price</label>
                <input 
                    type="number" 
                    name="unitPrice" 
                    className="form-control" 
                    placeholder="Unit Price" 
                    value={formData.itemDetails.unitPrice} 
                    onChange={(e) => handleInputChange(e, 'itemDetails')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <input 
                    type="text" 
                    name="currency" 
                    className="form-control" 
                    placeholder="Currency" 
                    value={formData.itemDetails.currency} 
                    onChange={(e) => handleInputChange(e, 'itemDetails')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="submissionDate">Submission Date</label>
                <input 
                    type="date" 
                    name="submissionDate" 
                    className="form-control" 
                    value={formData.itemDetails.submissionDate} 
                    onChange={(e) => handleInputChange(e, 'itemDetails')} 
                    required 
                />
            </div>

            <h2 className="mt-4 mb-4">Supplier Details</h2>

            <div className="form-group">
                <label htmlFor="supplierName">Supplier Name</label>
                <input 
                    type="text" 
                    name="supplierName" 
                    className="form-control" 
                    placeholder="Supplier Name" 
                    value={formData.supplier.supplierName} 
                    onChange={(e) => handleInputChange(e, 'supplier')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input 
                    type="text" 
                    name="companyName" 
                    className="form-control" 
                    placeholder="Company Name" 
                    value={formData.supplier.companyName} 
                    onChange={(e) => handleInputChange(e, 'supplier')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="Email" 
                    value={formData.supplier.email} 
                    onChange={(e) => handleInputChange(e, 'supplier')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input 
                    type="tel" 
                    name="phoneNumber" 
                    className="form-control" 
                    placeholder="Phone Number" 
                    value={formData.supplier.phoneNumber} 
                    onChange={(e) => handleInputChange(e, 'supplier')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneCode">Phone Code</label>
                <input 
                    type="text" 
                    name="phoneCode" 
                    className="form-control" 
                    placeholder="Phone Code" 
                    value={formData.supplier.phoneCode} 
                    onChange={(e) => handleInputChange(e, 'supplier')} 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="countryId">Country</label>
                <select 
                    name="countryId"
                    className="form-control"
                    value={formData.supplier.countryId} 
                    onChange={handleCountryChange}
                    disabled={isLoading}
                    required
                >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option key={country.countryId} value={country.countryId}>
                            {country.flag} {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="stateId">State</label>
                <select 
                    name="stateId"
                    className="form-control"
                    value={formData.supplier.stateId} 
                    onChange={handleStateChange}
                    disabled={!formData.supplier.countryId || isLoading}
                    required
                >
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state.stateId} value={state.stateId}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="cityId">City</label>
                <select 
                    name="cityId"
                    className="form-control"
                    value={formData.supplier.cityId} 
                    onChange={(e) => handleInputChange(e, 'supplier')}
                    disabled={!formData.supplier.stateId || isLoading}
                    required
                >
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city.cityId} value={city.cityId}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>Submit Supplier</button>
        </form>
    );
};

export default SupplierForm;