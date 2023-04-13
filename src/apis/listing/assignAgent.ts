import axios from '@/lib/axios';

export type AssignAgentResponse = {
  owners: string[] | null;
  verified: boolean;
} & ErrorResponse;

export default async function assignAgent(req: {
  listing_id: number;
  user_selected_agent_id: number;
}): Promise<AssignAgentResponse | null> {
  try {
    const { data } = await axios.post('/listing/agent/assign', req);
    return data;
  } catch (e) {
    return null;
  }
}
