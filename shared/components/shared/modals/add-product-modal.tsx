import React from 'react';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import router from 'next/router';
import { cn } from '@/shared/lib/utils';

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
	return (
		<Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}></DialogContent>
		</Dialog>
	);
};
