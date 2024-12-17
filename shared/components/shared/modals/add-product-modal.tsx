import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, Popover } from '../../ui';
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

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
}

export const AddProductModal: React.FC<Props> = ({
	isModalOpen,
	setIsModalOpen,
	className,
}) => {
	const { ingredients, loading } = useIngredients();
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
		[]
	);

	console.log(selectedIngredients, 'selectedIngredients');

	const toggleIngredient = (name: string) => {
		setSelectedIngredients((prev) =>
			prev.includes(name)
				? prev.filter((ingredientName) => ingredientName !== name)
				: [...prev, name]
		);
	};

	const [formData, setFormData] = useState({
		id: 0,
		name: '',
		imageUrl: '',
		categoryId: 0,
		items: [],
		ingredients: selectedIngredients,
	});

	useEffect(() => {
		setFormData((prev) => ({ ...prev, ingredients: selectedIngredients }));
	}, [selectedIngredients]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormData((prev) => ({ ...prev, ingredients: selectedIngredients }));
		console.log(formData, 'form');
	};
	return (
		<Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}>
				<form onSubmit={handleSubmit}>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-[30%]">
								{selectedIngredients.length > 0
									? `Выбрано: ${selectedIngredients.length}`
									: 'Выберите ингредиенты'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-64">
							<div className="flex flex-col gap-2">
								{ingredients.map((ingredient) => (
									<label
										key={ingredient.id}
										className="flex items-center gap-2">
										<Checkbox
											checked={selectedIngredients.includes(
												ingredient.name
											)}
											onCheckedChange={() =>
												toggleIngredient(
													ingredient.name
												)
											}
										/>
										{ingredient.name}
									</label>
								))}
							</div>
						</PopoverContent>
					</Popover>
					<div className="mt-4 flex gap-2">
						<h4>Выбранные ингредиенты:</h4>
						{selectedIngredients.length > 0 ? (
							<ul className="flex gap-2">
								{selectedIngredients.map((name) => {
									const ingredient = ingredients.find(
										(item) => item.name === name
									);
									return (
										<li
											key={
												name
											}>{`${ingredient?.name},`}</li>
									);
								})}
							</ul>
						) : (
							<p>Ничего не выбрано</p>
						)}
					</div>
					<Button>отправить</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
