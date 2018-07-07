export interface Product {
	key?: string;
	uid: any;
	name: string;
	// variant: {};
	price: any;
	description: string;
	date: any;
}

export interface Variant {
	name: string;
	price: any;
	description: string;
}