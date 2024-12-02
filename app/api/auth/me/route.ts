import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shared/constants/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // проверить

export async function GET(req: Request) {
	try {
		const session = await getServerSession({ req, ...authOptions });

		if (!session) {
			return NextResponse.json(
				{ message: 'Вы не авторизованы' },
				{ status: 401 }
			);
		}

		const data = await prisma.user.findUnique({
			where: {
				id: Number(session.user.id),
			},
			select: {
				fullName: true,
				email: true,
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: '[USER_GET] Server error' },
			{ status: 500 }
		);
	}
}
