export interface User {
	key?: string;
	uid: any;
	name: string;
	email: string;
	password: string;
	cpassword: string;
}

export interface Circle {
	followee_name: string;
	followee_uid: string;
	follower_name: string;
	folower_uid: string;
	status: string;
}