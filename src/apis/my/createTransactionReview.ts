import axios from '@/lib/axios';

interface Request {
  listingContractID: number;
  ratingText: string;
  recommendations: string;
  freeFeedback: string;
}

export default async function createTransactionReview(args: Request) {
  try {
    return await axios.post('/review/create', {
      listing_contract_id: args.listingContractID,
      rating_text: args.ratingText,
      recommendations: args.recommendations,
      free_feedback: args.freeFeedback,
    });
  } catch (e) {
    return null;
  }
}
