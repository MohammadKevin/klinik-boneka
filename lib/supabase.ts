import { createClient } from "@supabase/supabase-js";
import {
  initialProcedures,
  initialCaseStudies,
  initialPricingPlans,
  initialSettings,
} from "./data-store";
import {
  ProcedureItem,
  CaseStudyItem,
  PricingPlanItem,
  WorkshopSettings,
} from "@/types/database";
import {
  isMysqlConfigured,
  getMysqlProcedures,
  saveMysqlProcedure,
  getMysqlCaseStudies,
  saveMysqlCaseStudy,
  getMysqlPricingPlans,
  getMysqlSettings,
} from "./db-mysql";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// In-memory runtime state for live updates when no external database is connected
let memoryProcedures: ProcedureItem[] = [...initialProcedures];
let memoryCaseStudies: CaseStudyItem[] = [...initialCaseStudies];
const memoryPricingPlans: PricingPlanItem[] = [...initialPricingPlans];
let memorySettings: WorkshopSettings = { ...initialSettings };

// ---------------- PROCEDURES ----------------
export async function getProcedures(): Promise<ProcedureItem[]> {
  if (isMysqlConfigured) {
    const mysqlData = await getMysqlProcedures();
    if (mysqlData && mysqlData.length > 0) return mysqlData;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("procedures")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          code: String(d.code),
          name: String(d.name),
          category: String(d.category),
          headline: String(d.headline),
          description: String(d.description),
          materials: (d.materials as string[]) || [],
          steps: (d.steps as string[]) || [],
          timeframe: String(d.timeframe),
          priceEstimate: String(d.price_estimate || d.priceEstimate),
          waMessage: String(d.wa_message || d.waMessage),
          orderIndex: Number(d.order_index || 0),
        }));
      }
    } catch {
      // Fallback
    }
  }
  return memoryProcedures;
}

export async function saveProcedure(procedure: ProcedureItem): Promise<ProcedureItem> {
  if (isMysqlConfigured) {
    await saveMysqlProcedure(procedure);
  }

  if (supabase) {
    try {
      const row = {
        id: procedure.id,
        code: procedure.code,
        name: procedure.name,
        category: procedure.category,
        headline: procedure.headline,
        description: procedure.description,
        materials: procedure.materials,
        steps: procedure.steps,
        timeframe: procedure.timeframe,
        price_estimate: procedure.priceEstimate,
        wa_message: procedure.waMessage,
        order_index: procedure.orderIndex || 1,
      };

      await supabase.from("procedures").upsert(row, { onConflict: "id" });
    } catch {
      // Fallback
    }
  }

  const existingIdx = memoryProcedures.findIndex((p) => p.id === procedure.id);
  if (existingIdx >= 0) {
    memoryProcedures[existingIdx] = procedure;
  } else {
    memoryProcedures.push(procedure);
  }
  return procedure;
}

export async function deleteProcedure(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from("procedures").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }
  memoryProcedures = memoryProcedures.filter((p) => p.id !== id);
  return true;
}

// ---------------- CASE STUDIES ----------------
export async function getCaseStudies(): Promise<CaseStudyItem[]> {
  if (isMysqlConfigured) {
    const mysqlData = await getMysqlCaseStudies();
    if (mysqlData && mysqlData.length > 0) return mysqlData;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          caseNo: String(d.case_no || d.caseNo),
          title: String(d.title),
          vintage: String(d.vintage),
          owner: String(d.owner),
          location: String(d.location),
          beforeDiagnosis: String(d.before_diagnosis || d.beforeDiagnosis),
          afterRestoration: String(d.after_restoration || d.afterRestoration),
          duration: String(d.duration),
          ownerNote: String(d.owner_note || d.ownerNote),
          beforeImg: String(d.before_img || d.beforeImg),
          afterImg: String(d.after_img || d.afterImg),
          orderIndex: Number(d.order_index || 0),
        }));
      }
    } catch {
      // Fallback
    }
  }
  return memoryCaseStudies;
}

