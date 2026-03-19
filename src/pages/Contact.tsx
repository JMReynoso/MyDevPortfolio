import { Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Section, SectionHeader } from "../components";
import { strings } from "../constants/strings";

export default function Contact() {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  // Single source-of-truth for resetting status — avoids overlapping timeouts and cleans up on unmount
  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    const timer = setTimeout(() => setStatus("idle"), status === "sent" ? 7000 : 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address";
      }
    } else if (name === "subject") {
      if (!value.trim()) {
        error = "Subject is required";
      } else if (value.trim().length < 3) {
        error = "Subject must be at least 3 characters";
      }
    } else if (name === "message") {
      if (!value.trim()) {
        error = "Message is required";
      } else if (value.trim().length < 10) {
        error = "Message must be at least 10 characters";
      }
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const newErrors = {
      name: !formData.get("name")
        ? "Name is required"
        : (formData.get("name") as string).trim().length < 2
          ? "Name must be at least 2 characters"
          : "",
      email: !formData.get("email")
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email") as string)
          ? "Please enter a valid email address"
          : "",
      subject: !formData.get("subject")
        ? "Subject is required"
        : (formData.get("subject") as string).trim().length < 3
          ? "Subject must be at least 3 characters"
          : "",
      message: !formData.get("message")
        ? "Message is required"
        : (formData.get("message") as string).trim().length < 10
          ? "Message must be at least 10 characters"
          : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setStatus(data.success ? "sent" : "error");

      if (data.success) {
        (e.target as HTMLFormElement).reset();
        setErrors({ name: "", email: "", subject: "", message: "" });
        setTouched({
          name: false,
          email: false,
          subject: false,
          message: false,
        });
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Section id="contact-form" background="cream" className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="Get in Touch"
            subtitle="Fill out the form below and I'll get back to you as soon as possible."
            align="center"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Name, Email, Subject */}
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#2C2416] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={
                      touched.name && errors.name ? "true" : undefined
                    }
                    aria-describedby={
                      touched.name && errors.name ? "name-error" : undefined
                    }
                    className="w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                  {touched.name && errors.name && (
                    <p
                      id="name-error"
                      className="text-sm text-red-500 mt-1"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#2C2416] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={
                      touched.email && errors.email ? "true" : undefined
                    }
                    aria-describedby={
                      touched.email && errors.email ? "email-error" : undefined
                    }
                    className="w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                  {touched.email && errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-red-500 mt-1"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#2C2416] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={
                      touched.subject && errors.subject ? "true" : undefined
                    }
                    aria-describedby={
                      touched.subject && errors.subject
                        ? "subject-error"
                        : undefined
                    }
                    className="w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                  {touched.subject && errors.subject && (
                    <p
                      id="subject-error"
                      className="text-sm text-red-500 mt-1"
                      role="alert"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#2C2416] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={
                    touched.message && errors.message ? "true" : undefined
                  }
                  aria-describedby={
                    touched.message && errors.message
                      ? "message-error"
                      : undefined
                  }
                  className="flex-1 w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {touched.message && errors.message && (
                  <p
                    id="message-error"
                    className="text-sm text-red-500 mt-1"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#7BA05B] to-[#4A6741] text-white rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {status === "sending" ? (
                <>
                  <Mail className="size-5 animate-pulse" aria-hidden="true" />
                  <span>Sending your email to {strings.social.email}</span>
                </>
              ) : status === "sent" ? (
                <>
                  <Send className="size-5" aria-hidden="true" />
                  <span>Email sent to {strings.social.email}!</span>
                </>
              ) : (
                <>
                  <Mail
                    className="size-5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <div aria-live="polite" aria-atomic="true">
              {status === "sent" ? (
                <p className="text-center text-sm text-[#7BA05B]">
                  Your email will be viewed within the next couple of days!
                </p>
              ) : status === "error" ? (
                <p className="text-center text-sm text-red-600">
                  Error in sending the email, please try again later or reach
                  out directly at{" "}
                  <a
                    href={`mailto:${strings.social.email}`}
                    className="text-red-600 hover:text-red-800 transition-colors font-medium underline"
                  >
                    {strings.social.email}
                  </a>
                </p>
              ) : null}
            </div>
          </form>

          {/* Alternative Contact Methods */}
          <div className="mt-12 pt-8 border-t border-[#8B6F47]/20">
            <p className="text-center text-sm text-[#8B6F47] mb-4">
              Or reach out directly at
            </p>
            <p className="text-center">
              <a
                href={`mailto:${strings.social.email}`}
                className="text-[#7BA05B] hover:text-[#4A6741] transition-colors font-medium"
              >
                {strings.social.email}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <div className="pb-24 md:pb-0" aria-hidden="true" />
    </>
  );
}
