export interface experienceEducationCardProps {
  title: string;
  company: string;
  date: string;
  description: string;
}

export function ExperienceEducationCard({
  title,
  company,
  date,
  description,
}: experienceEducationCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#8B6F47]/10">
      <h3 className="text-2xl font-bold text-[#2C2416] mb-2">{title}</h3>
      <p className="text-[#7BA05B] font-semibold mb-4">
        {company} · {date}
      </p>
      <p className="text-[#8B6F47] leading-relaxed">{description}</p>
    </div>
  );
}
