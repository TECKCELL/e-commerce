import React from 'react'
import {Container,Typography,Button,Grid} from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'
import useStyles from './styles'

const Cart = ({ cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
     var isEmpty = true;
     const isLoaded = Object.keys(cart).length;
     if (isLoaded) {
        isEmpty =!cart.line_items.length ;
     }
    const classes = useStyles();
    const EmptyCart = ()=>(
        <Typography variant = "subtitle1">You have no items in your cart,
           <Link  to='/' className ={classes.link}>start adding some</Link>!
        </Typography>
    );
    const FilledCart = ()=>(
        <>
        <Grid container spacing = {3}>
          {cart.line_items.map((item)=>(

              <Grid item xs ={12} sm ={4} key= {item.id}>
                  <CartItem item = {item} onUpdateCartQty = {handleUpdateCartQty} onRemoveFromCart = {handleRemoveFromCart}/>
              </Grid>
          )
          )}

        </Grid>
        <div className = {classes.cardDetails}>
             <Typography variant = "h4">
                subtotal : {cart.subtotal.formatted_with_symbol}
             </Typography>
             <div>
                 <Button className={classes.emptyButton} size = "large" type = "button" variant = "contained" color = "secondary" onClick = {handleEmptyCart}>
                     empty cart
                 </Button>
                 <Button component = {Link} to = '/Checkout' className={classes.checkoutButton} size = "large" type = "button" variant = "contained" color = "primary">
                    checkout
                 </Button>
             </div>
                  
         </div>
        </>
    );
    return (
        
        <Container>
            <div className = {classes.toolbar} />
            <Typography className ={classes.title} variant = "h3" gutterBottom>Your shopping cart</Typography>
            {isEmpty ?<EmptyCart/>:<FilledCart/>}
        </Container>
    )
}

export default Cart
