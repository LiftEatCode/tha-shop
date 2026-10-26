import Script from "next/script";

import { getGaMeasurementId } from "@/lib/analytics/events";

const GOOGLE_ADS_ID = "AW-17358749667";

export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  const analyticsConfig = measurementId
    ? `gtag('config', '${measurementId}');`
    : "";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');${analyticsConfig}`}
      </Script>
    </>
  );
}
