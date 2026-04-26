import React from 'react';

/**
 * FooterApps Section
 * Clones the secondary app store download section at the bottom of the page 
 * containing the Google Play and Apple App Store buttons.
 */
const FooterApps: React.FC = () => {
  return (
    <section 
      className="bg-white"
      style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="container mx-auto px-[15px]">
        <div className="flex flex-wrap justify-center items-center gap-[25px]">
          {/* Google Play Store Badge */}
          <a 
            href="https://play.google.com/store/apps/details?id=com.crowdcompass.app731" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{
              width: '210px',
              height: '62px',
              display: 'inline-block'
            }}
          >
            <img 
              src="https://www.redcrossblood.org/content/dam/redcrossblood/rcb/home-page/google-play-badge.png" 
              alt="Get it on Google Play"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              width={210}
              height={62}
            />
          </a>

          {/* Apple App Store Badge */}
          <a 
            href="https://apps.apple.com/us/app/life-link-blood-donor/id913054174" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{
              width: '210px',
              height: '62px',
              display: 'inline-block'
            }}
          >
            <img 
              src="https://www.redcrossblood.org/content/dam/redcrossblood/rcb/home-page/apple-app-store-badge.png" 
              alt="Download Life Link on the App Store"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              width={210}
              height={62}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterApps;