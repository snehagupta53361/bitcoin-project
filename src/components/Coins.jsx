import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import ErrorMessage from './ErrorMessage';
import { Button, Container, HStack, Radio, RadioGroup} from '@chakra-ui/react';
import CoinsCard from './CoinsCard';


const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('inr');
    const [page, setPage] = useState(1);

  const currencySymbol = currency==='INR'? '₹' : currency==="EUR" ? '€' : '$';


    const changePage = (page)=>{
        setPage(page);
        setLoader(true);
    }

    const btns = new Array(132).fill(1);


    useEffect(()=>{
        const fetchExchanges = async ()=>{
            try{
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(data);
                setLoader(false);
            }
            catch(error){
                setError(true);
                setLoader(false);
            }
        }
        fetchExchanges();
    }, [currency, page])
    if(error) return <ErrorMessage message={'Error please proceed after sometime'}/>
    return (
        <Container maxW={'container.xl'}>
            {
                loader ? <Loader/> : (
                    <>    
                    <RadioGroup value={currency} onChange={setCurrency} p={8}>
                    <HStack spacing={'4'}>
                        <Radio value={'INR'}>INR</Radio>
                        <Radio value={'USD'} >USD</Radio>
                        <Radio value={'EUR'}>EUR</Radio>
                    </HStack>
                    </RadioGroup>          
                    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {
                        coins.map((i)=><CoinsCard id={i.id} name={i.name} url={i.url} imageSrc={i.image} price={i.current_price} currencySymbol={currencySymbol} symbol={i.symbol} key={i.id}/>)
                    }
                </HStack>
                
                <HStack overflowX={'auto'} p={'8'} justifyContent={'space-between'}>{
                    btns.map((item, index)=>{
                        return <Button bgColor={'black'} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>
                    })
                }                  
                </HStack>
                </>
                )
            }
        </Container>
    )
}

export default Coins;