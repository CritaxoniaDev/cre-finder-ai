import { createIntegrationManager } from "@v1/supabase/lib/integrations";
import { createClient } from "@v1/supabase/server";
import { twilioConfigSchema } from "@v1/supabase/validations/integrations";
import { type NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "@/lib/encryption";

// Helper function to get authenticated user
async function getAuthenticatedUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Auth failed - no valid session found");
      return null;
    }

    console.log("Authenticated user found:", user.id);
    return user;
  } catch (error) {
    console.log("Auth error:", error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Twilio POST Debug ===");
    console.log(
      "Request headers:",
      Object.fromEntries(request.headers.entries()),
    );

    // Get authenticated user
    const user = await getAuthenticatedUser();
    if (!user) {
      console.log("No authenticated user found - returning 401");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    console.log("Authenticated user:", user ? `ID: ${user.id}` : "None");

    const body = await request.json();
    console.log("Request body received:", {
      ...body,
      authToken: body.authToken ? "***" : "undefined",
    });

    // Validate request body
    const validation = twilioConfigSchema.safeParse(body);
    if (!validation.success) {
      console.log("Validation failed:", validation.error.errors);
      return NextResponse.json(
        {
          error: "Invalid configuration data",
          details: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const config = validation.data;

    // Encrypt sensitive fields
    const encryptedConfig = {
      accountSid: encrypt(config.accountSid),
      authToken: encrypt(config.authToken),
      phoneNumber: encrypt(config.phoneNumber),

    };

    // Use real authenticated user ID
    const userId = user.id;
    console.log("Using user ID:", userId);

    // Create authenticated Supabase client
    const supabase = createClient();

    // Create integration manager with authenticated client
    const integrationManager = createIntegrationManager(userId, supabase);
    console.log("Integration manager created for user:", userId);

    const result = await integrationManager.saveTwilioConfig(encryptedConfig);
    console.log("Save result:", result);

    if (!result.success) {
      console.log("Save failed:", result.error);
      return NextResponse.json(
        { error: result.error || "Failed to save configuration" },
        { status: 500 },
      );
    }

    console.log("Save successful, config ID:", result.configId);
    return NextResponse.json(
      {
        success: true,
        message: "Twilio configuration saved successfully",
        configId: result.configId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving Twilio configuration:", error);

    if (error instanceof Error && error.message === "Authentication required") {
      console.log("Authentication failed - returning 401");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("=== Twilio GET Debug ===");
    console.log(
      "Request headers:",
      Object.fromEntries(request.headers.entries()),
    );

    // Get authenticated user
    const user = await getAuthenticatedUser();
    if (!user) {
      console.log("No authenticated user found - returning 401");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    console.log("Authenticated user:", user ? `ID: ${user.id}` : "None");
    const userId = user.id;

    // Create authenticated Supabase client
    const supabase = createClient();

    // Create integration manager and get configuration
    const integrationManager = createIntegrationManager(userId, supabase);
    console.log("Integration manager created for user:", userId);

    const config = await integrationManager.getTwilioConfig();
    console.log(
      "Retrieved config via integration manager:",
      config ? "Found" : "Not found",
    );

    if (!config) {
      console.log("No config found, returning empty state");
      return NextResponse.json(
        {
          isConfigured: false,
          message: "No Twilio configuration found",
        },
        { status: 200 },
      );
    }

    // Decrypt sensitive fields before returning
    console.log("Decrypting account_sid...");
    const decryptedAccountSid = config.account_sid ? decrypt(config.account_sid) : "";
    console.log("Decrypted account_sid:", decryptedAccountSid ? "***" : "(empty)");

    console.log("Decrypting auth_token...");
    const decryptedAuthToken = config.auth_token ? decrypt(config.auth_token) : "";
    console.log("Decrypted auth_token:", decryptedAuthToken ? "***" : "(empty)");

    console.log("Decrypting phone_number...");
    const decryptedPhoneNumber = config.phone_number ? decrypt(config.phone_number) : "";
    console.log("Decrypted phone_number:", decryptedPhoneNumber);

    const safeConfig = {
      id: config.id,
      accountSid: decryptedAccountSid,
      authToken: decryptedAuthToken,
      phoneNumber: decryptedPhoneNumber,
      messagingServiceSid: config.messaging_service_sid || "",
      webhookUrl: config.webhook_url || "",
      customMessage: config.custom_message || "",
      isConfigured: true,
      createdAt: config.created_at,
      updatedAt: config.updated_at,
    };

    console.log("Returning decrypted config via integration manager");
    return NextResponse.json(safeConfig, { status: 200 });
  } catch (error) {
    console.error("Error retrieving Twilio configuration:", error);

    if (error instanceof Error && error.message === "Authentication required") {
      console.log("Authentication failed - returning 401");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();
    if (!user) {
      console.log("No authenticated user found - returning 401");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await request.json();

    // Validate request body
    const validation = twilioConfigSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid configuration data",
          details: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const config = validation.data;
    const userId = user.id;

    // Encrypt sensitive fields before updating
    const encryptedConfig = {
      ...config,
      account_sid: encrypt(config.accountSid),
      auth_token: encrypt(config.authToken),
      phone_number: encrypt(config.phoneNumber),
    };

    // Create authenticated Supabase client
    const supabase = createClient();

    // Create integration manager and update configuration
    const integrationManager = createIntegrationManager(userId, supabase);
    const result = await integrationManager.saveTwilioConfig(encryptedConfig);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update configuration" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Twilio configuration updated successfully",
        configId: result.configId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating Twilio configuration:", error);

    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();
    if (!user) {
      console.log("No authenticated user found - returning 401");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const userId = user.id;

    // Create authenticated Supabase client
    const supabase = createClient();

    // Create integration manager and delete configuration
    const integrationManager = createIntegrationManager(userId, supabase);
    const result = await integrationManager.deleteConfiguration("twilio");

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete configuration" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Twilio configuration deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting Twilio configuration:", error);

    if (error instanceof Error && error.message === "Authentication required") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
