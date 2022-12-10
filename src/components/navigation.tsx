import {
	Box,
	Button,
	Collapse,
	Flex,
	Icon,
	IconButton,
	Image,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger, Spacer,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import {ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon, SunIcon} from '@chakra-ui/icons';
import Logo from '../assets/images/hacket_logo.png';
import {signOut} from 'firebase/auth';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {UserContext} from './user-context';
import {auth} from '../firebase.config';
import {AUTHENTICATED_NAV_ITEMS} from '../constants/misc.constants';
import {NavItem} from '../types/misc.types';

export default function Navigation() {
	const {isOpen, onToggle} = useDisclosure();
	const navigate = useNavigate();
	const {user} = useContext(UserContext);
	const toast = useToast();

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			toast({
				title: 'Signed out',
				status: 'success',
				isClosable: true
			});
			navigate(`/`);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{base: 2}}
				px={{base: 4}}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}>
				<Flex
					flex={{base: -2, md: 'auto'}}
					ml={{base: -2}}
					display={{base: 'flex', md: 'none'}}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{base: -2}} justify={{base: 'center', md: 'start'}}>
					<Image style={{cursor: 'pointer'}} onClick={() => navigate('/')} htmlHeight={'20'} htmlWidth={'30'}
						   src={Logo}/>
					<Flex display={{base: 'none', md: 'flex'}} ml={10}>
						<DesktopNav isAuthenticated={!!user}/>
					</Flex>
				</Flex>

				<Spacer/>
					<Button mr={'6px'} variant={'ghost'} onClick={() => {
					}}>
						{/*{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}*/}
						<SunIcon/>
					</Button>
					<Stack
						flex={{base: 0, md: 0}}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}>
						{!user ? <><Button
								as={RouterLink}
								to={`/sign-in`}
								fontSize={'sm'}
								fontWeight={400}
								variant={'link'}
							>
								Sign In
							</Button>
								<Button
									display={{base: 'none', md: 'inline-flex'}}
									as={RouterLink}
									to={`/sign-up`}
									fontSize={'sm'}
									fontWeight={600}
									color={'white'}
									bg={'orange.400'}
									_hover={{
										bg: 'orange.500'
									}}>
									Sign Up
								</Button></> :
							<Button
								fontSize={'sm'}
								fontWeight={400}
								variant={'link'}
								onClick={handleSignOut}
							>
								Sign Out
							</Button>
						}
					</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav isAuthenticated={!!user}/>
			</Collapse>
		</Box>
	);
}

const DesktopNav = (props: {isAuthenticated: boolean}) => {
	const {isAuthenticated} = props;
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{(isAuthenticated ? AUTHENTICATED_NAV_ITEMS : []).map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								as={RouterLink}
								p={2}
								to={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			as={RouterLink}
			to={href ?? '#'}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'pink.400' }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}>
					<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = (props: { isAuthenticated: boolean}) => {
	const {isAuthenticated} = props
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}>
			{(isAuthenticated ? AUTHENTICATED_NAV_ITEMS : []).map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={RouterLink}
				to={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
					children.map((child) => (
						<Link as={RouterLink}  key={child.label} py={2} to={child.href as string}>
							{child.label}
						</Link>
					))}
				</Stack>
			</Collapse>
		</Stack>
	);
};
