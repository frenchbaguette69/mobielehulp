"use client";

import { useState } from "react";

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
    <div className="flex flex-col space-y-3 pt-4">
      {!whatsappUrl ? (
        <button
  onClick={handleSendLocation}
  disabled={loading}
  className="w-max  bg-[#c8eb67] text-black font-bold text-lg py-4 px-8 rounded-full flex  transition cursor-pointer"
>
  📍 {loading ? dict.loading : dict.sendLocation}
</button>
      ) : (
        <button
  onClick={handleOpenWhatsApp}
  className="w-max  bg-[#c8eb67]  text-black font-bold text-lg py-4 px-8 rounded-full flex  transition cursor-pointer"
>
  ✅ {dict.confirmSend}
</button>

      )}
      {error && (
        <p className="text-sm text-red-600 text-center max-w-xs">{error}</p>
      )}
    </div>
  );
}
