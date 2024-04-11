import React from "react";

const Products = () => {
  return (
    <section className="flex justify-between md:flex-col p-8 "> 
      {/* Mobile */}
      <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-light.png"
            class="dark:hidden w-[272px] h-[572px]"
            alt=""
          />
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-dark.png"
            class="hidden dark:block w-[272px] h-[572px]"
            alt=""
          />
        </div>
      </div>
      {/* tab */}

      <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
        <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div class="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image.png"
            class="dark:hidden h-[426px] md:h-[654px]"
            alt=""
          />
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image-dark.png"
            class="hidden dark:block h-[426px] md:h-[654px]"
            alt=""
          />
        </div>
      </div>

      {/* laptop */}
<div>


      <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
        <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png"
            class="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl"
            alt=""
          />
          <img
            src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png"
            class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
            alt=""
          />
        </div>
      </div>
      <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
        <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
      </div>
      </div>
    </section>
  );
};

export default Products;
