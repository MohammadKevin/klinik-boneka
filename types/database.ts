export interface ProcedureItem {
  id: string;
  code: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  materials: string[];
  steps: string[];
  timeframe: string;
  priceEstimate: string;
  waMessage: string;
  orderIndex?: number;
}

export interface CaseStudyItem {
  id: string;
  caseNo: string;
  title: string;
  vintage: string;
  owner: string;
  location: string;
  beforeDiagnosis: string;
  afterRestoration: string;
  duration: string;
  ownerNote: string;
  beforeImg: string;
  afterImg: string;
  orderIndex?: number;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  scope: string[];
  materialsIncluded: string;
  highlighted?: boolean;
  waMessage: string;
  orderIndex?: number;
}

export interface WorkshopSettings {
  brandName: string;
  phone: string;
  whatsapp: string;
  address: string;
  addressNote: string;
  hoursWeekday: string;
  hoursWeekend: string;
  announcementText?: string;
  googleMapsUrl: string;
}
