export interface Product {
	key?: string;
	uid: any;
	name: string;
	owner_name: string;
	price: any;
	variant?: any;
	description: string;
	date: any;
}

export interface Variant {
	name: string;
	price: any;
}