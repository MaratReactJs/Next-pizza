import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	const products = await prisma.product.findMany();

	return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
	const data = await req.json();

	const product = await prisma.product.create({
		data,
	});

	return NextResponse.json(product);
}
