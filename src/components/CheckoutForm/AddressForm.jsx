import React, {useState, useEffect} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
//import FormInput from './CustomTextField';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';

const AddressForm = ({ checkoutToken, test }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
    const [shippingSubdivision, setshippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();


    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

        setshippingSubdivisions(subdivisions)
        setshippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

        setShippingOptions(options);
        setShippingOption(options[0].id);

    }



    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    },[]);

    useEffect(() => {
        if(shippingCountry) {
            fetchSubdivisions(shippingCountry)};
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
        }
    }, [shippingSubdivision])

    return (
        <div className='flex flex-col items-center'>
            
            <FormProvider {...methods}>
            <h5 className='text-2xl pt-3 pb-3'>Checkout</h5>
                <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <div className='grid grid-cols-2 gap-6 ml-10 w-4/5'>
                    <FormInput required name='firstName' label='First name'/>
                    <FormInput required name='lastName' label='Last name'/>
                    <FormInput required name='address' label='Address'/>
                    <FormInput required name='email' label='Email' type='email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                    <FormInput required name='city' label='City'/>
                    <FormInput required name='zip' label='Postal code'/>
                    <div>
                        <label>Shipping Country</label>
                        <select className='shadow border rounded w-4/5 py-2 px-2 mt-2 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                            {(Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))).map((country => (
                                <option key={country.id} value={country.id}>{country.label}</option>
                            )))}
                        </select>
                    </div>
                    <div>
                        <label>Shipping county</label>
                        <select className='shadow border rounded w-4/5 py-2 px-2 mt-2 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        value={shippingSubdivision} onChange={(e) => setshippingSubdivision(e.target.value)}>
                            {(Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))).map((subdivision => (
                                    <option key={subdivision.id} value={subdivision.id}>{subdivision.label}</option>
                                )))}
                        </select>
                    </div>
                    <div>
                        <label>Shipping options</label>
                        <select className='shadow border rounded w-4/5 py-2 px-2 mt-2 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                        value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                            {(shippingOptions.map((sOption) => ({ id: sOption.id, label: `${sOption.description} (${sOption.price.formatted_with_symbol})`}))).map((option => (
                                    <option key={option.id} value={option.id}>{option.label}</option>
                                )))}
                        </select>
                        <br/>
                    </div>
                    </div>
                        <div className='py-4 flex justify-between ml-10 mr-10'>
                            <Link to='/cart'><button type='button' className='bg-blue-600 text-white h-10 px-5 rounded-lg order-0' >Back to cart</button></Link>
                            <button type='submit' className='bg-blue-600 text-white h-10 px-5 rounded-lg order-last' >Next</button>
                        </div>
                    
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
