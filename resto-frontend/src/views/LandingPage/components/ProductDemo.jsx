import React from 'react';
import { IconDeviceLaptop, IconDeviceMobile, IconDeviceTablet, IconArrowRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#70B56A]/30 hover:shadow-lg transition-all duration-300 group">
    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#70B56A] mb-4 group-hover:bg-[#70B56A] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProductDemo = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <IconDeviceLaptop size={24} />,
      title: t('landing_page.demo.features.desktop.title'),
      description: t('landing_page.demo.features.desktop.description')
    },
    {
      icon: <IconDeviceTablet size={24} />,
      title: t('landing_page.demo.features.tablet.title'),
      description: t('landing_page.demo.features.tablet.description')
    },
    {
      icon: <IconDeviceMobile size={24} />,
      title: t('landing_page.demo.features.mobile.title'),
      description: t('landing_page.demo.features.mobile.description')
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('landing_page.demo.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('landing_page.demo.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#70B56A] to-[#8BC34A] opacity-5"></div>
          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {t('landing_page.demo.cta.title')}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('landing_page.demo.cta.description')}
                </p>
                <Link 
                  to="/register" 
                  className="inline-flex items-center px-6 py-3 bg-[#70B56A] hover:bg-[#5a9c54] text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {t('landing_page.demo.cta.button')}
                  <IconArrowRight className="ml-2" size={20} />
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                  <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                  <div className="relative shadow-2xl max-w-full">
                    <img 
                        src="/assets/preview.png" 
                        alt="Dashboard Preview" 
                        className=" w-full h-auto object-contain max-w-full"
                        style={{
                        maxHeight: '100vh',
                        width: '100%',
                        height: 'auto'
                        }}
                    />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
