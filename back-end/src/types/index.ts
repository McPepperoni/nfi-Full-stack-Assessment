export type TUser = {
  id: string;
  display_name: string;
};

export type TBalance = {
  id: string;
  user_id: string;
  balance: number;
};

export type TResponse = {
  response: number;
  message: string;
  data: any;
};
