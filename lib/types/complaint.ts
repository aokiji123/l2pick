export type ComplaintResponse = {
  id: number;
  user_id: number;
  server_id: number;
  reason: string;
  status: string;
  admin_comment: string;
  moderated_at: string;
  moderated_by: number;
  created_at: string;
  updated_at: string;
};
