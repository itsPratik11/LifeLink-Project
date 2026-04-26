import React from 'react';
import { Droplet } from 'lucide-react';

const EmergencyBanner = () => {
  return (
    <section 
      className="w-full bg-[#ED1B2E] text-white overflow-hidden"
      style={{
        fontFamily: '"Open Sans", sans-serif',
      }}
    >
      <div className="container mx-auto max-w-[1210px] px-[15px] pt-[20px] pb-[15px]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-0">
          {/* Main Message Section */}
          <div className="md:max-w-[70%] lg:max-w-[65%]">
            <h2 
              className="text-[#FFFFFF] mb-[10px]"
              style={{
                fontSize: '22px',
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: 'normal',
              }}
            >
              Severe Blood & Platelet Shortage
            </h2>
            <p 
              className="text-[#FFFFFF]"
              style={{
                fontSize: '13px',
                lineHeight: '1.4',
                fontWeight: '400',
                opacity: '0.9',
              }}
            >
              Life Link is facing a severe blood shortage as requests from hospitals exceed the available supply, 
              drawing down the blood supply by about 35% over the past month. The shortage is especially serious for platelets 
              and type O, A negative and B negative blood. Without immediate action, patients face serious risk. Your help is 
              needed right now.
            </p>
            <div className="mt-[15px]">
              <a 
                href="/give.html" 
                className="inline-block text-[#FFFFFF] hover:underline"
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                }}
              >
                Make An Appointment &raquo;
              </a>
            </div>
          </div>

          {/* Action Icons Section */}
          <div className="flex items-center md:pt-4">
            {/* Give Blood */}
            <a 
              href="/give.html" 
              className="flex flex-col items-center justify-center px-[20px] md:px-[30px] border-r border-[#FFFFFF]/30 group hover:opacity-80 transition-opacity"
            >
              <div className="mb-2">
                <Droplet size={32} fill="white" stroke="white" />
              </div>
              <span 
                className="text-center"
                style={{
                  fontSize: '14px',
                  lineHeight: '1.2',
                  fontWeight: '400',
                }}
              >
                Give <br /> Blood
              </span>
            </a>

            {/* Give Platelets */}
            <a 
              href="/give.html" 
              className="flex flex-col items-center justify-center px-[20px] md:px-[30px] group hover:opacity-80 transition-opacity"
            >
              <div className="mb-2">
                <div className="relative">
                  <Droplet size={32} fill="white" stroke="white" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#ED1B2E] rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
              <span 
                className="text-center"
                style={{
                  fontSize: '14px',
                  lineHeight: '1.2',
                  fontWeight: '400',
                }}
              >
                Give <br /> Platelets
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;