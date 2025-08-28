'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import CustomerView from '@/components/Customers/CustomerView';
import CustomerEdit from '@/components/Customers/CustomerEdit';

export default function CustomerDetail() {
  const searchParams = useSearchParams();
  const editMode = searchParams.get('edit') === 'true';
  const [isEdit, setIsEdit] = useState(editMode);

  return (
    <AuthGuard>
      <div>
        {isEdit ? (
          <CustomerEdit />
        ) : (
          <CustomerView onEdit={() => setIsEdit(true)} />
        )}
      </div>
    </AuthGuard>
  );
}