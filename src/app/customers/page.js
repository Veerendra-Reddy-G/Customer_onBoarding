'use client';

//import AuthGuard from '@/components/AuthGuard';
import CustomerList from '../components/Customers/CustomerList';

export default function Customers() {
  return (
    //  <AuthGuard>
      <div>
        <h1>Customer Management</h1>
        <CustomerList />
      </div>
    //  </AuthGuard>
  );
}