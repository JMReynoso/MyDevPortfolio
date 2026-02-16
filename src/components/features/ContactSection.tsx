import { Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IconButton } from '../common/IconButton';
import { WarmButton } from '../common/WarmButton';
import { SectionHeader } from '../layout/SectionHeader';

export interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export function ContactSection({ 
  title = "Let's Work Together",
  subtitle = "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  email = 'hello@example.com',
  githubUrl = 'https://github.com',
  linkedinUrl = 'https://linkedin.com'
}: ContactSectionProps) {
  return (
    <div className="text-center">
      <SectionHeader 
        title={title} 
        subtitle={subtitle}
        align="center"
      />
      
      <div className="flex justify-center gap-6 mb-12">
        <Link to="/contact">
          <IconButton
            icon={Mail}
            variant="green"
            label="Send email"
          />
        </Link>
        <IconButton
          icon={Github}
          href={githubUrl}
          variant="maple"
          label="View GitHub profile"
        />
        <IconButton
          icon={Linkedin}
          href={linkedinUrl}
          variant="yellow"
          label="View LinkedIn profile"
        />
      </div>
      
      <Link to="/contact">
        <WarmButton 
          size="lg"
          className="bg-gradient-to-r from-[#7BA05B] to-[#4A6741] hover:shadow-2xl"
        >
          Send Me an Email
        </WarmButton>
      </Link>
    </div>
  );
}