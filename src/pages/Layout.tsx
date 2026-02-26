import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Navigation, Footer, CursorGlow } from "../components";
import { strings } from "../constants/strings";

export default function Layout() {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigationClick = (href: string, sectionId: string) => {
    if (href === "/?scrollTo=projects") {
      if (location.pathname === "/") {
        // Already on home page, just scroll to section
        const element = document.getElementById("projects");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Navigate to home page first
        navigate("/");
        // Set a flag to scroll after navigation
        sessionStorage.setItem("scrollToSection", "projects");
        setActiveSection("home");
      }
    }
  };

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/?scrollTo=projects" },
    { label: "Contact", href: "/contact" },
  ];

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Update active section based on current route
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveSection("home");
    } else if (location.pathname === "/about") {
      setActiveSection("about");
    } else if (location.pathname === "/contact") {
      setActiveSection("contact");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation
        logo={{ initials: strings.initials, name: strings.name }}
        links={navigationLinks}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onNavigationClick={handleNavigationClick}
      />

      <Outlet />

      <Footer
        text={`© ${new Date().getFullYear()} ${strings.name}. Built with care and lots of zest🍋`}
      />
      <CursorGlow />
    </div>
  );
}
