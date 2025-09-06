"use client";

import { Badge } from "@v1/ui/badge";
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
import {
  AlertCircle,
  CheckCircle2,
  Database,
  Loader2,
  MessageSquare,
  Phone,
  Settings,
  XCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useEffect, useState } from "react";

interface TwilioTestConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  messagingServiceSid: string;
  webhookUrl: string;
  customMessage: string;
}

interface TestResult {
  success: boolean;
  message: string;
  details?: any;
  timestamp: string;
}

interface TwilioTestClientProps {
  isAuthenticated: boolean;
  testDataStatus: {
    propertyRecords: boolean;
    campaigns: boolean;
    searchData: boolean;
    vapiConfig: boolean;
    twilioConfig: boolean;
  };
  twilioConfig: any;
  dbConnectionTest: {
    success: boolean;
    message: string;
  };
  userId?: string;
}

export function TwilioTestClient({
  isAuthenticated,
  twilioConfig,
  userId,
}: TwilioTestClientProps) {
  const [config, setConfig] = useState<TwilioTestConfig>({
    accountSid: twilioConfig?.accountSid || "",
    authToken: "",
    phoneNumber: twilioConfig?.phoneNumber || "",
    messagingServiceSid: twilioConfig?.messagingServiceSid || "",
    webhookUrl: twilioConfig?.webhookUrl || "",
    customMessage:
      twilioConfig?.customMessage ||
      "Thank you for your interest in our properties. A CRE Finder AI representative will contact you soon.",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string>("");
  const [userCredentials, setUserCredentials] = useState<{
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  } | null>(null);
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [credentialsError, setCredentialsError] = useState<string | null>(null);
  const [showAccountSid, setShowAccountSid] = useState(false);
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);


  // Fetch decrypted credentials on mount
  useEffect(() => {
    const fetchCredentials = async () => {
      setCredentialsLoading(true);
      setCredentialsError(null);
      try {
        const res = await fetch("/api/integrations/twilio");
        const data = await res.json();
        if (res.ok && data.accountSid && data.authToken && data.phoneNumber) {
          setUserCredentials({
            accountSid: data.accountSid,
            authToken: data.authToken,
            phoneNumber: data.phoneNumber,
          });
        } else {
          setCredentialsError(data.error || "No credentials found.");
        }
      } catch (err) {
        setCredentialsError("Failed to fetch credentials.");
      } finally {
        setCredentialsLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  const addTestResult = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev]);
  };

  const saveTwilioConfig = async () => {
    try {
      // Validate configuration
      if (!config.accountSid || !config.authToken || !config.phoneNumber) {
        addTestResult({
          success: false,
          message:
            "Please fill in all required fields (Account SID, Auth Token, Phone Number)",
          timestamp: new Date().toLocaleTimeString(),
        });
        return;
      }

      // Call the API route to save config (encryption happens server-side)
      const response = await fetch("/api/integrations/twilio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountSid: config.accountSid,
          authToken: config.authToken,
          phoneNumber: config.phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        addTestResult({
          success: false,
          message: result.error || "Failed to save Twilio configuration",
          timestamp: new Date().toLocaleTimeString(),
        });
        return;
      }

      addTestResult({
        success: true,
        message: "Twilio configuration saved successfully",
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error("Error saving Twilio configuration:", error);
      addTestResult({
        success: false,
        message: "Error saving Twilio configuration",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const clearForm = () => {
    setConfig({
      accountSid: "",
      authToken: "",
      phoneNumber: "",
      messagingServiceSid: "",
      webhookUrl: "",
      customMessage:
        "Thank you for your interest in our properties. A CRE Finder AI representative will contact you soon.",
    });
    setTestResults([]);
  };

  const getStatusIcon = (success: boolean) => {
    if (success) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getStatusBadge = (success: boolean) => {
    return success ? (
      <Badge className="bg-green-100 text-green-800">PASS</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">FAIL</Badge>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Twilio Integration Test</h1>
        <p className="text-gray-600">
          Configure and test Twilio SMS/Voice integration for lead communication
        </p>

        {/* Authentication Status */}
        <div className="mt-4 p-3 rounded-lg border">
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-green-800">Authenticated ✓</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-red-800">Not authenticated ✗</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Twilio Configuration
            </CardTitle>
            <CardDescription>
              Configure Twilio with your credentials for SMS and Voice
              capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Setup Required:</strong> Get credentials from your{" "}
                <a
                  href="https://console.twilio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Twilio Console
                </a>
              </p>
              <div className="text-xs text-blue-600 mt-2 space-y-1">
                <p>
                  <strong>1. Account SID:</strong> Console → Project Info →
                  Account SID
                </p>
                <p>
                  <strong>2. Auth Token:</strong> Console → Project Info → Auth
                  Token
                </p>
                <p>
                  <strong>3. Phone Number:</strong> Console → Phone Numbers →
                  Manage → Active numbers
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountSid">Account SID</Label>
              <Input
                id="accountSid"
                value={config.accountSid}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, accountSid: e.target.value }))
                }
                placeholder="Enter Twilio Account SID"
                disabled={!isAuthenticated}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authToken">Auth Token</Label>
              <Input
                id="authToken"
                type="password"
                value={config.authToken}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, authToken: e.target.value }))
                }
                placeholder="Enter Twilio Auth Token"
                disabled={!isAuthenticated}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
              <Input
                id="phoneNumber"
                value={config.phoneNumber}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="Enter Twilio phone number"
                disabled={!isAuthenticated}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => saveTwilioConfig()}
                disabled={
                  isLoading ||
                  !isAuthenticated ||
                  !config.accountSid ||
                  !config.authToken
                }
                className="flex-1"
              >
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Test Results
            </CardTitle>
            <CardDescription>
              Results from Twilio integration tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentTest && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-blue-800">{currentTest}</span>
                </div>
              </div>
            )}

            {testResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No test results yet. Run a test to see results here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.success)}
                        <span className="font-medium">{result.message}</span>
                      </div>
                      {getStatusBadge(result.success)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Time:</span>{" "}
                      {result.timestamp}
                    </div>
                    {result.details && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                          View Details
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}

            {testResults.length > 0 && (
              <Button
                onClick={clearResults}
                variant="outline"
                className="w-full mt-4"
              >
                Clear Results
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Credentials Card */}
      <Card className="mb-6 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Your Twilio Credentials
          </CardTitle>
          <CardDescription>
            These are your currently saved (decrypted) Twilio credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {credentialsLoading ? (
            <div className="text-blue-600 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading credentials...
            </div>
          ) : credentialsError ? (
            <div className="text-red-600">{credentialsError}</div>
          ) : userCredentials ? (
            <div className="space-y-2">
              <div>
                <Label className="font-medium flex items-center gap-2">
                  Account SID:
                  <div className="cursor-pointer">
                    {showAccountSid ? (
                      <EyeOff className="h-4 w-4" onClick={() => setShowAccountSid((v) => !v)} />
                    ) : (
                      <Eye className="h-4 w-4" onClick={() => setShowAccountSid((v) => !v)} />
                    )}
                  </div>

                </Label>
                <div className="bg-gray-100 rounded px-2 py-2 text-sm break-all">
                  {showAccountSid
                    ? userCredentials.accountSid
                    : "••••••••••••••••••••••••••••••••••••••••••••••••"}
                </div>
              </div>
              <div>
                <Label className="font-medium flex items-center gap-2">
                  Auth Token:
                  <div className="cursor-pointer">
                    {showAuthToken ? (
                      <EyeOff className="h-4 w-4" onClick={() => setShowAuthToken((v) => !v)} />
                    ) : (
                      <Eye className="h-4 w-4" onClick={() => setShowAuthToken((v) => !v)} />
                    )}
                  </div>

                </Label>
                <div className="bg-gray-100 rounded px-2 py-2 text-sm break-all">
                  {showAuthToken
                    ? userCredentials.authToken
                    : "••••••••••••••••••••••••••••••••••••••••••••••••"}
                </div>
              </div>
              <div>
                <Label className="font-medium flex items-center gap-2">
                  Phone Number:
                  <div className="cursor-pointer">
                    {showPhoneNumber ? (
                      <EyeOff className="h-4 w-4" onClick={() => setShowPhoneNumber((v) => !v)} />
                    ) : (
                      <Eye className="h-4 w-4" onClick={() => setShowPhoneNumber((v) => !v)} />
                    )}
                  </div>
                </Label>
                <div className="bg-gray-100 rounded px-2 py-2 text-sm break-all">
                  {showPhoneNumber
                    ? userCredentials.phoneNumber
                    : "••••••••••••••••••••••••••••••••••••••••••••••••"}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No credentials found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
