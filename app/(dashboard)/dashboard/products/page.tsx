'use client';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AddProductModal } from '@/shared/components/shared/modals/add-product-modal';
import Link from 'next/link';

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);

	useEffect(() => {
		async function fetchProducts() {
			const data = await Api.products.getAll();
			setProducts(data);
		}

		fetchProducts();
	}, []);
	if (isModalOpen)
		return (
			<AddProductModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				className="w-full h-[90vh]"
			/>
		);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<div className="flex gap-[30%] mb-5">
				<Link href="/dashboard">
					<button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ml-auto">
						Вернуться
					</button>
				</Link>

				<h1 className="text-2xl font-bold mb-4">Список товаров</h1>

				<button
					onClick={openModal}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ml-auto">
					Добавить товар
				</button>
			</div>
			<table className="min-w-full bg-white rounded-lg shadow-lg">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">Название</th>
						<th className="py-3 px-6 text-left">Картинка</th>
						<th className="py-3 px-6 text-center">Действия</th>
					</tr>
				</thead>
				<tbody className="text-gray-700 text-sm">
					{products.map((product) => (
						<tr
							key={product.id}
							className="border-b border-gray-200 hover:bg-gray-100">
							<td className="py-3 px-6 text-left">
								{product.name}
							</td>
							<td className="py-3 px-6 text-left">
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={50}
									height={50}
								/>
							</td>
							<td className="py-3 px-6 text-center">
								<button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{products.length === 0 && (
				<p className="text-center text-gray-500 mt-4">Список пуст</p>
			)}
		</div>
	);
}
