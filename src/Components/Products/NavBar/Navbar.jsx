import React from 'react'
import{AppBar,Toolbar,IconButton,Badge,Menu,MenuItem,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import useStyles from './styles'
import logo from '../../../Assets/commerce.png'

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color="inherit">
                 <Toolbar>
                     <Typography variant="h6" className ={classes.title} color = 'inherit'>
                         <img src= {logo} alt="commerce.js" height='25px'className={classes.image}/>
                         commerce.js
                     </Typography>
                     <div className = {classes.grow}/>
                     <div className = {classes.button}>

                        <IconButton aria-label="show cart items" color='inherit'>
                            <Badge badgeContent ={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>

                        </IconButton>

                     </div>
                 </Toolbar>

            </AppBar>
        </>
    )
}

export default Navbar
