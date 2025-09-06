"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Property } from "@/types/property";
import {
  AlertCircle,
  CheckCircle,
  Phone,
  Settings,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Tables } from "@v1/supabase/types";

// Helper to extract phone number from skip_trace_data
function extractPhoneFromSkipTrace(skipTraceData: any): string {
  if (
    skipTraceData &&
    skipTraceData.output &&
    skipTraceData.output.identity &&
    Array.isArray(skipTraceData.output.identity.phones) &&
    skipTraceData.output.identity.phones.length > 0
  ) {
    return (
      skipTraceData.output.identity.phones[0].phoneDisplay ||
      skipTraceData.output.identity.phones[0].phone ||
      ""
    );
  }
  return "";
}

// Helper to map property_records to campaign property schema
function mapPropertyRecordToCampaignProperty(record: Tables<"property_records">) {
  return {
    id: record.id,
    address: record.address,
    owner: record.owner1_last_name || "",
    contactInfo: "", // You can fill this with more info if needed
    phone: extractPhoneFromSkipTrace(
      record.skip_trace_data
        ? JSON.parse(JSON.stringify(record.skip_trace_data))
        : null
    ),
    type: record.property_type || "",
    sqFt: record.square_feet ? record.square_feet.toString() : "",
    assessedValue: record.assessed_value
      ? record.assessed_value.toString()
      : "",
  };
}

interface PropertyDialogProps {
  property?: Property;
  propertiesArray?: Tables<"property_records">[];
  isOpen: boolean;
  onClose: () => void;
  selectedCount?: number;
}

