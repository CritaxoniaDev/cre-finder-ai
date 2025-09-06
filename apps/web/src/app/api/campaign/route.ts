import { NextResponse } from "next/server";
import { z } from "zod";
import { decrypt } from "@/lib/encryption";

const propertySchema = z.object({
  id: z.string(),
  address: z.string(),
  owner: z.string(),
  contactInfo: z.string(),
  phone: z.string(),
  type: z.string(),
  sqFt: z.string(),
  assessedValue: z.string(),
});

const requestSchema = z.object({
  property: propertySchema.optional(),
  properties: z.array(propertySchema).optional(),
  vapiConfig: z.any().optional(),
  twilioConfig: z.any().optional(),
});

function normalizeUsPhone(phone: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

async function sendVapiCallUsingSupabase(
  organizationId: string | null,
  userId: string | null,
  targetPhone: string,
  payload: any,
) {
  try {
    const { createClient } = await import("@v1/supabase/server");
    const supabase = createClient();

    // Fetch VAPI config
    const { data: vapiData, error: vapiError } = await supabase
      .from("vapi_configs")
      .select("api_key, assistant_id, phone_number, custom_prompt")
      .eq("user_id", userId || "")
      .eq("is_active", true)
      .single();

    // Fetch Twilio config
    const { data: twilioData, error: twilioError } = await supabase
      .from("twilio_configs")
      .select("account_sid, auth_token, phone_number")
      .eq("user_id", userId || "")
      .eq("is_active", true)
      .single();

    if (vapiError || !vapiData) {
      return { success: false, message: "VAPI not configured" };
    }
    if (twilioError || !twilioData) {
      return { success: false, message: "Twilio not configured" };
    }

    // Decrypt VAPI credentials
    const vapiConfig = {
      api_key: decrypt(vapiData.api_key),
      assistant_id: decrypt(vapiData.assistant_id),
      phone_number: decrypt(vapiData.phone_number),
      custom_prompt: vapiData.custom_prompt,
    };

    // Decrypt Twilio credentials
    const twilioConfig = {
      account_sid: decrypt(twilioData.account_sid),
      auth_token: decrypt(twilioData.auth_token),
      phone_number: decrypt(twilioData.phone_number),
    };

    const res = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vapiConfig.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: vapiConfig.assistant_id,
        phoneNumber: {
          twilioPhoneNumber: twilioConfig.phone_number,
          twilioAccountSid: twilioConfig.account_sid,
          twilioAuthToken: twilioConfig.auth_token,
        },
        customer: { number: targetPhone },
        assistantOverrides: {
          variableValues: {
            propertyAddress: payload.address,
            ownerName: payload.owner,
            propertyType: payload.type,
            assessedValue: payload.assessedValue,
          },
          ...(vapiConfig.custom_prompt
            ? { firstMessage: vapiConfig.custom_prompt }
            : {}),
        },
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok)
      return { success: false, message: json?.message ?? "VAPI call failed" };
    return { success: true, message: `VAPI call initiated to ${targetPhone}` };
  } catch (err: any) {
    console.error("Error:", err);
    return { success: false, message: err?.message ?? "VAPI error" };
  }
}

async function sendTwilioSmsFromSupabase(
  userId: string | null,
  targetPhone: string,
  payload: any,
) {
  try {
    const { createClient } = await import("@v1/supabase/server");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("twilio_configs")
      .select("account_sid, auth_token, phone_number")
      .eq("user_id", userId || "")
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return { success: false, message: "Twilio not configured" };
    }

    // Decrypt Twilio credentials
    const configRaw = data as {
      account_sid: string;
      auth_token: string;
      phone_number: string;
    };
    const accountSid: string = decrypt(configRaw.account_sid);
    const authTokenDecrypted: string = decrypt(configRaw.auth_token);
    const fromNumber: string = decrypt(configRaw.phone_number);

    const normalizedPhone = normalizeUsPhone(targetPhone);
    if (!normalizedPhone) {
      return { success: false, message: "Invalid target phone number" };
    }

    const body = `Hello ${payload.owner}, My name is Jace Perry and I am a local investor in the area interested in purchasing your property. Are you open to setting up a call to discuss further?`;

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authTokenDecrypted}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          To: normalizedPhone,
          From: fromNumber,
          Body: body,
        }),
      },
    );
    const json = await res.json().catch(() => ({}));
    if (!res.ok)
      return { success: false, message: json?.message ?? "SMS send failed" };
    return { success: true, message: `SMS sent to ${targetPhone}` };
  } catch (err: any) {
    return { success: false, message: err?.message ?? "Twilio error" };
  }
}

