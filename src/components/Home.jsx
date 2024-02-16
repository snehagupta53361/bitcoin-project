import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import btnSrc from "../images/bitcoin.png"
import { motion } from 'framer-motion';

const Home = () => {
  return (
   <Box w={'full'} h={'85vh'} bgColor={'black'} color={'white'}>
   <motion.div style={{
    height: "80vh",
   }}
   animate={{
    translateY: "20px"
   }}
   transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse"
   }}
   >
    <Image src={btnSrc} 
    h={'full'}
    w={'full'}
    objectFit={'contain'}
    filter={"grayScale(1)"}
    />
    </motion.div>
    <Text textAlign={'center'} fontSize={'6xl'} mt={'-20'} fontWeight={'thin'} p={'8'}>Xcrypto</Text>
   </Box>
  )
}

export default Home;