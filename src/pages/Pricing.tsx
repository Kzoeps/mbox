import { ReactNode } from 'react';
import {
	Box,
	Stack,
	HStack,
	Heading,
	Text,
	VStack,
	useColorModeValue,
	List,
	ListItem,
	ListIcon,
	Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

function PriceWrapper({ children }: { children: ReactNode }) {
	return (
		<Box
			mb={4}
			shadow="base"
			borderWidth="1px"
			alignSelf={{ base: 'center', lg: 'flex-start' }}
			borderColor={useColorModeValue('gray.200', 'gray.500')}
			borderRadius={'xl'}>
			{children}
		</Box>
	);
}

export default function Pricing() {
	return (
		<Box py={12}>
			<VStack spacing={2} textAlign="center">
				<Heading as="h1" fontSize="4xl">
					Plans that fit your need
				</Heading>
				<Text fontSize="lg" color={'gray.500'}>
					Start with 3-day free trial. No credit card needed. Cancel at
					anytime.
				</Text>
			</VStack>
			<Stack
				direction={{ base: 'column', md: 'row' }}
				textAlign="center"
				justify="center"
				spacing={{ base: 4, lg: 10 }}
				py={10}>
				<PriceWrapper>
					<Box py={4} px={12}>
						<Text fontWeight="500" fontSize="2xl">
							Starter
						</Text>
						<HStack justifyContent="center">
							<Text fontSize="3xl" fontWeight="600">
								Nu.
							</Text>
							<Text fontSize="5xl" fontWeight="900">
								1500
							</Text>
							<Text fontSize="3xl" color="gray.500">
								/month
							</Text>
						</HStack>
					</Box>
					<VStack
						bg={useColorModeValue('gray.50', 'gray.700')}
						py={4}
						borderBottomRadius={'xl'}>
						<List spacing={3} textAlign="start" px={12}>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								AI assisted capture (take a picture and automatically record details)
							</ListItem>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								300 record uploads/month
							</ListItem>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								24/7 customer support
							</ListItem>
						</List>
						<Box w="80%" pt={7}>
							<Button w="full" variant="outline">
								Start trial
							</Button>
						</Box>
					</VStack>
				</PriceWrapper>

				<PriceWrapper>
					<Box position="relative">
						<Box
							position="absolute"
							top="-16px"
							left="50%"
							style={{ transform: 'translate(-50%)' }}>
							<Text
								textTransform="uppercase"
								bg={useColorModeValue('red.300', 'red.700')}
								px={3}
								py={1}
								color={useColorModeValue('gray.900', 'gray.300')}
								fontSize="sm"
								fontWeight="600"
								rounded="xl">
							Best Value
							</Text>
						</Box>
						<Box py={4} px={12}>
							<Text fontWeight="500" fontSize="2xl">
								Growth
							</Text>
							<VStack>
							<HStack textDecoration={'line-through'} justifyContent="center">
								<Text fontSize="3xl" fontWeight="600">
									Nu.
								</Text>
								<Text fontSize="5xl" textDecoration={'line-through'} fontWeight="900">
									2500
								</Text>
								<Text fontSize="3xl" color="gray.500">
									/month
								</Text>
							</HStack>
								<HStack>
								<Text fontSize="xl" fontWeight="600">
									Opening discount of
								</Text>
									<Text fontSize="xl" fontWeight="800">
										20%
									</Text>
								</HStack>
								<HStack justifyContent="center">
									<Text fontSize="3xl" fontWeight="600">
										Nu.
									</Text>
									<Text fontSize="5xl" fontWeight="900">
										2000
									</Text>
									<Text fontSize="3xl" color="gray.500">
										/month
									</Text>
								</HStack>
							</VStack>
						</Box>
						<VStack
							bg={useColorModeValue('gray.50', 'gray.700')}
							py={4}
							borderBottomRadius={'xl'}>
							<List spacing={3} textAlign="start" px={12}>
								<ListItem>
									<ListIcon as={FaCheckCircle} color="green.500" />
									AI assisted capture (take a picture and automatically record details)
								</ListItem>
								<ListItem>
									<ListIcon as={FaCheckCircle} color="green.500" />
									Unlimited record uploads a month
								</ListItem>
								<ListItem>
									<ListIcon as={FaCheckCircle} color="green.500" />
									24/7 customer service
								</ListItem>
							</List>
							<Box w="80%" pt={7}>
								<Button w="full" >
									Start trial
								</Button>
							</Box>
						</VStack>
					</Box>
				</PriceWrapper>
				<PriceWrapper>
					<Box py={4} px={12}>
						<Text fontWeight="500" fontSize="2xl">
							Business
						</Text>
						<HStack justifyContent="center">
							<Text fontSize="3xl" fontWeight="600">
								Nu.
							</Text>
							<Text fontSize="5xl" fontWeight="900">
								6500
							</Text>
							<Text fontSize="3xl" color="gray.500">
								/month
							</Text>
						</HStack>
					</Box>
					<VStack
						bg={useColorModeValue('gray.50', 'gray.700')}
						py={4}
						borderBottomRadius={'xl'}>
						<List spacing={3} textAlign="start" px={12}>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								AI assisted capture (take a picture and automatically record details)
							</ListItem>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								Unlimited record uploads a month
							</ListItem>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								24/7 customer service
							</ListItem>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								Custom feature requests
							</ListItem>
							<ListItem>
								<ListIcon as={FaCheckCircle} color="green.500" />
								Custom integration
							</ListItem>
						</List>
						<Box w="80%" pt={7}>
							<Button w="full" variant="outline">
								Start trial
							</Button>
						</Box>
					</VStack>
				</PriceWrapper>
			</Stack>
		</Box>
	);
}
