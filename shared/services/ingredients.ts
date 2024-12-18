import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { Ingredient } from '@prisma/client';

export const getAll = async (): Promise<Ingredient[]> => {
	return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};

// Функция для создания ингредиента
export const createIngredient = async (formData: {
	name: string;
	imageUrl: string;
	price: number;
}): Promise<Ingredient> => {
	const { data } = await axiosInstance.post<Ingredient>(
		ApiRoutes.INGREDIENTS,
		formData
	);
	console.log('data', data);
	return data;
};
