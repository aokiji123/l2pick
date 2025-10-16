export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  vote_reward_token: string;
  ip: string;
  created_at: string;
};

export type ChangeUserPassword = {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
};
