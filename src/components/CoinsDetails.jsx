import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import Chart from './Chart';

const CoinsDetails = () => {
  const [coin, setCoins] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  

  const currencySymbol = currency==='inr'? '₹' : currency==="eur" ? '€' : '$';

  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchDays = (key)=>{
    switch (key) {
      case "24h":
        setDays("24h");
        setLoader("true");
        break;
        case "7d":
          setDays("7d");
          setLoader("true");
          break;
          case "14d":
        setDays("14d");
        setLoader("true");
        break;
        case "30d":
        setDays("30d");
        setLoader("true");
        break;
        case "60d":
        setDays("60d");
        setLoader("true");
        break;
        case "200d":
        setDays("200d");
        setLoader("true");
        break;
        case "365d":
        setDays("365d");
        setLoader("true");
        break;
        case "max":
        setDays("max");
        setLoader("true");
        break;
      default:
        setDays("24h");
        setLoader("true");
        break;
    }
  }
  
  useEffect(()=>{
    const fetchExchanges = async ()=>{
        try{
            const {data} = await axios.get(`${server}/coins/${params.id}`);
            const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
            
            setChartArray(chartData.prices);
            setCoins(data);
            setLoader(false);
        }
        catch(error){
            setError(true);
            setLoader(false);
        }
    }
    fetchExchanges();
}, [params.id, currency, days])

  if(error) <ErrorMessage message={'Error please proceed after some time'}/>
  return (
    <Container maxW={'container.xl'}>
    {
      loader ? <Loader/> : (
        <>
            <Box borderWidth={1} w={'full'}>
              <Chart currency={currencySymbol} arr={chartArray} days={days}/>
            </Box>

            <HStack w={'full'} p={'4'} wrap={'wrap'} overflowX={'auto'}>
                {
                  btns.map((i)=>{
                    return <Button key={i} onClick={()=>switchDays(i)}>{i}</Button>
                  })
                }
            </HStack>
            <RadioGroup value={currency} onChange={setCurrency} p={8}>
                <HStack spacing={'4'}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"} >USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                  </HStack>
              </RadioGroup> 
              <VStack spacing={'4'} p={'8'} w={'full'} alignItems={'flex-start'}>
                <Text alignSelf={'center'} fontSize={'small'}>
                  Last updated on {Date(coin.market_data.last_updated).split('G')[0]}
                </Text>
                <Image src={coin.image.large} h={'16'} w={'16'} objectFit={'contain'}/>
                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={coin.market_data.market_cap_change_percentage_24h>0 ? "increase" : "decrease"}/>
                    {
                      coin.market_data.market_cap_change_percentage_24h
                    }%
                  </StatHelpText>                 
                </Stat>
                <Badge fontSize={'2xl'} bgColor={'black'} color={'white'}>#{coin.market_data.market_cap_rank}</Badge>

                <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>

                <Box w={'full'} p={'4'}>
                  <Item title={'Max Supply'} value={coin.market_data.max_supply}/>
                  <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
                  <Item title={'Market cap'} value={coin.market_data.market_cap[currency]} currencySymbol={currencySymbol}/>
                  <Item title={'All Time low'} value={coin.market_data.atl[currency]}/>
                  <Item title={'All Time high'} value={coin.market_data.ath[currency]}/>
                </Box>
              </VStack>
          </>
      )
        }
        </Container>
      )
}

const Item = ({title, value, currencySymbol})=>{
  return (
    <HStack justifyContent={'space-between'} my={'4'} w={'full'}>
        <Text fontFamily={'Bebas Neue'} letterSpacing={'4'}>{title}</Text>
        <Text fontFamily={'Bebas Neue'}>{currencySymbol}{value}</Text>
    </HStack>
  )
}

const CustomBar = ({high, low})=>{
  return (
  <VStack w={'full'}>
    <Progress value={'50'} colorScheme={'red'} w={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'}></Badge>
      <Text fontSize={'sm'}>24hr Range</Text>
      <Badge children={high} colorScheme={'green'}></Badge>
    </HStack>
  </VStack>
  )
}
export default CoinsDetails;