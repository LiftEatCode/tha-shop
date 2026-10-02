import type { Metadata } from "next";

import { VikingBagsPartner } from "@/components/sections/viking-bags-partner";

import { CategorizedServiceView } from "@/components/sections/service-categories";
import { services } from "@/content/pages";

export const metadata: Metadata = {
  title: services.motorcycle.metaTitle,
  description: services.motorcycle.metaDescription,
  alternates: { canonical: "/motorcycle-services" },
};

export default function MotorcycleServicesPage() {
  return (
    <>
      <CategorizedServiceView
        breadcrumbName="Motorcycle Services"
        path="/motorcycle-services"
        serviceType="MotorcycleRepair"
        content={services.motorcycle}
        ctaTitle="Request an Appointment"
        accent="engine"
      />
      <VikingBagsPartner />
    </>
  );
}