async function incrementCallCount(propertyId: number) {
  const { createClient } = await import("@v1/supabase/server");
  const supabase = createClient();

  // Fetch current call_count
  const { data, error } = await supabase
    .from("property_records")
    .select("call_count")
    .eq("id", propertyId)
    .single();

  if (error || !data) return;

  const currentCount = typeof data.call_count === "number" ? data.call_count : 0;

  // Update call_count (+1)
  await supabase
    .from("property_records")
    .update({ call_count: currentCount + 1 })
    .eq("id", propertyId);
}

async function logCampaignEvent(propertyId: string, userId: string, type: string, status: string) {
  const { createClient } = await import("@v1/supabase/server");
  const supabase = createClient();
  await supabase
    .from("campaign_history")
    .insert([
      {
        property_id: propertyId,
        user_id: userId,
        type,
        status,
        sent_at: new Date().toISOString(),
      },
    ]);
}

export async function POST(req: Request) {
  // Determine organization for the current user to fetch VAPI config
  let organizationId: string | null = null;
  let userId: string | null = null;
  try {
    const { createClient } = await import("@v1/supabase/server");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
      const { data: userRow } = await supabase
        .from("users")
        .select("organization")
        .eq("id", user.id)
        .single();
      organizationId = (userRow as any)?.organization ?? null;
    }
  } catch { }

  const json = await req.json().catch(() => null);

  console.log("Campaign API Request Body:", JSON.stringify(json, null, 2));

  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    console.error("Schema validation errors:", parsed.error.errors);
    return NextResponse.json(
      {
        error: "Invalid request",
        details: parsed.error.errors,
        receivedData: json,
      },
      { status: 400 },
    );
  }

  // Bulk mode
  if (parsed.data.properties && Array.isArray(parsed.data.properties)) {
    const results = [];
    for (const prop of parsed.data.properties) {
      const normalized = normalizeUsPhone(prop.phone);
      if (!normalized) {
        results.push({
          propertyId: prop.id,
          twilio: { success: false, message: "Invalid phone number" },
          vapi: { success: false, message: "Invalid phone number" },
          overallSuccess: false,
        });
        continue;
      }
      const vapiResult = await sendVapiCallUsingSupabase(
        organizationId,
        userId,
        normalized,
        prop,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const twilioResult = await sendTwilioSmsFromSupabase(userId, normalized, prop);

      // Log campaign events for each property
      await logCampaignEvent(prop.id, userId ?? "", "call", vapiResult.success ? "success" : "failed");
      await logCampaignEvent(prop.id, userId ?? "", "sms", twilioResult.success ? "success" : "failed");

      // Increment call_count if both succeeded
      if (twilioResult.success && vapiResult.success) {
        await incrementCallCount(prop.id);
      }

      results.push({
        propertyId: prop.id,
        twilio: twilioResult,
        vapi: vapiResult,
        overallSuccess: twilioResult.success && vapiResult.success,
      });
    }
    return NextResponse.json({ results });
  }

  // Single property mode
  if (parsed.data.property) {
    const property = parsed.data.property;
    const normalized = normalizeUsPhone(property.phone);
    if (!normalized) {
      return NextResponse.json(
        {
          twilio: { success: false, message: "Invalid phone number" },
          vapi: { success: false, message: "Invalid phone number" },
          overallSuccess: false,
        },
        { status: 200 },
      );
    }

    const vapiPromise = sendVapiCallUsingSupabase(
      organizationId,
      userId,
      normalized,
      property,
    );

    await vapiPromise;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

    const twilioPromise = sendTwilioSmsFromSupabase(userId, normalized, property);

    const [vapiResult, twilioResult] = await Promise.all([
      vapiPromise,
      twilioPromise,
    ]);

    const response = {
      twilio: twilioResult,
      vapi: vapiResult,
      overallSuccess: twilioResult.success && vapiResult.success,
    };

    // Log campaign events for single property
    await logCampaignEvent(property.id, userId ?? "", "call", vapiResult.success ? "success" : "failed");
    await logCampaignEvent(property.id, userId ?? "", "sms", twilioResult.success ? "success" : "failed");

    // Increment call_count if both succeeded
    if (response.overallSuccess) {
      await incrementCallCount(property.id);
    }

    console.log("Campaign API Response:", JSON.stringify(response, null, 2));

    return NextResponse.json(response);
  }

  // If neither property nor properties is present
  return NextResponse.json(
    { error: "No property or properties provided" },
    { status: 400 }
  );
}