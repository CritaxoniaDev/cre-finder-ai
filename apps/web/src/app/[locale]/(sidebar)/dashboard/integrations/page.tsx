"use client";

import { createClient } from "@v1/supabase/client";
import { Alert, AlertDescription } from "@v1/ui/alert";
import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@v1/ui/tabs";
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface IntegrationStatus {
  integration_type: "vapi" | "twilio" | "sendgrid";
  is_configured: boolean;
  last_tested_at?: string | null;
  test_status: "success" | "failed" | "never";
  error_message?: string | null;
}

interface User {
  id: string;
  email?: string;
}

export default function IntegrationsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [integrationStatuses, setIntegrationStatuses] = useState<
    IntegrationStatus[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const supabase = createClient();

  // DEVELOPMENT BYPASS: Set this to true to bypass authentication during development
  const DEV_BYPASS_AUTH =
    process.env.NODE_ENV === "development" &&
    process.env.DEV_BYPASS_AUTH === "true";

  useEffect(() => {
    if (DEV_BYPASS_AUTH) {
      // Mock data for development
      setUser({
        id: "dev-user-123",
        email: "dev@example.com",
      });

      setIntegrationStatuses([
        {
          integration_type: "vapi",
          is_configured: false,
          test_status: "never",
        },
        {
          integration_type: "twilio",
          is_configured: false,
          test_status: "never",
        },
        {
          integration_type: "sendgrid",
          is_configured: false,
          test_status: "never",
        },
      ]);

      setIsLoading(false);
    } else {
      loadUserAndStatuses();
    }
  }, [DEV_BYPASS_AUTH]);

  const loadUserAndStatuses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current user
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !currentUser) {
        throw new Error("Authentication required");
      }
      setUser(currentUser);

      // Get access token for authenticated requests
      const accessToken = (await supabase.auth.getSession()).data.session
        ?.access_token;

      // Fetch VAPI config
      const vapiRes = await fetch("/api/integrations/vapi", {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });
      const vapiData = await vapiRes.json();

      // Fetch Twilio config
      const twilioRes = await fetch("/api/integrations/twilio", {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });
      const twilioData = await twilioRes.json();

      // Optionally, fetch SendGrid config if you have it
      // const sendgridRes = await fetch('/api/integrations/sendgrid', { ... });
      // const sendgridData = await sendgridRes.json();

      // Build statuses array
      setIntegrationStatuses([
        {
          integration_type: "vapi",
          is_configured: !!vapiData.isConfigured,
          test_status: vapiData.isConfigured ? "success" : "never",
          last_tested_at: vapiData.updatedAt || null,
          error_message: vapiData.error || null,
        },
        {
          integration_type: "twilio",
          is_configured: !!twilioData.isConfigured,
          test_status: twilioData.isConfigured ? "success" : "never",
          last_tested_at: twilioData.updatedAt || null,
          error_message: twilioData.error || null,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: "success" | "failed" | "never") => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: "success" | "failed" | "never") => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Working
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Never Tested</Badge>;
    }
  };

  const getIntegrationStatus = (type: "vapi" | "twilio" | "sendgrid") => {
    return integrationStatuses.find((s) => s.integration_type === type);
  };

  // Helper function to check if an integration is configured
  const isIntegrationConfigured = (type: "vapi" | "twilio" | "sendgrid") => {
    const status = integrationStatuses.find((s) => s.integration_type === type);
    return status?.is_configured === true;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading integrations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>
          {error}. Please refresh the page or contact support.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Integration Status
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Manage your enterprise real estate integrations for voice, SMS, and
            email.
          </p>
        </div>
      </div>

      {user && (
        <Card className="bg-gray-50 shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Account Information
            </CardTitle>
            <CardDescription>
              Managing integrations for{" "}
              <span className="font-medium text-gray-900">{user.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              User ID: <span className="font-mono">{user.id}</span>
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-gray-100 rounded-lg p-2 flex gap-2">
          <TabsTrigger
            value="overview"
            className="px-4 py-2 rounded-lg font-medium"
          >
            Overview
          </TabsTrigger>
          {/* <TabsTrigger value="sendgrid" className="px-4 py-2 rounded-lg font-medium">SendGrid</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* VAPI Status Card */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base font-bold">
                    VAPI Integration
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    Voice AI for automated calls
                  </p>
                </div>
                {getStatusIcon(
                  getIntegrationStatus("vapi")?.test_status || "never",
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${isIntegrationConfigured("vapi") ? "text-green-700" : "text-red-700"}`}
                  >
                    {isIntegrationConfigured("vapi")
                      ? "Configured"
                      : "Not Set Up"}
                  </span>
                  {getStatusBadge(
                    getIntegrationStatus("vapi")?.test_status || "never",
                  )}
                </div>
                {getIntegrationStatus("vapi")?.last_tested_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    Last tested:{" "}
                    {new Date(
                      getIntegrationStatus("vapi")!.last_tested_at!,
                    ).toLocaleDateString()}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => (window.location.href = "/dashboard/vapi")}
                >
                  Configure VAPI
                </Button>
              </CardContent>
            </Card>

            {/* Twilio Status Card */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base font-bold">
                    Twilio Integration
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    SMS and voice communications
                  </p>
                </div>
                {getStatusIcon(
                  getIntegrationStatus("twilio")?.test_status || "never",
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${isIntegrationConfigured("twilio") ? "text-green-700" : "text-red-700"}`}
                  >
                    {isIntegrationConfigured("twilio")
                      ? "Configured"
                      : "Not Set Up"}
                  </span>
                  {getStatusBadge(
                    getIntegrationStatus("twilio")?.test_status || "never",
                  )}
                </div>
                {getIntegrationStatus("twilio")?.last_tested_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    Last tested:{" "}
                    {new Date(
                      getIntegrationStatus("twilio")!.last_tested_at!,
                    ).toLocaleDateString()}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => (window.location.href = "/dashboard/twilio")}
                >
                  Configure Twilio
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
