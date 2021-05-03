import React,{useState,useEffect} from 'react'
import {MenuItem,InputLabel,Grid,Typography,Button,Select} from '@material-ui/core'
import {useForm,FormProvider } from 'react-hook-form'
import FormInput from './CustomText'
import {commerce} from '../../lib/commerce'
import {Link} from 'react-router-dom'


const AddressForm = ({checkOutToken,next}) => {
    const methods = useForm()

    const [shippingCountries,setShippingCountries] = useState([])
    const [shippingCountry,setShippingCountry] = useState('')
    const [shippingSubdivisions,setShippingSubdivisions] = useState([])
    const [shippingSubdivision,setShippingSubdivision] = useState('')
    const [shippingOptions,setShippingOptions] = useState([])
    const [shippingOption,setShippingOption] = useState('')

    //fetch countries
    const fetchShippingCountries = async (checkOutTokenId)=>{
        const {countries} = await commerce.services.localeListShippingCountries(checkOutTokenId)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }
    const countries = Object.entries(shippingCountries).map(([code,name]) =>({id:code,label:name}))
    useEffect(() => {
        fetchShippingCountries(checkOutToken.id);
    }, []);
    // fetch countries subdivision
    const fetchSubdivisions = async (countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) =>({id:code,label:name}))
    useEffect(() => {
        if (shippingCountry) {
            fetchSubdivisions(shippingCountry)
        }
        
    }, [shippingCountry]);
    // fetch options
    const fetchOptions = async (checkoutTokenId,country,region = null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
        setShippingOptions(options);
        setShippingOption(options[0].id)
    }
    const options = shippingOptions.map((sO) =>({id:sO.id,label:`${sO.description}-(${sO.price.formatted_with_symbol})`}))
    useEffect(() => {
        if (shippingSubdivision) {
            fetchOptions(checkOutToken.id,shippingCountry,shippingSubdivision)
        }
        
    }, [shippingSubdivision]);
   
   
    return (
        <>
            <Typography variant ="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
               <form onSubmit = {methods.handleSubmit((data)=>{next({...data,shippingCountry,shippingSubdivision,shippingOption})})}>
                   <Grid container spacing ={3}>
                      <FormInput required name = "firstname" label="First name" />
                      <FormInput required name = "lastname" label="Last name" />
                      <FormInput required name = "adresse1" label="Adresse" />
                      <FormInput required name = "email" label="Email" />
                      <FormInput required name = "city" label="City" />
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
                     <Grid item xs={12} sm ={6}>
                         <InputLabel>Shipping subdivision</InputLabel>
                           <Select value = {shippingSubdivision} onChange = {(e)=>{setShippingSubdivision(e.target.value)}}> 
                           {subdivisions.map((subdivision)=>(
                            <MenuItem key={subdivision.id} value ={subdivision.id}>
                               {subdivision.label}
                              </MenuItem>

                           ))}                                         
                           </Select>
                      </Grid>
                       <Grid item xs={12} sm ={6}>
                         <InputLabel>Shipping options</InputLabel>
                           <Select value = {shippingOption}  onChange = {(e)=>{setShippingOption(e.target.value)}}>
                           {options.map((option)=>(
                            <MenuItem key={option.id} value ={option.id}>
                               {option.label}
                              </MenuItem>

                           ))}                       
                              
                           </Select>
                      </Grid>
                   </Grid>
                  <br/>
                  <div style={{display :'flex', justifyContent:'space-between'}}>
                      <Button component ={Link} to ='/cart' variant="outlined">back to cart</Button>
                      <Button type ="submit" variant="contained" color="primary">next</Button>

                  </div> 
               </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
