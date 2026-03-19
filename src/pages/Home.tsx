import { useEffect } from "react";
import {
  ContactSection,
  Grid,
  Hero,
  ProjectCard,
  Section,
  SectionHeader,
  Technologies,
} from "../components";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { strings } from "../constants/strings";
import { projects } from "../data/projects";

export default function Home() {
  // Check if we need to scroll to a section after page load
  useEffect(() => {
    const scrollToSection = sessionStorage.getItem("scrollToSection");
    if (scrollToSection) {
      sessionStorage.removeItem("scrollToSection");
      // Wait for the page to render
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Hero
        greeting="👋 omg hi! I'm a developer"
        title="Building apps on the web"
        subtitle="I create applications with a focus on backend architecture, frontend design, and seamless user experiences."
        primaryButton={{ text: "View My Work!", href: "#projects" }}
        secondaryButton={{ text: "Get in Touch!", href: "/contact" }}
        imageComponent={
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1693159682618-074078ed271e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2t8ZW58MXx8fHwxNzcwMzA1MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Developer workspace"
            className="w-full h-[400px] object-cover"
          />
        }
      />

      <Section id="technologies" background="white">
        <SectionHeader
          title="Technologies I Use"
          subtitle="Hover or tap a category to explore the tools and frameworks I work with"
        />
        <Technologies />
      </Section>

      <Section id="projects" background="cream">
        <SectionHeader title="Featured Projects" />

        <Grid cols={{ md: 2, lg: 3 }} gap="lg">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              delay={index * 0.1}
            />
          ))}
        </Grid>
      </Section>

      <Section id="contact" background="white">
        <ContactSection
          title="Let's Work Together!"
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
          email={strings.social.email}
          githubUrl={strings.social.github}
          linkedinUrl={strings.social.linkedin}
        />
      </Section>

      <div className="pb-24 md:pb-0" aria-hidden="true" />
    </>
  );
}
