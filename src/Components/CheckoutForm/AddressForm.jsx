import React,{useState,useEffect} from 'react'
import {MenuItem,InputLabel,Grid,Typography,Button,Select} from '@material-ui/core'
import {useForm,FormProvider } from 'react-hook-form'
import FormInput from './CustomText'
import {commerce} from '../../lib/commerce'


const AddressForm = ({checkOutToken}) => {
    const methods = useForm()

    const [shippingCountries,setShippingCountries] = useState([])
    const [shippingCountry,setShippingCountry] = useState('')
    const [shippingSubdivisions,setShippingSubdivisions] = useState([])
    const [shippingSubdivision,setShippingSubdivision] = useState('')
    const [shippingOptions,setShippingOptions] = useState([])
    const [shippingOption,setShippingOption] = useState('')

    const fetchShippingCountries = async (checkOutTokenId)=>{
        const {countries} = await commerce.services.localeListShippingCountries(checkOutTokenId)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }
    const countries = Object.entries(shippingCountries).map(([code,name]) =>({id:code,label:name}))
    

    useEffect(() => {
        fetchShippingCountries(checkOutToken.id);
    }, []);
   
   
    return (
        <>
            <Typography variant ="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
               <form onSubmit = "">
                   <Grid container spacing ={3}>
                      <FormInput required name = "firstname" label="First name" />
                      <FormInput required name = "lastname" label="Last name" />
                      <FormInput required name = "adresse1" label="Adresse" />
                      <FormInput required name = "email" label="Email" />
                      <FormInput required name = "City" label="City" />
                      <FormInput required name = "Zip" label="ZIP/Postal code" />
                      <Grid item xs={12} sm ={6}>
                         <InputLabel>Shipping country</InputLabel>
                         <Select value ={shippingCountry}  onChange = {(e)=>{setShippingCountry(e.target.value)}}>
                               {countries.map((country)=>(
                                <MenuItem key={country.id} value = {country.id}>
                                   {country.label}
                                </MenuItem>
                                   )
                                 )
                               }
                              
                           </Select>
                           
                          
                      </Grid>
                     {/* <Grid item xs={12} sm ={6}>
                         <InputLabel>Shipping subdivision</InputLabel>
                           <select value = {} fullWidth onChange = {}>                        
                              <MenuItem key={} value ={}>
                               Select me
                              </MenuItem>
                           </select>
                      </Grid>
                      <Grid item xs={12} sm ={6}>
                         <InputLabel>Shipping options</InputLabel>
                           <select value = {} fullWidth onChange = {}>                        
                              <MenuItem key={} value ={}>
                               Select me
                              </MenuItem>
                           </select>
                      </Grid>*/}
                   </Grid>
               </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
