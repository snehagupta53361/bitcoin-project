import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import ErrorMessage from './ErrorMessage';
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    useEffect(()=>{
        const fetchExchanges = async ()=>{
            try{
                const {data} = await axios.get(`${server}/exchanges`);
                console.log(data);
                setExchanges(data);
                setLoader(false);
            }
            catch(error){
                setError(true);
                setLoader(false);
            }
        }
        fetchExchanges();
    }, [])
    if(error) return <ErrorMessage message={'Error please proceed after sometime'}/>
    return (
        <Container maxW={'container.xl'}>
            {
                loader ? <Loader/> : 
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {
                        exchanges.map((i)=><ExchangeCard key={i.id} name={i.name} url={i.url} imageSrc={i.image} rank={i.trust_score_rank}/>)
                    }
                </HStack>
            }
        </Container>
    )
}
export const ExchangeCard = ({name, url, imageSrc, rank})=>{
    return (
        <a href={url} target={'_blank'}> 
        <VStack w={'52'} p={'4'} m={'4'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'} 
        css={{"&:hover":{
            transform: "scale(1.1)",
        }}}>
            <Image src={imageSrc} alt={name} w={'10'} h={'10'} objectFit={'contain'}/>
            <Heading size={'md'} noOfLines={1}>{rank}</Heading>
            <Text>{name}</Text>
        </VStack>
        </a>
    )
}
export default Exchanges