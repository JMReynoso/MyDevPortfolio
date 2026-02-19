import { Code2, Palette, Rocket, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader, Grid, SkillCard } from "../components";

import { CertificationCard } from "../components/features/CertificationCard";
import { ExperienceEducationCard } from "../components/features/ExperienceEducationCard";
import { experience } from "../data/experience";

import { storyIcons } from "../data/storyIcons";
import { certifications } from "../data/certification";
import { useIsMobile } from "../components/ui/use-mobile";

export default function About() {
  const isMobile = useIsMobile();
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

      <Section id="profession" background="white">
        <Grid cols={{ md: 2 }} gap="xl">
          <div>
            <SectionHeader title="My Professional Journey" />
            <p className="text-lg text-[#8B6F47] mb-6 leading-relaxed">
              I'm a passionate Backend Developer with a love for solving puzzles
              and creating elegant solutions to complex problems. With almost
              several years of experience in web development in SaaS companies,
              I specialize in building scalable, responsive, and accessible
              applications that users love!
            </p>
            <p className="text-lg text-[#8B6F47] mb-6 leading-relaxed">
              My expertise spans across modern backend frameworks (Node.js and
              .NET API), RESTful APIs, and cloud technologies. I can also work
              in collaborative environments where I can work closely with
              Product Managers and Product Owners to bring ideas to life.
            </p>
            <p className="text-lg text-[#8B6F47] leading-relaxed">
              I'm a learning advocate and believe in continuous learning by
              staying up-to-date with the latest technologies, especially in
              generative AL and ML. Having experience in the customer service
              side, my approach combines technical excellence with a deep
              understanding of user needs, ensuring that every project I work on
              delivers real value and measurable impact to the business.
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

      <Section id="story" background="cream">
        <div className="mx-auto">
          <SectionHeader title="My Story" />
          <Grid cols={{ md: 2 }} gap="xl">
            <div className="space-y-6">
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                Hi! This section is about me personally, as you get to know me
                more on a deeper level. I am a Filipino-American born and raised
                in the suburbs of Philadelphia, Pennsylvania and I am a man who
                is part of the L<b>G</b>BTQIA+ community 🏳️‍🌈. My MBTI is{" "}
                <a
                  href="https://www.16personalities.com/isfj-personality"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#7BA05B] hover:text-[#4A6741] transition-colors font-medium"
                >
                  ISFJ
                </a>{" "}
                and my horoscope is{" "}
                <a
                  href="https://www.astrology.com/sun-moon-rising/taurus-sun-virgo-moon-aquarius-rising"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#7BA05B] hover:text-[#4A6741] transition-colors font-medium"
                >
                  Taurus Sun, Virgo Moon, and Aquarius Rising
                </a>
                . I've always been good at math and science, and I've spent most
                of my free time on the computer growing up, so it was natural
                that my interests gravitated towards technology. I went to
                school at Widener University and took their Computer Science
                program, but after a year, my family moved to Florida and I
                transferred to the University of North Florida. I graduated in
                2020 with a Bachelor's degree in Computer Science, and since
                then, I've been working as a Backend Developer at Cadmium, where
                I've had the opportunity to work on some really exciting
                projects and grow my skills in web development. Unfortunately, I
                had to leave Cadmium in late 2022 due to a mass layoff, but I'm
                currently looking for new opportunities where I can continue to
                learn and contribute to meaningful projects.
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                Since I have a strong passion for technology, I also enjoy
                homelab projects! I have a home server where I run multiple self-hosted
                applications, and I enjoy experimenting with different tools and
                frameworks to see what I can create!{" "}
                {" (note: this website is self-hosted!) "} I'm also really
                interested in generative AI and machine learning, which is why I
                am currently taking a course on it. Whether it's building a new
                web app, setting up a home automation system, or just playing
                around with the latest AI tools, I love finding new tech to
                expand my knowledge in the tech world!
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                Beyond the screen, I enjoy music and have a strong passion for
                it. I've played flute for over a decade, starting from the 5th
                grade, and it's been a big part of my life ever since. The
                skills I've gained from playing and becoming first chair
                floutist tranlated well into other musical areas and I've become
                a professional vocalist, pianist, and audio engineer because of
                it. Throughout my teenage years, I also learned to combine tech
                and music together by joining multiple synth communities and
                creating my own using multiple software. I've also learned how
                to mix and master vocals and instruments professionally in
                multiple DAWs from my teenage curiosity. Music has always been a
                source of joy and inspiration for me, and I love finding ways to
                blend it with my passion for technology.
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                Other than music and technologies, my interests are pretty broad
                and I love learning about new things. I am very into language
                and culture and I've been trying to learn Japanese and Korean,
                however, due to my hectic schedule I couldn't find a time to
                consistently practice it. But I hope to get back into it soon
                since watching polyglot videos really inspires me to get back
                into it. I've also been trying to re-learn my mother tongue,
                Tagalog and Bisaya, since it is more accessible in terms of
                practice and I want to be able to speak it fluently one day so I
                can connect at a deeper level with my family back home in the
                Philipines. For the culture aspect, I really enjoy watching
                videos about different societies and especially their food. I
                love trying new foods and learning how to cook them, and I also
                enjoy traveling and experiencing different cultures firsthand
                whenever I get the chance!
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                And since I am a big tech guy, of course I enjoy gaming! My
                favorite genres are hack and slash, competitive, and open world.
                I've always been drawn to games that have rich storytelling and
                immersive worlds, and I find that they can be a great way to
                unwind and escape from the stresses of everyday life! Some of my
                favorite games include the Drakengaurd/NieR series, Final
                Fantasy series, Bayonetta series, Overwatch, and more recently,
                ghacha games like Wuthering Waves. Gaming has also been a great
                way for me to connect with friends and family, whether it's
                through cooperative/competitive multiplayer games or just
                sharing our favorite gaming moments with each other.
              </p>
              <p className="text-lg text-[#8B6F47] leading-relaxed">
                When I'm not immersed in code or music, you might find me
                exploring local coffee shops or shopping for fashion items. Life
                is too short to not pursue what brings you joy, and I believe in
                embracing all of my interests and passions. Whether it's through
                learning tech, music, gaming, or just enjoying a good cup of
                coffee, I try to find joy in the little things and make the most
                out of every day.
              </p>
            </div>

            {/* TODO: Update story icons on separate file */}
            <div
              className={
                isMobile
                  ? "hidden"
                  : "flex flex-col items-center justify-between h-full px-5"
              }
            >
              {/* Off-centered decorative icons */}
              {storyIcons.map((icon, index) => {
                const Icon = icon.icon;
                return (
                  <motion.div
                    key={icon.id}
                    className={`cursor-pointer rounded-full ${icon.color} ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                    onMouseEnter={() => setHoveredIcon(icon.id)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    initial={{ scale: 1.25 }}
                    whileHover={{ scale: 1.35 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <div
                      className={`bg-gradient-to-br ${icon.gradient} to-white rounded-full p-6 shadow-sm border border-[#8B6F47]/10 transition-shadow duration-300 ${hoveredIcon === icon.id ? "shadow-lg" : ""}`}
                    >
                      <Icon className={`w-12 h-12 ${icon.color}`} />
                    </div>
                    {hoveredIcon === icon.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.85 }}
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

      <div className="pb-20 md:pb-1"></div>
    </>
  );
}
