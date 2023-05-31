import axios from '@/lib/axios';

export interface GetAgentListResponse {
  agent_list: {
    id: number;
    name: string;
    email: string;
    profile_image_full_path: string;
    office_name: string;
    cell_phone: string;
    office_phone: string;
    full_road_name_address: string;
    full_jibun_address: string;
    registration_number: string;
    description: string;
    unit: number;
    distance_from_listing: number;
    performance_score: number;
  }[];
}

interface Request {
  listing_id: number;
}

export default async function getAgentList(req: Request) {
  try {
    const { data } = await axios.post('/listing/agent/list', {
      ...req,
    });
    return data as GetAgentListResponse;
  } catch (e) {
    return null;
  }
}
