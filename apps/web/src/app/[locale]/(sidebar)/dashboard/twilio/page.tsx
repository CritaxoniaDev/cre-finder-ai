import { checkTestDataStatus, testDatabaseConnection } from "@/lib/auth-utils";
import { TwilioTestClient } from "./twilio-test-client";
import { createClient } from "@v1/supabase/server";

export default async function TwilioTestPage() {
  // Check authentication status
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = user !== null;

  // Check test data status
  const testDataStatus = await checkTestDataStatus();

  // Test database connection
  const dbConnectionTest = await testDatabaseConnection();

  // Don't fetch Twilio config directly from Supabase here.
  // The TwilioTestClient will fetch and decrypt credentials via the API route.

  return (
    <TwilioTestClient
      isAuthenticated={isAuthenticated}
      testDataStatus={testDataStatus}
      twilioConfig={null} // Remove direct config fetch, let client fetch via API
      dbConnectionTest={dbConnectionTest}
      userId={user?.id}
    />
  );
}