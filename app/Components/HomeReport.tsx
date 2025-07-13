import React from 'react';

const HomeReport= () => {

  return (
    <div className="max-w-[800px] shadow-[0_2px_10px_rgba(211,230,131,0.1)] mx-auto my-0 p-8 bg-white text-[#333] font-sans">
      <div>
        
        <h1 className="bg-[#40916c] text-white text-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8 px-8 py-4 rounded-lg text-2xl font-bold">
          Soil Measurement and Analysis
        </h1>
      </div>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">I. Introduction</h2>
        <p className="mt-2">
          Fertilizer supplements have been a great challenge in the Vietnamese farming industry from the very start of their ancestors.
          “Nhất nước, nhi phân, tam cần, tứ giống” - Fertilizer is the second most important aspect in Vietnamese Farming.
          And as so, some are willing to add at least enough chemical fertilizer to increase yield, regardless of knowing the nutrient value of the soil.
          This mindset, though satisfying the goal of higher yields, poses a threat to environmental sustainability and cost-effectiveness.
        </p>
        <p className="mt-2">
          As technology evolves, there must be a solution to this problem with accuracy and cost-effectiveness!
        </p>
         <p className="mt-2">
          As a result, we have came up with a device that can accurately capture soil's characteristics and location, which we name it as <span className='font-bold'> "TerraTrack" </span> 
        </p>
        <img src='https://cdn.mos.cms.futurecdn.net/H3AQBzstniwy79houvv2Jn.jpg' className='my-10'/>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">II. Purpose</h2>
        <p className="mt-2">
          The purpose of this project is to determine the optimal amount of fertilizer (NPK - Nitrogen, Phosphorus, Potassium), pH treatment,
          and water needed for different sections of a field by using GPS-based data. By accurately measuring soil nutrients,
          farmers can improve fertilization efficiency, reduce nutrition loss, and save time.
        </p>
        <p className="mt-2">
          Furthermore, nutrient data will be uploaded to the cloud for analysis. AI-powered predictions will help identify potential nutrient deficiencies
          for each crop, providing farmers with precise recommendations on fertilizer application and soil treatment.
          This approach optimizes plant growth while minimizing unnecessary costs, leading to smarter, more sustainable farming.
        </p>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">III. Key Features</h2>
        <h3 className="text-[#28644b] mt-4 text-lg font-medium">
          The system will generate nutrient heat maps that visually indicate areas of deficiency, allowing farmers to take immediate action. Over time, the AI model will continuously improve based on the field’s collected data, making predictions even more accurate.
        </h3>
        <ul className="pl-6 list-disc mt-2">
          <li className="mb-2">Nutrient heat maps that visually indicate deficiency areas for immediate action.</li>
          <li className="mb-2">IoT Integration: ESP32-based system with NPK, pH, and moisture sensors.</li>
          <li className="mb-2">Cloud Computing: Data uploaded for remote access and historical tracking.</li>
          <li className="mb-2">AI & Machine Learning: Cluster land zones and provide tailored fertilizer suggestions.</li>
          <li className="mb-2">GPS Mapping: Precisely map soil nutrient levels to target areas needing treatment.</li>
          <li className="mb-2">Cost Efficiency: Reduces fertilizer waste, lowering costs.</li>
          <li className="mb-2">Sustainability: Prevents over-fertilization, minimizing environmental impact.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">IV. Implementation</h2>

        <h3 className="text-[#28644b] mt-4 text-lg font-medium">1. At the Testing Site (Field)</h3>
        <ul className="pl-6 list-disc">
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">1. Start Testing Session</h4>
            <ul className="pl-6 list-disc">

              <li className="mb-2">By the start of every session of measuring NPK and moisture data, TerraTrack will generate an 8 characters code "########" for later storage and linking with lands </li>
              <li className="mb-2">Insert the NPK, pH, and moisture sensors into the soil.</li>
              <li className="mb-2">Capture GPS coordinates.</li>
              <li className="mb-2">Collect real-time soil data.</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">2. Save Data (Press an onboard Button)</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Store soil nutrition results in memory.</li>
              <li className="mb-2">Attempt to send HTTP request to save data to cloud or locally if sending failed</li>
              <li className="mb-2">Increment count for data points collected.</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">3. End Testing Session (Turn off the power of ESP32)</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">The operating code for ESP32 will be in the flash card even if the power provided is off.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-[#28644b] mt-4 text-lg font-medium">2. At the Cloud (Processing Center)</h3>
        <ul className="pl-6 list-disc">
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">1. Calculate the area of the uploaded Test Session</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Define the field boundary using GPS points.</li>
              <li className="mb-2">Estimate total land coverage for analysis.</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">2. Generate a Nutrient Deficiency Map</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Process NPK, pH, and moisture data.</li>
              <li className="mb-2">Identify areas lacking key nutrients.</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">3. AI Analysis & Land Grouping</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Cluster regions with similar nutrient deficiencies.</li>
              <li className="mb-2">Recommend the optimal fertilizer type and quantity for each group.</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold">4. Generate Fertilizer Supplement Map</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Output a visual map showing fertilizer recommendations per land zone.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-[#28644b] mt-4 text-lg font-medium">3. At the Web Dashboard</h3>
        <ul className="pl-6 list-disc">
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold"> View Test History & Results</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Access past testing sessions and soil data logs.</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold"> Linking existing soil testing session to land</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">By either entering session's 8 characters code to existing land or create new land</li>
            </ul>
          </li>
          <li className="mb-2">
            <h4 className="text-[#5b8573] mt-4 font-semibold"> Visualize the Nutrient Deficiency Map</h4>
            <ul className="pl-6 list-disc">
              <li className="mb-2">Interactive map highlighting soil conditions.</li>
              <li className="mb-2">Color-coded nutrient levels & treatment suggestions with fertilizer type and quantity.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">V. Hardwares</h2>
        <h4 className="text-[#5b8573] mt-4 font-semibold">1. Microcontroller and Sensor</h4>
        <ul className="pl-6 list-disc">
          <li className="mb-2">Microcontroller connected to Wifi: ESP32</li>
          <li className="mb-2">NPK and PH sensor (12 to 24 V power) - output: RS485</li>
          <li className="mb-2">RS-485 transceiver module that converts a UART serial stream to RS-485 (Microcontroller to NPK + PH sensor)</li>
          <li className="mb-2">Soil Moisture sensor</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4 font-semibold">2. Power and Connection</h4>
        <ul className="pl-6 list-disc">
          <li className="mb-2">Boost Converter (MT3608, XL6009, or similar): Convert 5V power from power bank to 12V for NPK sensor</li>
          <li className="mb-2">Electric lines to connect components</li>
          <li className="mb-2">Onboard "voltmeter” to adjust and keep track of the Volt converter</li>
        </ul>
      </section>

      {/* <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">VI. Software</h2>
        <p className="mt-2">The software for monitering nutrient data will be hosted by cloud management (Vercel and Supabase), which can be access by web browser </p>
        
      </section> */}
      <section>
  <h2 className="text-[#40916c] mt-8 text-xl font-semibold">VI. Software</h2>
  <p className="mt-2">
    Our nutrient monitoring platform is a powerful cloud-based solution designed for modern agriculture. Hosted on Vercel and backed by Supabase, it provides real-time access to soil data—including NPK levels and moisture content—directly from your ESP32-based device. The web application is responsive, intuitive, and accessible from any browser, whether you're on a smartphone in the field or a desktop in your office.
  </p>
  <p className="mt-2">
    With just a few clicks, users can visualize soil conditions, manage multiple land plots, and monitor historical nutrient trends—all in one centralized dashboard. Each measurement session is securely stored in the cloud and tied to a unique identifier, ensuring easy traceability and future data analysis.
  </p>
  <p className="mt-2">
    Farmers, agronomists, and researchers can use this platform to make more informed fertilization decisions, reduce waste, and improve crop yields. The system is designed with scalability in mind, supporting expansion to additional sensors, future AI analysis, and IoT integrations.
  </p>
  <p className="mt-2">
    Our software isn’t just a tool—it’s your digital partner in smarter, data-driven farming.
  </p>
</section>

    </div>
  );
};

export default HomeReport;
