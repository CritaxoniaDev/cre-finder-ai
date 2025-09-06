"use client";

import { useEffect, useState } from "react";

interface CampaignEvent {
    id: string;
    type: string;
    status: string;
    sent_at: string;
    property: {
        address: string;
        city: string;
        state: string;
        zip: string;
        owner1_last_name: string;
        property_type: string;
        skip_trace_data?: any;
    };
}

export default function CampaignHistoryPage() {
    const [events, setEvents] = useState<CampaignEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/properties/history");
                if (!res.ok) throw new Error("Failed to fetch campaign history");
                const data = await res.json();
                // If your API returns { data }, use data.data; if { events }, use data.events
                setEvents(data.data || data.events || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Properties History</h1>
            <p className="text-gray-600 mb-6">
                Every call and SMS event sent out will appear here.
            </p>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-500">
                    <div className="col-span-2">Address</div>
                    <div className="col-span-1">Owner</div>
                    <div className="col-span-1 text-center">Type/Status</div>
                    <div className="col-span-1 text-right">Sent At</div>
                </div>
                <div className="divide-y">
                    {events.map((e) => (
                        <div key={e.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 text-sm">
                            <div className="col-span-2 font-medium">
                                {e.property.address}, {e.property.city}, {e.property.state} {e.property.zip}
                            </div>
                            <div className="col-span-1 text-gray-600">{e.property.owner1_last_name}</div>
                            <div className="col-span-1 text-center font-semibold">
                                <span className={`px-2 py-1 rounded-full text-xs ${e.type === "call" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                                    {e.type.toUpperCase()}
                                </span>
                                <span className={`ml-2 ${e.status === "success" ? "text-green-600" : "text-red-600"}`}>
                                    {e.status}
                                </span>
                            </div>
                            <div className="col-span-1 text-right text-xs text-gray-500">
                                {e.sent_at ? new Date(e.sent_at).toLocaleString() : "-"}
                            </div>
                        </div>
                    ))}
                    {events.length === 0 && !loading && (
                        <div className="p-4 text-center text-gray-400">No campaign history found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}