import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react'

const Footer = () => {
  return (
    <Box
    minH={'48'}
    w={'full'}
    px={'16'}
    py={['16', '8']}
    bgColor={'black'}
    color={'white'}
    >
    <Stack 
    direction={['column', 'row']}
    alignItems={'center'}
    h={'full'}
    >
    <VStack w={'full'} alignItems={['center', 'flex-start']}>
        <Text fontWeight={'bold'}>About Us</Text>
        <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']}>We are the best crypto trading app in India. We provide our guidance at a very cheap price.</Text>
    </VStack>
    <VStack>
        <Avatar h={'36'} w={'36'} mt={['4', '0']}/>
        <Text>Our Founder</Text>
    </VStack>
    </Stack>
    </Box>
  )
}

export default Footer;