export async function saveCaseStudy(item: CaseStudyItem): Promise<CaseStudyItem> {
  if (isMysqlConfigured) {
    await saveMysqlCaseStudy(item);
  }

  if (supabase) {
    try {
      const row = {
        id: item.id,
        case_no: item.caseNo,
        title: item.title,
        vintage: item.vintage,
        owner: item.owner,
        location: item.location,
        before_diagnosis: item.beforeDiagnosis,
        after_restoration: item.afterRestoration,
        duration: item.duration,
        owner_note: item.ownerNote,
        before_img: item.beforeImg,
        after_img: item.afterImg,
        order_index: item.orderIndex || 1,
      };

      await supabase.from("case_studies").upsert(row, { onConflict: "id" });
    } catch {
      // Fallback
    }
  }

  const existingIdx = memoryCaseStudies.findIndex((c) => c.id === item.id);
  if (existingIdx >= 0) {
    memoryCaseStudies[existingIdx] = item;
  } else {
    memoryCaseStudies.push(item);
  }
  return item;
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from("case_studies").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }
  memoryCaseStudies = memoryCaseStudies.filter((c) => c.id !== id);
  return true;
}

// ---------------- PRICING PLANS ----------------
export async function getPricingPlans(): Promise<PricingPlanItem[]> {
  if (isMysqlConfigured) {
    const mysqlData = await getMysqlPricingPlans();
    if (mysqlData && mysqlData.length > 0) return mysqlData;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          name: String(d.name),
          subtitle: String(d.subtitle),
          price: String(d.price),
          unit: String(d.unit),
          scope: (d.scope as string[]) || [],
          materialsIncluded: String(d.materials_included || d.materialsIncluded),
          highlighted: Boolean(d.highlighted),
          waMessage: String(d.wa_message || d.waMessage),
          orderIndex: Number(d.order_index || 0),
        }));
      }
    } catch {
      // Fallback
    }
  }
  return memoryPricingPlans;
}

export async function savePricingPlan(plan: PricingPlanItem): Promise<PricingPlanItem> {
  if (supabase) {
    try {
      const row = {
        id: plan.id,
        name: plan.name,
        subtitle: plan.subtitle,
        price: plan.price,
        unit: plan.unit,
        scope: plan.scope,
        materials_included: plan.materialsIncluded,
        highlighted: plan.highlighted || false,
        wa_message: plan.waMessage,
        order_index: plan.orderIndex || 1,
      };

      await supabase.from("pricing_plans").upsert(row, { onConflict: "id" });
    } catch {
      // Fallback
    }
  }

  const existingIdx = memoryPricingPlans.findIndex((p) => p.id === plan.id);
  if (existingIdx >= 0) {
    memoryPricingPlans[existingIdx] = plan;
  } else {
    memoryPricingPlans.push(plan);
  }
  return plan;
}

// ---------------- WORKSHOP SETTINGS ----------------
export async function getWorkshopSettings(): Promise<WorkshopSettings> {
  if (isMysqlConfigured) {
    const mysqlData = await getMysqlSettings();
    if (mysqlData) return mysqlData;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "main")
        .single();

      if (!error && data) {
        return {
          brandName: String(data.brand_name || data.brandName || initialSettings.brandName),
          phone: String(data.phone || initialSettings.phone),
          whatsapp: String(data.whatsapp || initialSettings.whatsapp),
          address: String(data.address || initialSettings.address),
          addressNote: String(data.address_note || initialSettings.addressNote),
          hoursWeekday: String(data.hours_weekday || initialSettings.hoursWeekday),
          hoursWeekend: String(data.hours_weekend || initialSettings.hoursWeekend),
          announcementText: String(data.announcement_text || initialSettings.announcementText),
          googleMapsUrl: String(data.google_maps_url || initialSettings.googleMapsUrl),
        };
      }
    } catch {
      // Fallback
    }
  }
  return memorySettings;
}

export async function saveWorkshopSettings(
  settings: WorkshopSettings
): Promise<WorkshopSettings> {
  if (supabase) {
    try {
      const row = {
        id: "main",
        brand_name: settings.brandName,
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        address: settings.address,
        address_note: settings.addressNote,
        hours_weekday: settings.hoursWeekday,
        hours_weekend: settings.hoursWeekend,
        announcement_text: settings.announcementText,
        google_maps_url: settings.googleMapsUrl,
      };

      await supabase.from("settings").upsert(row, { onConflict: "id" });
    } catch {
      // Fallback
    }
  }
  memorySettings = { ...settings };
  return memorySettings;
}

