import axios from '@/lib/axios';

export type GetDanjiMapSchools = {
  list: {
    school_name: string;
    school_id: string;
    school_type: string;
    long: number;
    lat: number;
    distance_in_km: number;
  }[];
};

export default async function getDanjiSchoolsMarker({
  danjiId,
  realestateType,
  schoolTypes,
}: {
  danjiId?: number | null;
  realestateType?: number | null;
  schoolTypes?: string | null;
}) {
  if (!danjiId || !schoolTypes || !realestateType) return null;

  try {
    const { data } = await axios.post('/danji/map/schools', {
      danji_id: danjiId,
      realestate_type: Number(realestateType),
      school_types: schoolTypes,
    });

    return data as GetDanjiMapSchools;
  } catch (e) {
    return null;
  }
}
