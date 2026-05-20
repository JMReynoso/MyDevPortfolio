import { useEffect, useState } from "react";
import { Grid, Section, SectionHeader, ServiceCard } from "../components";
import {
  batchProductizedServices,
  productizedServices,
  retainerPlans,
} from "../data/services";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="pt-32 pb-20 px-6 bg-gradient-to-b from-white from-0% via-[#F5E6D3] via-25% via-75% to-white to-100%">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C2416] mb-6 leading-tight text-center">
            Services
          </h1>
          <p className="text-xl text-[#8B6F47] leading-relaxed text-center max-w-2xl mx-auto">
            What I can build for you — from a single API to a full production
            deployment.
          </p>
        </div>
      </div>

      <Section id="productized" background="white">
        <SectionHeader
          title="Productized Services"
          subtitle="Pre-scoped, fixed-price offerings for common needs and clear deliverables."
        />
        <Grid cols={{ md: 2, lg: 3 }} gap="lg">
          {productizedServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </Grid>
      </Section>

      <Section id="batchProductized" background="cream">
        <SectionHeader
          title="Productized Services in batches"
          subtitle="Pre-scoped, fixed-price offerings for common needs and clear deliverables in batches."
        />
        <Grid cols={{ md: 2, lg: 3 }} gap="lg">
          {batchProductizedServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </Grid>
      </Section>

      <Section id="retainer" background="white">
        <SectionHeader
          title="Retainer Plans"
          subtitle="Ongoing support and maintenance packages for long-term partnerships."
        />
        <Grid cols={{ md: 2, lg: 3 }} gap="lg">
          {retainerPlans.map((plan, index) => (
            <ServiceCard key={plan.title} service={plan} index={index} />
          ))}
        </Grid>
      </Section>

      {/*}
      <Section id="process" background="cream">
        <SectionHeader
          title="How I Work"
          subtitle="A straightforward process built around clear communication"
        />
        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <WarmCard padding="lg" className="h-full border border-[#8B6F47]/10 shadow-sm">
                <span className="text-4xl font-bold text-[#8B6F47]/20 block mb-2">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-[#2C2416] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#8B6F47] text-sm leading-relaxed">
                  {step.description}
                </p>
              </WarmCard>
            </motion.div>
          ))}
        </div>
          </Section>
          */}

      {/*}
      <Section id="cta" background="white">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            title="Ready to Build Something?"
            subtitle="I'm currently available for freelance projects and consulting engagements."
          />
          <WarmButton href="/contact" size="lg">
            Get in Touch
          </WarmButton>
        </div>
          </Section>
        */}
      <div className="pb-20 md:pb-1" aria-hidden="true" />
      <div className="max-w-4xl mx-auto text-center text-lg text-[#8B6F47]">
        <p>
          <b>NOTE:</b> Some services may be unavailable due to high demand or
          resource constraints.
        </p>
      </div>
      <div className="pb-20 md:pb-2" aria-hidden="true" />
    </>
  );
}
