import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanFileName}`;

    // 1. Try Supabase Storage first if configured
    if (supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from("case-photos")
          .upload(uniqueFileName, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from("case-photos")
            .getPublicUrl(uniqueFileName);

          if (publicData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicData.publicUrl,
              fileName: uniqueFileName,
            });
          }
        }
      } catch {
        // Fallback to local storage if bucket is not created or permissions issue
      }
    }

    // 2. Fallback: Save to local public/uploads directory
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFileName);
      await writeFile(filePath, buffer);

      const localUrl = `/uploads/${uniqueFileName}`;
      return NextResponse.json({
        success: true,
        url: localUrl,
        fileName: uniqueFileName,
      });
    } catch {
      // 3. Ultra Fallback: Data URL
      const mimeType = file.type || "image/jpeg";
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName: uniqueFileName,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
