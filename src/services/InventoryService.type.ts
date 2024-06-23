export interface IProduct {
	name: string;
}

export interface IInventoryItem extends IProduct {
	quantity: number;
}