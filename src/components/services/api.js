import axios from 'axios';

const BASE_URL = 'https://apis-technical-test.conqt.com';

export const saveItemsSuppliers = async (data) => {
    return axios.post(`${BASE_URL}/Api/Item-Supplier/Save-Items-Suppliers`, data);
};

export const getCountryList = async () => {
    return axios.get(`${BASE_URL}/Api/countrystatecity/Get-All-CountryList`);
};

export const getStateList = async (countryId) => {
    return axios.get(`${BASE_URL}/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${countryId}`);
};

export const getCityList = async (countryId, stateId) => {
    return axios.get(`${BASE_URL}/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${countryId}&stateId=${stateId}`);
};
