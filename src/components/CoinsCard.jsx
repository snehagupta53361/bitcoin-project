import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';

const CoinsCard = ({id, name, url, imageSrc, price, symbol, currencySymbol = "₹"})=>{
    return (
        <Link to={`/coins/${id}`}>
        <VStack w={'52'} p={'4'} m={'4'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'} 
        css={{"&:hover":{
            transform: "scale(1.1)",
        }}} justifyContent={'center'}>
            <Image src={imageSrc} alt={name} w={'10'} h={'10'} objectFit={'contain'}/>
            <Heading size={'md'} noOfLines={1} textTransform={'uppercase'}>{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text>{currencySymbol}{price}</Text>
        </VStack>
        </Link>
    )
}

export default CoinsCard;