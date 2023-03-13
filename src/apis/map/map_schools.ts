import axios from '@/lib/axios';

export interface GetSchoolResponse {
  list: {
    school_name: string;
    school_id: string;
    long: number;
    lat: number;
    school_type: string;
  }[];
}

export default async function getSchools({
  schoolTypes,
  bounds,
}: {
  schoolTypes: string;
  bounds: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
    nw: { lat: number; lng: number };
    se: { lat: number; lng: number };
  };
}) {
  try {
    const { data } = await axios.post('/map/schools', {
      ne_lat: bounds.ne.lat,
      ne_long: bounds.ne.lng,
      nw_lat: bounds.nw.lat,
      nw_long: bounds.nw.lng,
      sw_lat: bounds.sw.lat,
      sw_long: bounds.sw.lng,
      se_lat: bounds.se.lat,
      se_long: bounds.se.lng,
      school_types: schoolTypes,
    });
    return data as GetSchoolResponse;
  } catch (e) {
    return null;
  }
}
