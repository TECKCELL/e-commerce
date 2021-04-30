import React,{useState,useEffect} from 'react'
import {Paper,Step,Stepper,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core'
import {commerce} from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'


const Checkout = ({cart}) => {

    const Steps = ["Shipping address","payement details"];
    const [activeStep,setActiveStep] = useState(0);
    const[checkOutToken,setCheckOutToken] = useState(null);
    const classes = useStyles()
    const Form = () => activeStep === 0  ?
    <AddressForm checkOutToken = {checkOutToken}/>:<PaymentForm/>

    const Confirmation = ()=>(
        <div>
           confirmation
        </div>
        
    )
    useEffect(()=>{
        const generateToken = async () =>{
            if (cart.id === undefined) {
                return 'Loading ...'
            }
            try {         
               
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
                setCheckOutToken(token);      
                   
            } catch (error) {
                
            }
        }
            generateToken();
    },[cart])

   
    return (
        <>
            <div className = {classes.toolbar} />
            <main className = {classes.layout}>
              <Paper className = {classes.paper}>
                 <Typography variant ="h4" align ="center">Checkout</Typography>
                 <Stepper activeStep = {0} className={classes.Stepper}>
                     {Steps.map((step)=>(
                         <Step key = {step}>
                             <StepLabel>{step}</StepLabel>
                         </Step>

                     ))}
                 </Stepper>
                 {activeStep === Steps.length ?<Confirmation />:checkOutToken && <Form/>}
              </Paper>

            </main>
        </>
    )
}

export default Checkout
