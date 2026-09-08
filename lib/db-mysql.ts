import mysql, { Pool } from "mysql2/promise";
import {
  ProcedureItem,
  CaseStudyItem,
  PricingPlanItem,
  WorkshopSettings,
} from "@/types/database";
import { initialSettings } from "./data-store";

let pool: Pool | null = null;

const mysqlHost = process.env.MYSQL_HOST || "202.155.137.34";
const mysqlUser = process.env.MYSQL_USER || "";
const mysqlPassword = process.env.MYSQL_PASSWORD || "";
const mysqlDatabase = process.env.MYSQL_DATABASE || "";
const mysqlPort = Number(process.env.MYSQL_PORT || 3306);

export const isMysqlConfigured = Boolean(
  mysqlUser && mysqlDatabase && mysqlHost
);

if (isMysqlConfigured) {
  try {
    pool = mysql.createPool({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase,
      port: mysqlPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: process.env.MYSQL_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  } catch {
    pool = null;
  }
}

// ---------------- PROCEDURES ----------------
export async function getMysqlProcedures(): Promise<ProcedureItem[] | null> {
  if (!pool) return null;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM procedures ORDER BY order_index ASC"
    );
    const data = rows as Record<string, unknown>[];
    return data.map((d) => ({
      id: String(d.id),
      code: String(d.code),
      name: String(d.name),
      category: String(d.category),
      headline: String(d.headline),
      description: String(d.description),
      materials: typeof d.materials === "string" ? JSON.parse(d.materials) : ((d.materials as string[]) || []),
      steps: typeof d.steps === "string" ? JSON.parse(d.steps) : ((d.steps as string[]) || []),
      timeframe: String(d.timeframe),
      priceEstimate: String(d.price_estimate),
      waMessage: String(d.wa_message),
      orderIndex: Number(d.order_index || 0),
    }));
  } catch {
    return null;
  }
}

export async function saveMysqlProcedure(proc: ProcedureItem): Promise<boolean> {
  if (!pool) return false;
  try {
    const query = `
      INSERT INTO procedures (id, code, name, category, headline, description, materials, steps, timeframe, price_estimate, wa_message, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        code = VALUES(code),
        name = VALUES(name),
        category = VALUES(category),
        headline = VALUES(headline),
        description = VALUES(description),
        materials = VALUES(materials),
        steps = VALUES(steps),
        timeframe = VALUES(timeframe),
        price_estimate = VALUES(price_estimate),
        wa_message = VALUES(wa_message),
        order_index = VALUES(order_index)
    `;
    await pool.execute(query, [
      proc.id,
      proc.code,
      proc.name,
      proc.category,
      proc.headline,
      proc.description,
      JSON.stringify(proc.materials),
      JSON.stringify(proc.steps),
      proc.timeframe,
      proc.priceEstimate,
      proc.waMessage,
      proc.orderIndex || 1,
    ]);
    return true;
  } catch {
    return false;
  }
}

// ---------------- CASE STUDIES ----------------
export async function getMysqlCaseStudies(): Promise<CaseStudyItem[] | null> {
  if (!pool) return null;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM case_studies ORDER BY order_index ASC"
    );
    const data = rows as Record<string, unknown>[];
    return data.map((d) => ({
      id: String(d.id),
      caseNo: String(d.case_no),
      title: String(d.title),
      vintage: String(d.vintage),
      owner: String(d.owner),
      location: String(d.location),
      beforeDiagnosis: String(d.before_diagnosis),
      afterRestoration: String(d.after_restoration),
      duration: String(d.duration),
      ownerNote: String(d.owner_note),
      beforeImg: String(d.before_img),
      afterImg: String(d.after_img),
      orderIndex: Number(d.order_index || 0),
    }));
  } catch {
    return null;
  }
}

export async function saveMysqlCaseStudy(item: CaseStudyItem): Promise<boolean> {
  if (!pool) return false;
  try {
    const query = `
      INSERT INTO case_studies (id, case_no, title, vintage, owner, location, before_diagnosis, after_restoration, duration, owner_note, before_img, after_img, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        case_no = VALUES(case_no),
        title = VALUES(title),
        vintage = VALUES(vintage),
        owner = VALUES(owner),
        location = VALUES(location),
        before_diagnosis = VALUES(before_diagnosis),
        after_restoration = VALUES(after_restoration),
        duration = VALUES(duration),
        owner_note = VALUES(owner_note),
        before_img = VALUES(before_img),
        after_img = VALUES(after_img),
        order_index = VALUES(order_index)
    `;
    await pool.execute(query, [
      item.id,
      item.caseNo,
      item.title,
      item.vintage,
      item.owner,
      item.location,
      item.beforeDiagnosis,
      item.afterRestoration,
      item.duration,
      item.ownerNote,
      item.beforeImg,
      item.afterImg,
      item.orderIndex || 1,
    ]);
    return true;
  } catch {
    return false;
  }
}

// ---------------- PRICING ----------------
export async function getMysqlPricingPlans(): Promise<PricingPlanItem[] | null> {
  if (!pool) return null;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM pricing_plans ORDER BY order_index ASC"
    );
    const data = rows as Record<string, unknown>[];
    return data.map((d) => ({
      id: String(d.id),
      name: String(d.name),
      subtitle: String(d.subtitle),
      price: String(d.price),
      unit: String(d.unit),
      scope: typeof d.scope === "string" ? JSON.parse(d.scope) : ((d.scope as string[]) || []),
      materialsIncluded: String(d.materials_included),
      highlighted: Boolean(d.highlighted),
      waMessage: String(d.wa_message),
      orderIndex: Number(d.order_index || 0),
    }));
  } catch {
    return null;
  }
}

// ---------------- SETTINGS ----------------
export async function getMysqlSettings(): Promise<WorkshopSettings | null> {
  if (!pool) return null;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM settings WHERE id = 'main' LIMIT 1"
    );
    const data = rows as Record<string, unknown>[];
    if (data.length > 0) {
      const d = data[0];
      return {
        brandName: String(d.brand_name || initialSettings.brandName),
        phone: String(d.phone || initialSettings.phone),
        whatsapp: String(d.whatsapp || initialSettings.whatsapp),
        address: String(d.address || initialSettings.address),
        addressNote: String(d.address_note || initialSettings.addressNote),
        hoursWeekday: String(d.hours_weekday || initialSettings.hoursWeekday),
        hoursWeekend: String(d.hours_weekend || initialSettings.hoursWeekend),
        announcementText: String(d.announcement_text || initialSettings.announcementText),
        googleMapsUrl: String(d.google_maps_url || initialSettings.googleMapsUrl),
      };
    }
    return null;
  } catch {
    return null;
  }
}
