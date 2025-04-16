import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Badge
} from '@chakra-ui/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import DashboardLayout from './DashboardLayout';
// import { getUserProfile, getJobs, getCreditHistory } from '../api/api';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock chart data - in a real app, you would generate this from actual data
  const chartData = [
    { name: 'Mon', jobs: 3, credits: 30 },
    { name: 'Tue', jobs: 5, credits: 45 },
    { name: 'Wed', jobs: 2, credits: 25 },
    { name: 'Thu', jobs: 0, credits: 0 },
    { name: 'Fri', jobs: 4, credits: 15 },
    { name: 'Sat', jobs: 3, credits: 10 },
    { name: 'Sun', jobs: 2, credits: 13 },
  ];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const [userResponse, jobsResponse, creditsResponse] = await Promise.all([
          getUserProfile(),
          getJobs(),
          getCreditHistory()
        ]);
        
        setUserData(userResponse.data);
        setJobs(jobsResponse.data);
        setCreditHistory(creditsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <Box p={4}>Loading...</Box>
      </DashboardLayout>
    );
  }
  
  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const pendingJobs = jobs.filter(job => job.status === 'pending').length;
  
  return (
    <DashboardLayout>
      <Box p={4}>
        <Heading mb={6}>Dashboard</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Available Credits</StatLabel>
            <StatNumber>{userData?.credits || 0}</StatNumber>
            <StatHelpText>Last purchase: 50 credits</StatHelpText>
          </Stat>
          
          <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Jobs Submitted</StatLabel>
            <StatNumber>{jobs.length}</StatNumber>
            <StatHelpText>+2 from last week</StatHelpText>
          </Stat>
          
          <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Jobs Completed</StatLabel>
            <StatNumber>{completedJobs}</StatNumber>
            <StatHelpText>
              {jobs.length > 0 ? `${Math.round((completedJobs / jobs.length) * 100)}% completion rate` : 'No jobs yet'}
            </StatHelpText>
          </Stat>
          
          <Stat p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
            <StatLabel>Pending Jobs</StatLabel>
            <StatNumber>{pendingJobs}</StatNumber>
            <StatHelpText>Est. completion: 2 hours</StatHelpText>
          </Stat>
        </SimpleGrid>
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Box p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
            <Heading size="md" mb={4}>Usage Overview</Heading>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="jobs" fill="#8884d8" name="Jobs" />
                  <Bar yAxisId="right" dataKey="credits" fill="#82ca9d" name="Credits Used" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          
          <Box p={4} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
            <Heading size="md" mb={4}>Recent Activity</Heading>
            <Tabs>
              <TabList>
                <Tab>Jobs</Tab>
                <Tab>Credits</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    {jobs.slice(0, 5).map((job) => (
                      <HStack key={job.id} justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{job.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {job.created_at} • {job.credits} credits
                          </Text>
                        </VStack>
                        <Badge colorScheme={job.status === 'completed' ? 'green' : 'yellow'}>
                          {job.status}
                        </Badge>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    {creditHistory.slice(0, 5).map((item) => (
                      <HStack key={item.id} justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">
                            {item.type === 'purchase' ? 'Credit Purchase' : 'Credit Usage'}
                          </Text>
                          <Text fontSize="sm" color="gray.500">{item.date}</Text>
                        </VStack>
                        <Text 
                          fontWeight="medium" 
                          color={item.type === 'purchase' ? 'green.500' : 'red.500'}
                        >
                          {item.type === 'purchase' ? '+' : ''}{item.amount}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </SimpleGrid>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;