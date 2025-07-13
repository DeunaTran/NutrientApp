import React from 'react';

const GPS: React.FC = () => {

  return (
    <div className="max-w-[800px] shadow-[0_2px_10px_rgba(211,230,131,0.1)] mx-auto p-8 bg-white text-[#333] font-['Segoe_UI'] bg-[#a3c0aa]">
      <div className="text-center mt-8">
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">  GPS Module (Neo-6M) </h1>


      <section className="space-y-4">
        <p>
          The Neo-6M GPS module is a compact, high-performance device that provides real-time geospatial data including latitude, longitude,
          altitude, and time. It is widely used in location-based applications such as tracking systems and environmental monitoring.
          This project utilizes the module to extract the location of the NPK sample for later precision fertilization.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-[#40916c] text-xl font-semibold">1. Hardware Connections</h2>
        <ul className="list-disc pl-6">
          <li><strong>VCC →</strong> Connect to 5V power supply</li>
          <li><strong>GND →</strong> Connect to ground</li>
          <li><strong>TX (GPS) →</strong> Connect to RX pin on the microcontroller (e.g., GPIO 16)</li>
          <li><strong>RX (GPS) →</strong> Connect to TX pin on the microcontroller (e.g., GPIO 17) - Though the module will not need to receive data from the microcontroller as it automatically sends back GPS data as soon as satellite signals are received.</li>
          <li><strong>Antenna →</strong> Use an external GPS antenna facing open sky (ceramic side up, no metal obstruction) for optimal satellite signal reception.</li>
        </ul>
      </section>

      <img
        src="https://esp32io.com/images/tutorial/esp32-gps-module-wiring-diagram.jpg"
        alt="Soil"
        className="block w-[500px] h-[300px] mx-auto my-6"
      />

      <section className="space-y-4 mt-8">
        <h2 className="text-[#40916c] text-xl font-semibold">2. Communication Protocol</h2>
        <ul className="list-disc pl-6">
          <li>
            The Neo-6M outputs NMEA sentences (e.g., <code>$GPGGA</code>, <code>$GPRMC</code>) at a default baud rate of 9600.
          </li>
          <li>Typical setup code on ESP32:</li>
        </ul>
        <div className="text-blue-800 bg-gray-200 p-4 rounded-md font-mono text-sm">
          <pre>
{`HardwareSerial GPSSerial(1);  
GPSSerial.begin(9600, SERIAL_8N1, 25, -1);  // RX = 25, no TX`}
          </pre>
        </div>
        <p>
          The GPS begins sending data once it locks onto satellites. No additional configuration is needed for basic use cases.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-[#40916c] text-xl font-semibold">3. Data Parsing</h2>
        <ul className="list-disc pl-6">
          <li>
            Use libraries like <strong>TinyGPS++</strong> to decode raw NMEA strings into usable GPS data.
          </li>
        </ul>
        <p>Example code to extract coordinates:</p>
        <div className="text-blue-800 bg-gray-200 p-4 rounded-md font-mono text-sm">
          <pre>
{`if (gps.location.isValid()) {
  float latitude = gps.location.lat();
  float longitude = gps.location.lng();
}`}
          </pre>
        </div>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-[#40916c] text-xl font-semibold">4. Geospatial Monitoring</h2>
        <p>
          By combining GPS coordinates with sensor data (e.g., soil moisture, NPK), the system can create location-tagged datasets for agriculture,
          environmental monitoring, or asset tracking.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-[#40916c] text-xl font-semibold">5. Integration with Supabase</h2>
        <ul className="list-disc pl-6">
          <li><strong>Location Formatting:</strong> Format GPS coordinates as <code>longitude latitude</code></li>
          <li><strong>Data Transmission:</strong> Send data to Supabase via HTTP POST in JSON format including the location fields.</li>
        </ul>
      </section>
    </div>
  );
};

export default GPS;
