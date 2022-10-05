import React from "react";
import {getCourse} from '../../api';
import './style.css';


//const CASHCOURSE = '41.3';

class CashConverter extends React.Component{
    constructor(props){
        super(props);      
        this.state={
            uah:0,
            usd:0,
            buy:42,
            sale:45
        }
    }

    componentDidMount() {
        getCourse().then((data)=>{
            for (let currency of data){
                if (currency.ccy==='USD' && currency.base_ccy==='UAH')
                    this.setState({
                        buy:currency.buy,
                        sale:currency.sale
                    })
            }
        }); 
        
    }
  /*  
    universalChangeHandler = ({target:{value, name}}) =>{
        if ( !Number.isNaN( Number(value) ) ) {
            let uah_value=0;
            let usd_value=0;
            if (name==='uah') {uah_value = value; usd_value = uah_value/CASHCOURSE;}
            if (name==='usd') {usd_value = value; uah_value = usd_value*CASHCOURSE;}
            this.setState({
                ['uah']:uah_value,
                ['usd']:usd_value
            })
        }
    }  
*/
    changeUahToUsd = ({target:{value, name}}) =>{
        if ( !Number.isNaN( Number(value) ) ) {
            this.setState({
                ['uah']: value,
                ['usd']: value/this.state.sale
            })
        }
    }  

    changeUsdToUah = ({target:{value, name}}) =>{
        if ( !Number.isNaN( Number(value) ) ) {
            this.setState({
                ['uah']: value*this.state.buy,
                ['usd']: value
            })
        }
    }     

    render() {
        return (
            <form className='form-wrapper flex-column' >
                <legend>Currency Converter</legend>
                <label className='flex-column'> UAH
                    <input type='text' name='uah' onChange = {this.changeUahToUsd} value= {this.state.uah} />
                </label>
                <label className='flex-column'> USD
                    <input type='text' name='usd' onChange = {this.changeUsdToUah} value= {this.state.usd} />                
                </label>
            </form>
        )
    }
}

export default CashConverter;