import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  HStack,
  Avatar,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton
} from '@chakra-ui/react';
import { 
  FiHome, 
  FiCreditCard, 
  FiFileText, 
  FiSettings, 
  FiLogOut,
  FiMenu 
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function DashboardLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Credits', icon: FiCreditCard, path: '/credits' },
    { name: 'Jobs', icon: FiFileText, path: '/jobs' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
  ];
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link to={item.path}>
        <HStack
          px={4}
          py={3}
          borderRadius="md"
          bg={isActive ? 'blue.500' : 'transparent'}
          color={isActive ? 'white' : 'gray.700'}
          _hover={{ bg: isActive ? 'blue.600' : 'gray.100' }}
        >
          <Icon as={item.icon} />
          <Text>{item.name}</Text>
        </HStack>
      </Link>
    );
  };
  
  const Sidebar = () => (
    <VStack align="stretch" spacing={1} p={4}>
      {navItems.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
      <Button 
        variant="ghost" 
        leftIcon={<FiLogOut />} 
        justifyContent="flex-start" 
        onClick={handleLogout}
        mt={8}
      >
        Logout
      </Button>
    </VStack>
  );
  
  return (
    <Flex h="100vh">
      {/* Desktop Sidebar */}
      <Box
        w="250px"
        h="full"
        borderRightWidth={1}
        display={{ base: 'none', md: 'block' }}
      >
        <VStack align="center" p={4} borderBottomWidth={1}>
          <Text fontSize="xl" fontWeight="bold">JobCredit</Text>
        </VStack>
        <Sidebar />
      </Box>
      
      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={1}>JobCredit</DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      {/* Main Content */}
      <Flex direction="column" flex={1} overflow="auto">
        <Flex
          align="center"
          justify="space-between"
          px={4}
          py={2}
          borderBottomWidth={1}
        >
          <IconButton
            icon={<FiMenu />}
            variant="ghost"
            onClick={onOpen}
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
          />
          <HStack spacing={4} ml="auto">
            <Text>{currentUser?.email}</Text>
            <Avatar size="sm" name={currentUser?.email} />
          </HStack>
        </Flex>
        <Box p={4} flex={1}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default DashboardLayout;