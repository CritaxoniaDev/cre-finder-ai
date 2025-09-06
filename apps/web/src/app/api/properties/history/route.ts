import { NextResponse } from "next/server";

export async function GET() {
  const { createClient } = await import("@v1/supabase/server");
  const supabase = createClient();

  // Fetch campaign events joined with property info
  const { data, error } = await supabase
    .from("campaign_history")
    .select(`
    id,
    type,
    status,
    sent_at,
    property:property_records (
      address,
      city,
      state,
      zip,
      owner1_last_name,
      property_type,
      skip_trace_data
    )
  `)
    .order("sent_at", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, events: data });
}