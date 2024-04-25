import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import UsersWidget from './UsersWidget';
import SubscriptionWidget from './SubscriptionWidget';
import { selectCustomers } from 'app/store/customerSlice';
import { selectOrdersYearly, selectSalesYearly } from 'app/store/reportSlice';

function TopWidget() {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const ordersYearly = useSelector(selectOrdersYearly);
  const salesYearly = useSelector(selectSalesYearly);

  const widgets = {
    githubIssues: {
      overview: {
        'this-week': {
          'new-issues': 214,
          'closed-issues': 75,
          fixed: 3,
          'wont-fix': 4,
          're-opened': 8,
          'needs-triage': 6,
        },
        'last-week': {
          'new-issues': 197,
          'closed-issues': 72,
          fixed: 6,
          'wont-fix': 11,
          're-opened': 6,
          'needs-triage': 5,
        },
      },
      ranges: {
        'this-week': 'This Week',
        'last-week': 'Last Week',
      },
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: {
        'this-week': [
          {
            name: 'New issues',
            type: 'line',
            data: [42, 28, 43, 34, 20, 25, 22],
          },
          {
            name: 'Closed issues',
            type: 'column',
            data: [11, 10, 8, 11, 8, 10, 17],
          },
        ],
        'last-week': [
          {
            name: 'New issues',
            type: 'line',
            data: [37, 32, 39, 27, 18, 24, 20],
          },
          {
            name: 'Closed issues',
            type: 'column',
            data: [9, 8, 10, 12, 7, 11, 15],
          },
        ],
      },
    },
  };
  const { overview, series, range, labels } = widgets?.githubIssues;
  // const currentRange = Object.keys(ranges)[tabValue];
  const ranges = [{ key: 'year', label: 'This Year' }];

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }

  return (
    <Paper className='flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden'>
      <div className='flex flex-col sm:flex-row items-start justify-between'>
        <Typography className='text-lg font-medium tracking-tight leading-6 truncate'>
          Reports
        </Typography>
        <div className='mt-12 sm:mt-0 sm:ml-8'>
          <Tabs
            value={tabValue}
            onChange={(ev, value) => setTabValue(value)}
            indicatorColor='secondary'
            textColor='inherit'
            variant='scrollable'
            scrollButtons={false}
            className='-mx-4 min-h-40'
            classes={{
              indicator: 'flex justify-center bg-transparent w-full h-full',
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
                  className='w-full h-full rounded-full opacity-20'
                />
              ),
            }}
          >
            {ranges.map((range) => (
              <Tab
                className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12'
                disableRipple
                key={range.key}
                label={range.label}
              />
            ))}
          </Tabs>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16'>
        <div className='md:flex flex-auto'>
          <div className='mr-8'>
            <UsersWidget />
          </div>

          {/* <SubscriptionWidget /> */}
        </div>
        <div className='flex flex-col'>
          <Typography className='font-medium' color='text.secondary'>
            Overview
          </Typography>
          <div className='flex-auto grid grid-cols-4 gap-16 mt-24'>
            <div className='col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800'>
              <Typography className='text-5xl sm:text-7xl font-semibold leading-none tracking-tight'>
                {salesYearly
                  .map((sale) => sale.quantity)
                  .reduce((a, b) => a + b, 0)}
              </Typography>
              <Typography className='mt-4 text-sm sm:text-lg font-medium'>
                Total Sales
              </Typography>
            </div>
            <div className='col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800'>
              <Typography className='text-5xl sm:text-7xl font-semibold leading-none tracking-tight'>
                {ordersYearly
                  .map((order) => order.quantity)
                  .reduce((a, b) => a + b, 0)}
              </Typography>
              <Typography className='mt-4 text-sm sm:text-lg font-medium'>
                Total Orders
              </Typography>
            </div>
            {/* <Box
              sx={{
                backgroundColor: 'lightgreen',
              }}
              className='col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl'
            >
              <Typography className='text-5xl font-semibold leading-none tracking-tight'>
                $2,387
              </Typography>
              <Typography className='mt-4 text-sm font-medium text-center'>
                Net Sales
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'lightblue',
              }}
              className='col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl'
            >
              <Typography className='text-5xl font-semibold leading-none tracking-tight'>
                350
              </Typography>
              <Typography className='mt-4 text-sm font-medium text-center'>
                Average Daily net Sales
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'lightpink',
              }}
              className='col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl'
            >
              <Typography className='text-5xl font-semibold leading-none tracking-tight'>
                7 Days
              </Typography>
              <Typography className='mt-4 text-sm font-medium text-center'>
                Order Placed
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'whitesmoke',
              }}
              className='col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl'
            >
              <Typography className='text-5xl font-semibold leading-none tracking-tight'>
                850
              </Typography>
              <Typography className='mt-4 text-sm font-medium text-center'>
                Items Purchased
              </Typography>
            </Box> */}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(TopWidget);
