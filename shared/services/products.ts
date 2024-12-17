import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

// Функция для поиска продуктов
export const search = async (query: string): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(
		ApiRoutes.SEARCH_PRODUCTS,
		{
			params: { query },
		}
	);
	return data; // Возвращаем только данные
};

// Функция для получения всех продуктов
export const getAll = async (): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(ApiRoutes.PRODUCTS);
	return data;
};

// Функция для создания продукта
export const createProduct = async (): Promise<Product> => {
	const { data } = await axiosInstance.post<Product>(ApiRoutes.PRODUCTS);
	return data;
};
