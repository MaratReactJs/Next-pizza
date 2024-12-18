import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, Input, Popover } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useIngredients } from '@/shared/hooks';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select';
import { PopoverContent, PopoverTrigger } from '../../ui/popover';
import { axiosInstance } from '@/shared/services/instance';
import { Api } from '@/shared/services/api-client';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
}

export const AddIngredientModal: React.FC<Props> = ({
	isModalOpen,
	setIsModalOpen,
	className,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		imageUrl: '',
		price: 0,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await Api.ingredients.createIngredient(formData);
		} catch (error) {
			console.error('Ошибка при добавлении ингредиента:', error);
			alert('Произошла ошибка');
		}
	};
	return (
		<Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}>
				<form onSubmit={handleSubmit}>
					<Input
						type="text"
						name="name"
						value={formData.name}
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
					/>

					<Input
						type="number"
						name="price"
						value={formData.price}
						onChange={(e) =>
							setFormData({
								...formData,
								price: Number(e.target.value),
							})
						}
					/>

					<Input
						type="text"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={(e) =>
							setFormData({
								...formData,
								imageUrl: e.target.value,
							})
						}
					/>
					<Button>Добавить ингредиент</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
