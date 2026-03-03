import { useState } from 'react';
import { Mail, Send, AlertCircle } from 'lucide-react';
import { Section, SectionHeader } from '../components';
import { strings } from '../constants/strings';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate on change
    let error = '';
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'subject') {
      if (!value.trim()) {
        error = 'Subject is required';
      } else if (value.trim().length < 3) {
        error = 'Subject must be at least 3 characters';
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        error = 'Message is required';
      } else if (value.trim().length < 10) {
        error = 'Message must be at least 10 characters';
      }
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  // TODO: use a proper email sending service instead of mailto link, this is just a quick solution for now. Also add a loading state and error handling for failed email sending.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    // Validate all fields
    const newErrors = {
      name: !formData.name.trim() ? 'Name is required' : 
            formData.name.trim().length < 2 ? 'Name must be at least 2 characters' : '',
      email: !formData.email.trim() ? 'Email is required' : 
             !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Please enter a valid email address' : '',
      subject: !formData.subject.trim() ? 'Subject is required' : 
               formData.subject.trim().length < 3 ? 'Subject must be at least 3 characters' : '',
      message: !formData.message.trim() ? 'Message is required' : 
               formData.message.trim().length < 10 ? 'Message must be at least 10 characters' : ''
    };
    
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('sending');

    // Create mailto link with form data
    const mailtoLink = `mailto:hello@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Reset form after a short delay
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', subject: '', message: '' });
      setTouched({ name: false, email: false, subject: false, message: false });
      
      setTimeout(() => {
        setStatus('idle');
      }, 7000);
    }, 500);


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
                  <label htmlFor="name" className="block text-sm font-medium text-[#2C2416] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2C2416] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                  {touched.email && errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#2C2416] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                  {touched.subject && errors.subject && (
                    <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>
              </div>

              {/* Right Column - Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="block text-sm font-medium text-[#2C2416] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="flex-1 w-full px-4 py-3 bg-white border border-[#8B6F47]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7BA05B] focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {touched.message && errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#7BA05B] to-[#4A6741] text-white rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {status === 'sending' ? (
                <>
                  <Mail className="size-5 animate-pulse" />
                  <span>Sending your email to ...</span>
                </>
              ) : status === 'sent' ? (
                <>
                  <Send className="size-5" />
                  <span>Email sent to ...!</span>
                </>
              ) : (
                <>
                  <Mail className="size-5 group-hover:scale-110 transition-transform" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {status === 'sent' && (
              <p className="text-center text-sm text-[#7BA05B]">
                Your email will be viewed within the next couple of days!
              </p>
            )}
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

      <div className="pb-24 md:pb-0"></div>
    </>
  );
}