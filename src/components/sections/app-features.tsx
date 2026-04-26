import React from 'react';

interface FeatureProps {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  isReversed?: boolean;
  bgColor?: string;
}

const FeatureSection: React.FC<FeatureProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
  isReversed = false,
  bgColor = 'bg-white',
}) => {
  return (
    <section className={`${bgColor} section-padding py-20`}>
      <div className="container px-[15px] mx-auto max-w-[1200px]">
        <div className={`flex flex-col md:flex-row items-center gap-[30px] ${isReversed ? 'md:flex-row-reverse' : ''}`}>
          {/* Phone Mockup Column */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative max-w-[300px] w-full">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-auto drop-shadow-[0px_10px_30px_rgba(0,0,0,0.15)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Content Column */}
          <div className="w-full md:w-1/2 text-left">
            <h3 className="text-[#333333] font-sans text-[22px] font-bold leading-[1.3] mb-4">
              {title}
            </h3>
            <div className="text-[#333333] font-sans text-base leading-[1.5]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AppFeatures = () => {
  const features = [
    {
      title: 'Schedule and Manage Appointments',
      description: (
        <p>
          Find local blood drives and donation centers quickly and easily right from the palm of your hand. 
          <a href="#" className="text-[#007da5] font-semibold hover:underline px-1">The app</a> 
          makes scheduling and rescheduling appointments easy and convenient.
        </p>
      ),
      // Fallback placeholders as specific assets were not provided in <assets>
      imageUrl: '/content/dam/redcrossblood/rcb/app-page/features/Schedule-Appointments.png',
      imageAlt: 'Schedule and Manage Appointments screen on smartphone',
      bgColor: 'bg-white',
    },
    {
      title: 'Save Time With RapidPass®',
      description: (
        <p>
          RapidPass® can help save time during your donation. For the best donation experience, we recommend you schedule an appointment on 
          <a href="#" className="text-[#007da5] font-semibold hover:underline px-1">the app</a>, 
          then complete your RapidPass®.
        </p>
      ),
      imageUrl: '/content/dam/redcrossblood/rcb/app-page/features/RapidPass.png',
      imageAlt: 'RapidPass screen on smartphone',
      bgColor: 'bg-[#f2f2f2]',
    },
    {
      title: 'View Donation History & Health Vitals',
      description: (
        <p>
          Make and manage your appointments, review your mini health results, and even track the journey of your blood donations. 
          <a href="#" className="text-[#007da5] font-semibold hover:underline px-1">See more in the app store.</a>
        </p>
      ),
      imageUrl: '/content/dam/redcrossblood/rcb/app-page/features/History-Vitals.png',
      imageAlt: 'Donation History & Health Vitals screen on smartphone',
      bgColor: 'bg-white',
    },
    {
      title: 'Track Your Blood Journey',
      description: (
        <p>
          Follow your blood donation&apos;s journey every step of the way as it makes its way to a hospital to help patients in need. 
          <a href="#" className="text-[#007da5] font-semibold hover:underline px-1">Get the app now.</a>
        </p>
      ),
      imageUrl: '/content/dam/redcrossblood/rcb/app-page/features/Blood-Journey.png',
      imageAlt: 'Blood Journey tracking screen on smartphone',
      bgColor: 'bg-[#f2f2f2]',
    },
    {
      title: 'Earn Achievement Badges',
      description: (
        <p>
          Celebrate your donation milestones with friends & family. Start earning badges today. 
          <a href="#" className="text-[#007da5] font-semibold hover:underline px-1">Download the app now.</a>
        </p>
      ),
      imageUrl: '/content/dam/redcrossblood/rcb/app-page/features/Badges.png',
      imageAlt: 'Achievement Badges screen on smartphone',
      bgColor: 'bg-white',
    },
  ];

  return (
    <div className="flex flex-col">
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          title={feature.title}
          description={feature.description}
          imageUrl={feature.imageUrl}
          imageAlt={feature.imageAlt}
          bgColor={feature.bgColor}
          // The design shows phones consistently on the left in the screenshots provided for individual features, 
          // though the high_level_design mentions alternating. 
          // Following the screenshots specifically: all phone mockups appear on the left side.
          isReversed={false} 
        />
      ))}
    </div>
  );
};

export default AppFeatures;