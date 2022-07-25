export type Flag = string;
export type Likes = number;
export type Message = {
  id: string;
  dateHh: number;
  dateMm: number;
  dateSs: number;
  dateFull: string;
  userID: string;
  userLogin: string;
  messageBody: string;
  deletedText: string;
  isDeleted: boolean;
  wasDeleted: boolean;
  likes: number | null;
};
export type FlagAsProps = {
  flag: Flag;
};
export type MessageAsProps = {
  message: Message;
};
export type MessageItemProps = FlagAsProps & MessageAsProps;
export type LikesProps = {
  likes: Likes;
  asyncRequestToServer: (arg: string) => void;
};
export type LocationType = {
  state?: any;
  from?: {
    pathname: string;
  };
};
