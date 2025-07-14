import React from 'react';
import HeaderBannerPage from '~/Components/HeaderBannerPage';
import Authenticate from '~/Components/Authenticate';
import { useState } from 'react';


const DeviceArc = () => {
        const [authOpen, setAuthOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="max-w-[800px] mt-20 shadow-[0_2px_10px_rgba(211,230,131,0.1)] mx-auto my-0 p-8 bg-white text-[#333] font-sans">
         <HeaderBannerPage setOpenAuthModal={() => setAuthOpen(true)} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />

      <h1 className="bg-[#40916c] text-white text-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8 px-8 py-4 rounded-lg text-2xl font-bold">
        Device Architecture – Smart Soil Monitoring
      </h1>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">Overview</h2>
        <p className="mt-2">
          The hardware platform is built on the ESP32 microcontroller and integrates multiple sensors to monitor soil
          nutrients and moisture levels in real time. Each reading is geo-tagged via GPS and displayed on an OLED screen
          before being uploaded to a cloud database using built-in Wi-Fi. This setup enables in-field measurements and live
          monitoring for smart agriculture.
        </p>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">Devices Used</h2>

        <h3 className="text-[#28644b] mt-4 font-semibold">1. ESP32 Development Board</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Acts as the central controller for all sensors and modules</li>
          <li>Manages serial/UART, analog input, Wi-Fi, and cloud integration</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">2. NPK Sensor (Soil Nutrient Sensor)</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Communicates using the RS485 serial protocol</li>
          <li>Collects nitrogen, phosphorus, and potassium data</li>
          <li>Data fetched using MODBUS commands</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">3. Soil Moisture Sensor</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Connected to analog pin GPIO34 on ESP32</li>
          <li>Maps analog voltage to moisture percentage</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">4. GPS Module (TinyGPS++)</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Connected via UART</li>
          <li>Provides geolocation (latitude, longitude, altitude)</li>
          <li>Used to geo-tag each sensor reading</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">5. OLED Display (128x64, SSD1306)</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Displays live sensor values, GPS status, Wi-Fi status</li>
          <li>Helps farmers preview values directly on the device</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">6. Push Button</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Manually triggers data upload to the Supabase cloud</li>
          <li>Includes debouncing logic in software for reliability</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">7. Power Supply</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Can be powered via USB, LiPo battery, or solar panel (optional)</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">8. Wi-Fi Module (built into ESP32)</h3>
        <ul className="pl-[1.2rem] list-disc">
          <li>Enables HTTP/MQTT transmission of sensor data to Supabase</li>
        </ul>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">Data Flow</h2>
        <ol className="pl-[1.2rem] list-decimal">
          <li>Sensors collect data → ESP32 processes and displays on OLED</li>
          <li>GPS continuously updates location</li>
          <li>When button is pressed → ESP32 uploads readings to Supabase</li>
        </ol>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">Additional Notes</h2>
        <p className="mt-2 font-semibold">How the wiring works:</p>
        <img
          src="https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752421463/fioloml6x6u3afkvozfy.jpg"
          alt="Soil"
          className="block w-[820px] h-[500px] mx-auto my-4 rounded shadow"
        />
        <ul className="pl-[1.2rem] list-disc">
          <li>All wires in the final version use durable metal connectors (not jumper wires)</li>
          <li>Codebase maintained in VSCode using PlatformIO</li>
          <li>
            GitHub Repository:{' '}
            <a
              href="https://github.com/ductrung0511/Soil_Nutrition_Device"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              ESP32 Device Code
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DeviceArc;