export default function PropertyDialogTest({
  property,
  propertiesArray,
  isOpen,
  onClose,
  selectedCount = 1, // default to 1 for single property
}: PropertyDialogProps) {
  const isBulk = selectedCount > 1;

  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<null | {
    vapi: { success: boolean; message: string };
    twilio: { success: boolean; message: string };
    overallSuccess: boolean;
  }>(null);

  const [twilioConfigStatus, setTwilioConfigStatus] = useState<
    "loading" | "found" | "missing"
  >("loading");
  const [twilioConfig, setTwilioConfig] = useState(null);
  const [vapiConfigStatus, setVapiConfigStatus] = useState<
    "loading" | "found" | "missing"
  >("loading");
  const [vapiConfig, setVapiConfig] = useState(null);

  useEffect(() => {
    if (isOpen) {
      try {
        const fetchVapiConfig = async () => {
          const response = await fetch("/api/integrations/vapi");
          const data = await response.json();
          if (data.isConfigured) {
            setVapiConfig(data);
            setVapiConfigStatus("found");
          } else {
            setVapiConfigStatus("missing");
          }
        };
        fetchVapiConfig();
      } catch (error) {
        setVapiConfigStatus("missing");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      try {
        const fetchTwilioConfig = async () => {
          const response = await fetch("/api/integrations/twilio");
          const data = await response.json();
          if (data.isConfigured) {
            setTwilioConfig(data);
            setTwilioConfigStatus("found");
          } else {
            setTwilioConfigStatus("missing");
          }
        };
        fetchTwilioConfig();
      } catch (error) {
        setTwilioConfigStatus("missing");
      }
    }
  }, [isOpen]);

  // Map properties for campaign API
  const mappedProperties = propertiesArray?.map(mapPropertyRecordToCampaignProperty);

  // For single property mode, map the property if needed
  const mappedProperty =
    !propertiesArray && property
      ? property
      : propertiesArray && propertiesArray.length === 1 && propertiesArray[0]
        ? mapPropertyRecordToCampaignProperty(propertiesArray[0])
        : undefined;

  const handleSendCampaign = async () => {
    setIsSending(true);
    setResult(null);

    try {
      const vapiResponse = await fetch("/api/integrations/vapi");
      const vapiConfig = await vapiResponse.json();

      const twilioResponse = await fetch("/api/integrations/twilio");
      const twilioConfig = await twilioResponse.json();

      if (!vapiConfig) {
        setResult({
          vapi: {
            success: false,
            message: "No VAPI configuration found in Supabase. Please configure VAPI first.",
          },
          twilio: { success: true, message: "" },
          overallSuccess: false,
        });
        setIsSending(false);
        return;
      }

      if (!twilioConfig) {
        setResult({
          vapi: { success: true, message: "" },
          twilio: {
            success: false,
            message: "No Twilio configuration found in Supabase. Please configure Twilio first.",
          },
          overallSuccess: false,
        });
        setIsSending(false);
        return;
      }

      // Prepare payload for single or bulk
      let payload;
      if (isBulk && mappedProperties && mappedProperties.length > 0) {
        payload = {
          properties: mappedProperties,
          vapiConfig,
          twilioConfig,
        };
      } else {
        payload = {
          property: mappedProperty,
          vapiConfig,
          twilioConfig,
        };
      }

      const res = await fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setResult({
          vapi: {
            success: false,
            message: `API Error: ${res.status} - ${errorText}`,
          },
          twilio: {
            success: false,
            message: "Campaign failed due to API error",
          },
          overallSuccess: false,
        });
        setIsSending(false);
        return;
      }

      const data = await res.json();

      // Bulk mode returns { results: [...] }, single returns { vapi, twilio, overallSuccess }
      if (isBulk && data.results) {
        // Aggregate results for bulk
        const allSuccess = data.results.every((r: any) => r.overallSuccess);
        setResult({
          vapi: { success: allSuccess, message: "Bulk VAPI complete" },
          twilio: { success: allSuccess, message: "Bulk Twilio complete" },
          overallSuccess: allSuccess,
        });
      } else {
        const normalizedData = {
          vapi: data?.vapi || { success: false, message: "No VAPI response" },
          twilio: data?.twilio || {
            success: false,
            message: "No Twilio response",
          },
          overallSuccess: data?.overallSuccess || false,
        };
        setResult(normalizedData);
      }

      if ((isBulk && data.results && data.results.every((r: any) => r.overallSuccess)) ||
        (!isBulk && data?.overallSuccess)) {
        setTimeout(() => {
          setIsSending(false);
          setResult(null);
        }, 2500);
      } else {
        setIsSending(false);
      }
    } catch (e) {
      console.error("Campaign error:", e);
      setResult({
        vapi: {
          success: false,
          message: `Failed to send campaign: ${e instanceof Error ? e.message : "Unknown error"}`,
        },
        twilio: {
          success: false,
          message: "Campaign failed due to network error",
        },
        overallSuccess: false,
      });
      setIsSending(false);
    }
  };

  const Icon = ({ ok }: { ok: boolean }) =>
    ok ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );

  // Costs
  const smsCost = 1.23 * selectedCount;
  const voicemailCost = 1.37 * selectedCount;
  const emailCost = 0.85 * selectedCount;
  const mailCost = 2.70 * selectedCount;
  const totalCost = smsCost + voicemailCost + emailCost + mailCost;

  // For single property, show mappedProperty if available
  const displayProperty = !isBulk ? mappedProperty : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isBulk
              ? `Send Campaign to ${selectedCount} Properties`
              : "Property Details for Twilio"}
          </DialogTitle>
          <DialogDescription>
            {isBulk
              ? "Send outreach via VAPI calls and Twilio SMS to all selected properties."
              : "View property information and send outreach via VAPI calls and Twilio SMS."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
          {/* Only show details for single property */}
          {!isBulk && displayProperty && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="font-medium">{displayProperty.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                <p className="font-medium">{displayProperty.owner}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Info</h3>
                <p className="font-medium">{displayProperty.contactInfo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {displayProperty.phone}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <p className="font-medium">{displayProperty.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sq Ft</h3>
                <p className="font-medium">{displayProperty.sqFt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assessed Value</h3>
                <p className="font-medium">{displayProperty.assessedValue}</p>
              </div>
            </div>
          )}

          {/* Outbound system */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold">Outbound System</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Settings className="h-4 w-4" />
                <span
                  className={`text-sm ${vapiConfigStatus === "found"
                    ? "text-green-600"
                    : vapiConfigStatus === "missing"
                      ? "text-red-600"
                      : "text-gray-500"
                    }`}
                >
                  VAPI:{" "}
                  {vapiConfigStatus === "found"
                    ? "Configured"
                    : vapiConfigStatus === "missing"
                      ? "Not Configured"
                      : "Checking..."}
                </span>
                <span
                  className={`text-sm ${twilioConfigStatus === "found"
                    ? "text-green-600"
                    : twilioConfigStatus === "missing"
                      ? "text-red-600"
                      : "text-gray-500"
                    }`}
                >
                  Twilio:{" "}
                  {twilioConfigStatus === "found"
                    ? "Configured"
                    : twilioConfigStatus === "missing"
                      ? "Not Configured"
                      : "Checking..."}
                </span>
              </div>
            </div>

            {/* Costs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>SMS</span>
                <span className="font-medium">${smsCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Voicemail Call</span>
                <span className="font-medium">${voicemailCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Email Campaign</span>
                <span className="font-medium">${emailCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Direct Mail</span>
                <span className="font-medium">${mailCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-lg">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Campaign Results */}
          {result && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Campaign Results</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon ok={result.vapi.success} />
                    <span>VAPI Call</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {result.vapi.message}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon ok={result.twilio.success} />
                    <span>Twilio SMS</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {result.twilio.message}
                  </span>
                </div>
                {!result.overallSuccess && (
                  <div className="flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>
                      Campaign failed. Please check your configuration.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSendCampaign}
            disabled={isSending}
          >
            {isSending
              ? "Sending..."
              : isBulk
                ? `Send Campaign to ${selectedCount}`
                : "Send Campaign"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}