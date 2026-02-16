import { Code2, Palette, Rocket, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader, Grid, SkillCard } from "../components";

import { CertificationCard } from "../components/features/CertificationCard";
import { ExperienceEducationCard } from "../components/features/ExperienceEducationCard";
import { experience } from "../data/experience";

import { storyIcons } from "../data/storyIcons";
import { certifications } from "../data/certification";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: "Frontend Development", icon: Code2, color: "green" as const },
    { name: "UI/UX Design", icon: Palette, color: "maple" as const },
    {
      name: "Performance Optimization",
      icon: Rocket,
      color: "yellow" as const,
    },
    { name: "Coffee Consumption", icon: Coffee, color: "brown" as const },
  ];

  return (
    <>
      <div className="pt-32 pb-20 px-6 bg-gradient-to-b from-white from-0% via-[#F5E6D3] via-25% via-75% to-white to-100%">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C2416] mb-6 leading-tight text-center">
            About Me
          </h1>
          <p className="text-xl text-[#8B6F47] leading-relaxed text-center max-w-2xl mx-auto">
            Get to know more about my journey, skills, and what drives me as a
            developer.
          </p>
        </div>
      </div>

      {/* TODO: Update Professional Journey Section */}
      <Section id="profession" background="white">
        <Grid cols={{ md: 2 }} gap="xl">
          <div>
            <SectionHeader title="My Professional Journey" />
            <p className="text-lg text-[#8B6F47] mb-6 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating
              elegant solutions to complex problems. With several years of
              experience in web development, I specialize in building
              responsive, accessible applications that users love.
            </p>
            <p className="text-lg text-[#8B6F47] mb-6 leading-relaxed">
              My expertise spans across modern JavaScript frameworks, RESTful
              APIs, and cloud technologies. I thrive in collaborative
              environments where I can work closely with designers and product
              teams to bring ideas to life.
            </p>
            <p className="text-lg text-[#8B6F47] leading-relaxed">
              I believe in continuous learning and staying up-to-date with the
              latest technologies. My approach combines technical excellence
              with a deep understanding of user needs, ensuring that every
              project I work on delivers real value and measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                name={skill.name}
                icon={skill.icon}
                color={skill.color}
              />
            ))}
          </div>
        </Grid>
      </Section>

      <Section id="certifications" background="cream">
        <SectionHeader title="Certifications" />

        <div className="max-w-3xl mx-auto">
          <Grid cols={{ md: 2 }} gap="lg">
            {certifications.map((item, index) => (
              <CertificationCard
                key={index}
                title={item.title}
                text={item.text}
                status={item.status}
                delay={index * 0.1}
                icon={item.icon}
                link={item.link}
              />
            ))}
          </Grid>
        </div>
      </Section>

      <Section id="experience" background="white">
        <SectionHeader title="Experience & Education" />

        <div className="max-w-3xl mx-auto space-y-8">
          {experience.map((item, index) => (
            <ExperienceEducationCard
              key={index}
              title={item.title}
              company={item.company}
              date={item.date}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      {/* TODO: Update my sotry section */}
      <Section id="story" background="cream">
        <div>
          <SectionHeader title="My Story" />
          <Grid cols={{ md: 2 }} gap="xl">
            <div className="space-y-6">
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                Growing up, I was always the curious kid taking things apart to
                see how they worked—sometimes successfully putting them back
                together, sometimes not. That innate curiosity led me down a
                path where I discovered I could build worlds with just a
                keyboard and imagination.
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                Beyond the screen, I find balance in the simple pleasures of
                life. There's something magical about discovering a new coffee
                shop on a quiet Sunday morning, or losing myself in a good book
                while the rain taps against the window. These moments of
                stillness fuel my creativity and remind me that life is about
                the journey, not just the destination.
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                I'm a firm believer that the best work comes from authentic
                connection—whether that's understanding a user's needs,
                collaborating with a team, or simply being present in the
                moment. I strive to bring warmth, empathy, and a touch of joy
                into everything I create, because at the end of the day,
                technology should make life better, not more complicated.
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                When I'm not immersed in code, you might find me exploring local
                trails, experimenting with new recipes in the kitchen, or
                contributing to open-source projects that make the web a more
                accessible place for everyone. Life is too short to not pursue
                what brings you joy.
              </p>
            </div>

            {/* TODO: Update story icons on separate file */}
            <div className="relative hidden md:block">
              {/* Off-centered decorative icons */}
              {storyIcons.map((icon) => {
                const Icon = icon.icon;
                return (
                  <motion.div
                    key={icon.id}
                    className={`absolute ${icon.position} cursor-pointer`}
                    onMouseEnter={() => setHoveredIcon(icon.id)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className={`bg-gradient-to-br ${icon.gradient} to-white rounded-full p-6 shadow-sm border border-[#8B6F47]/10 transition-shadow duration-300 ${hoveredIcon === icon.id ? "shadow-lg" : ""}`}
                    >
                      <Icon className={`w-12 h-12 ${icon.color}`} />
                    </div>
                    {hoveredIcon === icon.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-xl shadow-md border border-[#8B6F47]/20 whitespace-nowrap"
                      >
                        <p className="text-sm font-semibold text-[#2C2416]">
                          {icon.label}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Grid>
        </div>
      </Section>

      <div className="pb-24 md:pb-0"></div>
    </>
  );
}
