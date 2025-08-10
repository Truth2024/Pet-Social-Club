export type Chat = {
  id: string;
  members: string[];
  createdAt: number;
  lastMessage?: {
    id: string;
    text: string;
    from: string;
    createdAt: number;
  };
};

export type ChatMessage = {
  lastMessage?: {
    id: string;
    text: string;
    from: string;
    createdAt: number;
  };
  user: string;
};
