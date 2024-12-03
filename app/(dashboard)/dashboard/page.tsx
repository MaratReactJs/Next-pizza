'use client';
import UnauthorizedPage from '@/app/(root)/not-auth/page';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
	const { data: session } = useSession();
	console.log('session', session);
	if (!session || session.user.role !== 'ADMIN') return <UnauthorizedPage />;
	return <div>Dashboard</div>;
}
