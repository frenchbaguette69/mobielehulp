"use client";

import { useState } from "react";
import { MapPin, CheckCircle } from "lucide-react";

export default function LocationButton({
  dict,
}: {
  dict: {
    sendLocation: string;
    loading: string;
    confirmSend: string;
    errors: {
      notSupported: string;
      failed: string;
    };
  };
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleSendLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(dict.errors.notSupported);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        const message = `Ik sta langs de weg met pech. Kunnen jullie mij helpen op deze locatie: ${mapsUrl}`;
        const url = `https://wa.me/31618833122?text=${encodeURIComponent(message)}`;
        setWhatsappUrl(url);
        setLoading(false);
      },
      () => {
        setError(dict.errors.failed);
        setLoading(false);
      }
    );
  };

  const handleOpenWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
      setWhatsappUrl(null);
    }
  };

  return (
      <div className="flex flex-col space-y-3">
        {!whatsappUrl ? (
          <button
            onClick={handleSendLocation}
            disabled={loading}
            className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-[#c8eb67] text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
          >
            <span className="mr-2">{loading ? dict.loading : dict.sendLocation}</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
              <MapPin className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <button
            onClick={handleOpenWhatsApp}
            className="w-full max-w-xs sm:w-auto inline-flex items-center justify-between rounded-full bg-[#c8eb67] text-black border border-gray-300 hover:shadow-md px-6 py-3 font-medium transition-all group"
          >
            <span className="mr-2">{dict.confirmSend}</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
              <CheckCircle className="w-4 h-4" />
            </div>
          </button>
        )}
        {error && (
          <p className="text-sm text-red-600 text-center max-w-xs">{error}</p>
        )}
      </div>
    );
}
