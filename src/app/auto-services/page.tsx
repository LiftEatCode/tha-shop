import type { Metadata } from "next";

import { CategorizedServiceView } from "@/components/sections/service-categories";
import { services } from "@/content/pages";

export const metadata: Metadata = {
  title: services.auto.metaTitle,
  description: services.auto.metaDescription,
  alternates: { canonical: "/auto-services" },
};

export default function AutoServicesPage() {
  return (
    <CategorizedServiceView
      breadcrumbName="Auto Services"
      path="/auto-services"
      serviceType="AutomotiveRepair"
      content={services.auto}
      ctaTitle="Request an Appointment"
      accent="lift"
    />
  );
}
