import { useParams } from 'react-router-dom';
import { Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport, BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';

const ProductPage = () => {

  const [amount, setAmount] = useState(0);
  let { id } = useParams();
  const toast = useToast();

  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const { loading, error, product } = productsState;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount -1 );
    }
  }

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({description: 'The product has added successufuly', status: 'success'})
  }

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {
        loading ? (
          <Stack direction='row' spacing={4}>
            <Spinner mt={20} thickness='2px' speed='0.66s' emptyColor='gray.200' color='orange.500' size='zl' />
          </Stack>
        ) : error ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12'}}
            py={{ base: '4', md: '8', lg: '12'}}
          >
            <Stack direction={{ base: 'column', lg: 'row', }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex='1.5'
                mb={{ base: '12', md: 'none' }}>
                  {
                    product.productIsNew && (
                      <Badge rounded='full' w='40px' fontSize='0.8em' colorScheme='green'>
                        New
                      </Badge>
                    )
                  }
                  <Heading fontSize='2x1' fontWeight='semibold'>
                    {product.name}
                  </Heading>
                  <Stack spacing='5'>
                    <Box>
                      <Text fontSize='xl'>${product.price}</Text>
                      <Flex>
                        <HStack spacing='2px'>
                          <StarIcon color='orange.500' />
                          <StarIcon color={product.rating >=2 ? 'orange.500' : 'gray.200'} />
                          <StarIcon color={product.rating >=3 ? 'orange.500' : 'gray.200'} />
                          <StarIcon color={product.rating >=4 ? 'orange.500' : 'gray.200'} />
                          <StarIcon color={product.rating >=5 ? 'orange.500' : 'gray.200'} />
                        </HStack>
                        <Text fontSize='md' fontWeight='bold' ml='4px'>
                          {product.numberOfReviews} Reviews
                        </Text>
                      </Flex>
                    </Box>
                    <Text>{product.description}</Text>
                    <Text fontWeight={'bold'}>Quantity</Text>
                    <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center' justify='space-between'>
                      <Button isDisabled= { amount <= 0 } onClick={() => changeAmount('minus')}>
                        <MinusIcon />
                      </Button>
                      <Text>{amount}</Text>
                      <Button isDisable={ amount >= product.stock } onClick={() => changeAmount('plus')}>
                        <SmallAddIcon w='20px' h='25px' />
                      </Button>
                    </Flex>
                    <Button colorScheme='orange.500' w='full' onClick={() => addItem()}>
                      Add to Cart
                    </Button>
                  </Stack>
                </Stack>
            </Stack>
            </Box>
        )
      }
    </Wrap>
  )
}

export default ProductPage;

