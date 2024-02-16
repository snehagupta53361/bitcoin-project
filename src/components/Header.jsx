import React from 'react';
import { Link } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';

const Header = () => {
  return (
    <HStack p={'4'} bgColor={'black'} color={'white'} shadow={'base'}>

    <Button variant={'unstyled'} color={'white'}>
        <Link to='/'>Home</Link>
    </Button>

    <Button variant={'unstyled'} color={'white'}>
        <Link to='/coins'>Coins</Link>
    </Button>
    
    <Button variant={'unstyled'} color={'white'}>
        <Link to='/exchanges'>Exchange</Link>
    </Button>
       
    </HStack>
  )
}

export default Header;