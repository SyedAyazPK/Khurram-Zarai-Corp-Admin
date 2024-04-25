import { getCustomers } from 'app/store/customerSlice';
import {
  getOrdersMonthly,
  getOrdersYearly,
  getSalesMonthly,
  getTopCategories,
} from 'app/store/reportSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrderWidget from './OrderWidget';
import ShippingWidget from './ShippingWidget';
import SummaryWidget from './SummaryWidget';
import TopCategoriesWidget from './TopCategoriesWidget';
import TopWidget from './TopWidget';
import UsersWidget from './UsersWidget';

export const Reports = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getOrdersYearly());
  //   dispatch(getOrdersMonthly());
  //   dispatch(getSalesMonthly());
  //   dispatch(getTopCategories());
  //   dispatch(getCustomers());
  // }, []);
  return (
    <div className='my-24 p-32'>
      <div className='sm:col-span-2 md:col-span-4'>
        <TopWidget />
      </div>
      <div className='my-16'>
        <OrderWidget />
      </div>

      {/* <div className='my-16 md:flex justify-between w-full'>
        <div>
          <ShippingWidget />
        </div>
        <div>
          <TopCategoriesWidget />
        </div>
      </div> */}

      {/* <SummaryWidget /> */}
    </div>
  );
};
