"use client";

import {
  createTestPropertyAction,
  getVapiConfigurationAction,
  testDatabaseConnectionAction,
  testVapiConfigurationAction,
} from "@/actions/vapi-test-actions";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import { useEffect, useState } from "react";

interface TestResult {
  success: boolean;
  message: string;
  details?: any;
}

export default function VapiTestPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVapiConfig, setCurrentVapiConfig] = useState<any>(null);
  const [configStatus, setConfigStatus] = useState<string>("Checking...");

  // VAPI Configuration state
  const [vapiConfig, setVapiConfig] = useState({
    apiKey: "",
    organization: "",
    assistantId: "",
    phoneNumber: "",
    phoneNumberId: "", // ID of phone number configured in VAPI dashboard
    webhookUrl: "",
    customPrompt: "",
  });

  // Load VAPI config from Supabase on component mount
  useEffect(() => {
    const loadVapiConfig = async () => {
      try {
        const response = await fetch("/api/integrations/vapi");
        if (response.ok) {
          const result = await response.json();
          if (result.isConfigured) {
            // Map the Supabase config (snake_case) to frontend state (camelCase)
            setVapiConfig({
              apiKey: result.apiKey || "",
              organization: result.organization || "",
              assistantId: result.assistantId || "",
              phoneNumber: result.phoneNumber || "",
              phoneNumberId: "", // This field doesn't exist in Supabase schema
              webhookUrl: result.webhookUrl || "",
              customPrompt: result.customPrompt || "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to load VAPI config from Supabase:", error);
      }
    };

    loadVapiConfig();
  }, []);

  // Test Property state
  const [testProperty, setTestProperty] = useState({
    title: "Test Commercial Property",
    description: "A test commercial property for VAPI integration testing",
    property_type: "office" as const,
    status: "active" as const,
    price: 500000,
    price_type: "sale" as const,
    square_feet: 5000,
    address_line_1: "123 Test Street",
    city: "Test City",
    state: "TC",
    zip_code: "12345",
    country: "USA",
    contact_info: {
      contact_name: "Test Contact",
      contact_email: "test@example.com",
      contact_phone: "(864) 477-4757",
      contact_company: "Test Company",
      preferred_contact_method: "phone" as const,
    },
    is_featured: false,
  });

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsAuthenticated(true);
        setAuthToken(session.access_token);
        // Check current VAPI configuration
        await checkCurrentVapiConfig();
      } else {
        // Try to sign in with the test user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "user@example.com",
          password: "testpassword123",
        });

        if (data.session) {
          setIsAuthenticated(true);
          setAuthToken(data.session.access_token);
          // Check current VAPI configuration after login
          await checkCurrentVapiConfig();
        }
      }
    };

    checkAuth();
  }, []);

  const addTestResult = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev]);
  };

  const handleSaveVapiConfig = async () => {
    try {
      // Validate API key format and type
      if (!vapiConfig.apiKey || vapiConfig.apiKey.length < 10) {
        addTestResult({
          success: false,
          message: "API key appears to be invalid (too short)",
          details: { apiKeyLength: vapiConfig.apiKey?.length || 0 },
        });
        return;
      }

      // Check if user might be using wrong key type
      const keyType = vapiConfig.apiKey.startsWith("sk-")
        ? "private"
        : vapiConfig.apiKey.startsWith("pk-")
          ? "public"
          : "unknown";

      if (keyType === "private") {
        addTestResult({
          success: false,
          message:
            "Warning: You appear to be using a PRIVATE key. For API calls, you typically need the PUBLIC key.",
          details: {
            detectedKeyType: "private (starts with sk-)",
            recommendation:
              "Try using your PUBLIC API key instead (starts with pk-)",
          },
        });
        return;
      }

      // Validate Assistant ID format
      if (!vapiConfig.assistantId || vapiConfig.assistantId.length < 10) {
        addTestResult({
          success: false,
          message: "Assistant ID appears to be invalid (too short)",
          details: { assistantIdLength: vapiConfig.assistantId?.length || 0 },
        });
        return;
      }

      // Prepare data for API call (map camelCase to snake_case)
      const configData = {
        apiKey: vapiConfig.apiKey,
        organization: vapiConfig.organization,
        assistantId: vapiConfig.assistantId,
        phoneNumber: vapiConfig.phoneNumber,
        // webhookUrl: vapiConfig.webhookUrl, this one is commented
        customPrompt: vapiConfig.customPrompt,
      };

      // Save the configuration to Supabase via API
      const response = await fetch("/api/integrations/vapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(configData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        addTestResult({
          success: true,
          message: "VAPI configuration saved successfully to Supabase",
          details: {
            configId: result.configId,
            message: result.message,
          },
        });
      } else {
        addTestResult({
          success: false,
          message: result.error || "Failed to save VAPI configuration",
          details: result,
        });
      }
    } catch (error) {
      addTestResult({
        success: false,
        message: `Error saving VAPI configuration: ${error}`,
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const handleTestVapiConfig = async () => {
    // Prevent multiple rapid clicks
    if (isLoading) {
      console.log("VAPI config test already in progress, ignoring click");
      return;
    }

    setIsLoading(true);

    try {
      // First test with a simple API validation call
      const testCall = await fetch("https://api.vapi.ai/assistant", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${vapiConfig.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (testCall.status === 401) {
        addTestResult({
          success: false,
          message: "VAPI API Key is invalid or expired",
          details: {
            statusCode: testCall.status,
            statusText: testCall.statusText,
            suggestion: "Please check your API key in VAPI dashboard",
          },
        });
        return;
      }

      if (testCall.status === 403) {
        addTestResult({
          success: false,
          message: "VAPI API Key does not have required permissions",
          details: {
            statusCode: testCall.status,
            statusText: testCall.statusText,
          },
        });
        return;
      }

      // If API key validation passes, test the full configuration
      const result = await testVapiConfigurationAction(vapiConfig);
      addTestResult({
        success: result.success,
        message: result.message,
        details: result,
      });
    } catch (error) {
      addTestResult({
        success: false,
        message: `Error testing VAPI configuration: ${error}`,
        details: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTestProperty = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await createTestPropertyAction(testProperty);
      addTestResult({
        success: result.success,
        message: result.message,
        details: result,
      });
    } catch (error) {
      addTestResult({
        success: false,
        message: `Error creating test property: ${error}`,
        details: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkCurrentVapiConfig = async () => {
    try {
      const result = await getVapiConfigurationAction();
      if (result.success && result.config) {
        setCurrentVapiConfig(result.config);
        setConfigStatus("Configuration found");
      } else {
        setConfigStatus("No configuration found");
      }
    } catch (error) {
      setConfigStatus("Error checking configuration");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          VAPI Integration Test
        </h1>
        <p className="text-gray-600 mt-2">
          Test VAPI configuration and database connectivity
        </p>
      </div>

      {/* Authentication Status */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>Current user authentication status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${isAuthenticated ? "bg-green-500" : "bg-red-500"}`}
            />
            <span>
              {isAuthenticated ? "Authenticated" : "Not Authenticated"}
            </span>
          </div>
          {authToken && (
            <p className="text-sm text-gray-500 mt-2">
              Token: {authToken.substring(0, 20)}...
            </p>
          )}
        </CardContent>
      </Card>

      {/* VAPI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>VAPI Configuration</CardTitle>
          <CardDescription>Configure and test VAPI settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Setup Required:</strong> Get credentials from your{" "}
              <a
                href="https://dashboard.vapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                VAPI Dashboard
              </a>
            </p>
            <div className="text-xs text-blue-600 mt-2 space-y-1">
              <p>
                <strong>1. API Key:</strong> Settings → API Keys (use PUBLIC key
                starting with pk-)
              </p>
              <p>
                <strong>2. Assistant ID:</strong> Assistants → Your Assistant →
                Copy ID
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={vapiConfig.apiKey}
                onChange={(e) =>
                  setVapiConfig((prev) => ({ ...prev, apiKey: e.target.value }))
                }
                placeholder="pk-... (PUBLIC key, not sk-...)"
                type="password"
              />
              {vapiConfig.apiKey?.startsWith("sk-") && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ This looks like a private key (sk-). You need the PUBLIC key
                  (pk-)
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={vapiConfig.organization}
                onChange={(e) =>
                  setVapiConfig((prev) => ({
                    ...prev,
                    organization: e.target.value,
                  }))
                }
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <Label htmlFor="assistantId">Assistant ID</Label>
              <Input
                id="assistantId"
                value={vapiConfig.assistantId}
                onChange={(e) =>
                  setVapiConfig((prev) => ({
                    ...prev,
                    assistantId: e.target.value,
                  }))
                }
                placeholder="Enter assistant ID"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={vapiConfig.phoneNumber}
                onChange={(e) =>
                  setVapiConfig((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customPrompt">Custom Prompt</Label>
            <Textarea
              id="customPrompt"
              value={vapiConfig.customPrompt}
              onChange={(e) =>
                setVapiConfig((prev) => ({
                  ...prev,
                  customPrompt: e.target.value,
                }))
              }
              placeholder="Enter custom prompt"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => handleSaveVapiConfig()}
              variant="outline"
              className="flex-1"
            >
              Save
            </Button>
            <Button
              onClick={handleTestVapiConfig}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Testing..." : "Test VAPI Configuration"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Property */}
      <Card>
        <CardHeader>
          <CardTitle>Test Property</CardTitle>
          <CardDescription>Create a test property for testing</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleCreateTestProperty}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Creating..." : "Create Test Property"}
          </Button>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>Results from recent tests</CardDescription>
        </CardHeader>
        <CardContent>
          {testResults.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tests run yet</p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${result.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${result.success ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span className="font-medium">{result.message}</span>
                  </div>
                  {result.details && (
                    <pre className="text-xs text-gray-600 mt-2 overflow-x-auto">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
