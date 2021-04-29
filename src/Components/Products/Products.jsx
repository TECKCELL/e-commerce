import React from 'react';
import {Grid} from '@material-ui/core'
import Product from './Product/Product'

const products = [

    {id:1,name:'shoes',description:'running',price:'5$',image :'https://unsplash.com/photos/164_6wVEHfI'},
    {id:2,name:'parfums',description:'wood',price:'5$',image :'https://unsplash.com/photos/164_6wVEHfI'},
    {id:3,name:'jackets',description:'winter',price:'5$',image :'https://unsplash.com/photos/164_6wVEHfI'},
    {id:4,name:'jeans',description:'straight',price:'5$',image :'https://unsplash.com/photos/164_6wVEHfI'},
]

const Products = ()=>{

    return(

        <main>
        <Grid container justify = "center" spacing = {4}>
            {products.map((product) =>(

                <Grid item key={product.id} xs ={12} sm = {6} md ={4} lg ={3}>
                     <Product product = {product} />
                </Grid>
            )

            )}

        </Grid>
    </main>


    )

    

}
export default Products;