import MenuSidebar from '@/components/common/MenuSidebar';
import MobileMenu from '@/components/common/MobileMenu';

export default function APICheking() {
  return (
    <>
      <MobileMenu />
      <div className='flex items-stretch min-h-screen'>
        <MenuSidebar /> 
        <div className='w-full flex-1 bg-white dark:bg-brand-main-dark rounded-2xl lg:rounded-l-none p-3 lg:p-4'>
          <div className='lg:px-4 py-4'>
            <h2 className='text-xl text-brand-primary-3 font-exo2 dark:text-white font-bold uppercase leading-7 mb-6'>Cheking by IP</h2>
            <div className='space-y-6'>
              <p className='bg-brand-gray-2 dark:bg-brand-dark border border-[#d7dee5] dark:border-[#21252f] dark:text-[#646d78] rounded-xl px-5 py-4 text-sm font-medium leading-5'>
                Only entrepreneurs on the Internet, who are a prime example of the continental European type of political culture, will be declared to be in violation universal
              </p>

              <p className='text-sm text-brand-primary-3 dark:text-white font-medium'>
                Only entrepreneurs on the Internet, who are a prime example of the continental European type of political culture, will be declared to be in violation of universal
                norms of ethics and morality! And also supporters of totalitarianism in science call us to new achievements, which, in turn, should be equally left to themselves.

              </p>
              <p className='text-sm text-brand-primary-3 dark:text-white font-medium'>
                Given the key scenarios of behavior, the constant quantitative growth and the scope of our activity ensures the relevance of the training system, which corresponds
              </p>

              <p className='bg-brand-gray-2 dark:bg-brand-dark border border-[#d7dee5] dark:border-[#21252f] dark:text-[#646d78] rounded-xl px-5 py-4 text-sm font-medium leading-5'>
                Only entrepreneurs on the Internet, who are a prime example of the continental European type of political culture, will be declared to be in violation of universal norms of ethics and morality! And also supporters of totalitarianism in science call us to new achievements, which, in turn, should be equally left to themselves.
                <span className='block mt-2'>
                  Given the key scenarios of behavior, the constant quantitative growth and the scope of our activity ensures the relevance of the training system, which corresponds
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
