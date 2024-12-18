'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AddProductModal } from '@/shared/components/shared/modals/add-product-modal';
import Link from 'next/link';
import { useIngredients } from '@/shared/hooks';
import { AddIngredientModal } from '@/shared/components/shared/modals/add-ingredient-modal';

export default function Products() {
	const { ingredients, loading } = useIngredients();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);

	if (isModalOpen)
		return (
			<AddIngredientModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				className="w-full h-[60vh]"
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

				<h1 className="text-2xl font-bold mb-4">Список ингредиентов</h1>

				<button
					onClick={openModal}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ml-auto">
					Добавить ингредиент
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
					{ingredients.length > 0 &&
						ingredients.map((ingredient) => (
							<tr
								key={ingredient.id}
								className="border-b border-gray-200 hover:bg-gray-100">
								<td className="py-3 px-6 text-left">
									{ingredient.name}
								</td>
								<td className="py-3 px-6 text-left">
									<Image
										src={ingredient.imageUrl}
										alt={ingredient.name}
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
			{ingredients.length === 0 && (
				<p className="text-center text-gray-500 mt-4">Список пуст</p>
			)}
		</div>
	);
}
