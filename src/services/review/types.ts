export interface TransactionReviewResponse {
  listing_contract_id: number;
  rating_text: string;
  recommendations: string;
  free_feedback: string;
}

export interface TransactionReviewParticipatorsInfoResponse {
  has_review: boolean;
  user_nickname: string;
  agent_name: string;
}
