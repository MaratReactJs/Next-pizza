'use client';
import UnauthorizedPage from '@/app/(root)/not-auth/page';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Dashboard() {
	const { data: session } = useSession();
	console.log('session', session);

	if (!session || session.user.role !== 'ADMIN') return <UnauthorizedPage />;

	return (
		<div className="flex ">
			<Link href="/dashboard/products">
				<div className="border border-primary rounded-lg m-2 p-[100px] w-[200px] flex items-center justify-center cursor-pointer">
					Products
				</div>
			</Link>

			<div className="border border-primary rounded-lg m-2 p-[100px] w-[200px] flex items-center justify-center cursor-pointer">
				Users
			</div>

			<div className="border border-primary rounded-lg m-2 p-[100px] w-[200px] flex items-center justify-center cursor-pointer">
				Orders
			</div>
		</div>
	);
}
