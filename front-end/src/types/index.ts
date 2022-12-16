export type TNotification = {
  show: boolean;
  message: string;
  setNotificationState: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TSearchResult = {
  display_name: string;
  id: string;
};

export type TSearchItem = {
  byName: TSearchResult[];
  byId: TSearchResult[];
};

export type TBalance = {
  id: string;
  user_id: string;
  display_name: string;
  balance: number;
};
