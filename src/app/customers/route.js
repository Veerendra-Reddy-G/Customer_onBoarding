import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
let customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'completed', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'draft', phone: '098-765-4321' },
];

export async function GET() {
  return NextResponse.json(customers);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newCustomer = {
      id: customers.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}