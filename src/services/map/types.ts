interface HakgudoItem {
  hakgudo_id: string;
  hakgudo_name: string;
  polygons: string;
}

export interface MapHakgudoResponse {
  list: HakgudoItem[];
}
