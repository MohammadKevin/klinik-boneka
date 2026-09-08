"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PricingPlanItem } from "@/types/database";
import { initialPricingPlans } from "@/lib/data-store";

export default function PricingSection() {
  const [repairPlans, setRepairPlans] = useState<PricingPlanItem[]>(initialPricingPlans);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setRepairPlans(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="harga" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EBE5DB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>LEMBAR TAKSIRAN BIAYA REPARASI</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              Taksiran Biaya Jujur &amp; Transparan
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-md">
            Biaya pasti ditetapkan di awal berdasarkan foto dan diagnosa, tanpa tagihan siluman saat boneka selesai.
          </p>
        </div>

        {/* 3 Pricing Ledger Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {repairPlans.map((plan) => {
            const waUrl = `https://wa.me/6281252530629?text=${encodeURIComponent(
              plan.waMessage
            )}`;

            return (
              <div
                key={plan.id}
                className={`bg-[#FFFFFF] border-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  plan.highlighted
                    ? "border-[#D96B52] shadow-[0_8px_30px_rgba(217,107,82,0.08)] ring-1 ring-[#D96B52]/30 relative"
                    : "border-[#DDD5C7] shadow-xs hover:border-[#211E1C]"
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#EBE5DB] mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A7269]">
                      {plan.highlighted ? "REKOMENDASI ATELIER" : "KATEGORI PERAWATAN"}
                    </span>
                    {plan.highlighted && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs bg-[#D96B52] text-white">
                        TERFAVORIT
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#211E1C] mb-1">
                    {plan.name}
                  </h3>
                  <p className="font-mono text-xs text-[#7A7269] mb-5">
                    {plan.subtitle}
                  </p>

                  {/* Price Tag */}
                  <div className="py-3 px-3.5 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#FAF4EB] border border-[#E8DEC8] mb-6">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#211E1C]">
                      {plan.price}
                    </span>
                    <span className="block font-mono text-[11px] text-[#7A7269] mt-0.5">
                      {plan.unit}
                    </span>
                  </div>

                  {/* Scope Checklist */}
                  <div className="space-y-2.5 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#211E1C] font-bold block">
                      Cakupan Pengerjaan:
                    </span>
                    {plan.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#5C554E]">
                        <span className="text-[#4A6B5D] font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & CTA Button */}
                <div className="pt-4 border-t border-dashed border-[#DDD5C7] space-y-4">
                  <div className="font-mono text-[11px] text-[#7A7269]">
                    <span className="block font-bold text-[#211E1C]">Material:</span>
                    <span>{plan.materialsIncluded}</span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider transition-colors shadow-xs ${
                      plan.highlighted
                        ? "bg-[#D96B52] hover:bg-[#C2583F] text-white"
                        : "bg-[#211E1C] hover:bg-[#D96B52] text-white"
                    }`}
                  >
                    <span>Minta Taksiran Kasus Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* 14-Day Guarantee & Atelier Promises */}
        <div className="mt-10 p-5 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs bg-[#E3ECE7]/50 border border-[#CBD8D1] flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[#3E5C4E]">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
            GARANSI JAHITAN 14 HARI BEBAS BIAYA
          </span>
          <span>•</span>
          <span>GRATIS KONSULTASI AWAL VIA WHATSAPP</span>
          <span>•</span>
          <span>BAHAN HYPOALLERGENIC 100% AMAN ANAK</span>
        </div>

      </div>
    </section>
  );
}
