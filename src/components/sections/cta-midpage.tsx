import React from 'react';

const CtaMidpage = () => {
  return (
    <section className="w-full bg-[#007da5] py-[40px] md:py-[55px]">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[40px]">
          {/* QR Code Container */}
          <div className="bg-white p-[8px] flex items-center justify-center shrink-0">
            {/* 
              This is a visual representation of the QR code seen in the screenshots. 
              Since no specific asset was provided for this QR code in the assets list, 
              we use a placeholder that matches the visual weight and styling.
            */}
            <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-black"
                aria-hidden="true"
              >
                <rect width="100" height="100" fill="white" />
                <path
                  fill="currentColor"
                  d="M0,0h35v35h-35z M5,5v25h25v-25z M10,10h15v15h-15z 
                     M65,0h35v35h-35z M70,5v25h25v-25z M75,10h15v15h-15z 
                     M0,65h35v35h-35z M5,70v25h25v-25z M10,75h15v15h-15z
                     M45,0h10v10h-10z M45,20h10v15h-10z M55,10h10v10h-10z
                     M45,45h10v10h-10z M55,45h15v10h-15z M75,45h25v10h-25z
                     M45,65h10v35h-10z M60,65h10v10h-10z M80,65h10v10h-10z
                     M60,80h40v5h-40z M60,95h40v5h-40z"
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-white font-[800] text-[32px] md:text-[42px] leading-[1.1] mb-0 font-sans tracking-tight">
              Download the Blood <br className="hidden md:block" /> Donor App Today
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaMidpage;