import { NextResponse } from "next/server";
import { getPricingPlans, savePricingPlan } from "@/lib/supabase";

export async function GET() {
  try {
    const data = await getPricingPlans();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = await savePricingPlan(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
