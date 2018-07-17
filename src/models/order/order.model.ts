export interface Order {
	key: string;
	product_name: string;
	to_name: string;
	from_name: string;
	total_price: any;
	total_quantity: any;
	variant_order: any[];
	date: any;
	to_uid: string;
	from_uid: string;
	status: string;
}