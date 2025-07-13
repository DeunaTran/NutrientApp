import React from 'react';

const RS485 = () => {
  return (
    <div className="max-w-[800px] shadow-[0_2px_10px_rgba(211,230,131,0.1)] mx-auto my-0 p-8 bg-white text-[#333] font-sans">

      <h1 className="bg-[#40916c] text-white text-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8 px-8 py-4 rounded-lg text-2xl font-bold">
        RS485 & MAX485 Integration with ESP32 for NPK Sensor
      </h1>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">1. Overview: RS485 Protocol</h2>
        <p>RS485 is a widely used industrial communication standard that supports:</p>
        <ul className="pl-[1.2rem] list-disc">
          <li><strong>Differential signaling:</strong> High noise immunity over long distances</li>
          <li><strong>Half-duplex communication:</strong> One device transmits at a time</li>
          <li><strong>Multi-drop support:</strong> Up to 32 nodes on a single bus (multi-drop).</li>
          <li><strong>Long-range:</strong> Up to 1200 meters over twisted pair cable</li>
        </ul>
        <p><strong>Typical applications</strong> include soil NPK sensors and industrial actuators.</p>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">2. MAX485 Transceiver Module</h2>
        <p>
          The <strong>MAX485</strong> is a TTL-to-RS485 transceiver IC that allows a microcontroller (e.g., ESP32) to communicate over the RS485 protocol.
        </p>

        <h4 className="text-[#5b8573] mt-4 text-lg font-medium">Key MAX485 Pins</h4>
        <table className="w-full my-4 border-collapse">
          <thead>
            <tr>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Pin</th>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">RO</td><td className="border px-3 py-2">Receiver Output (to MCU RX)</td></tr>
            <tr><td className="border px-3 py-2">DI</td><td className="border px-3 py-2">Driver Input (from MCU TX)</td></tr>
            <tr><td className="border px-3 py-2">DE</td><td className="border px-3 py-2">Driver Enable (HIGH to transmit)</td></tr>
            <tr><td className="border px-3 py-2">RE</td><td className="border px-3 py-2">Receiver Enable (LOW to receive)</td></tr>
            <tr><td className="border px-3 py-2">A/B</td><td className="border px-3 py-2">RS485 bus differential lines</td></tr>
            <tr><td className="border px-3 py-2">VCC</td><td className="border px-3 py-2">Power (typically 5V)</td></tr>
            <tr><td className="border px-3 py-2">GND</td><td className="border px-3 py-2">Ground</td></tr>
          </tbody>
        </table>
        <p><strong>Note:</strong> DE and RE are often connected together to switch between transmit and receive mode.</p>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">3. Wiring: ESP32 + MAX485 + NPK Sensor</h2>
        <table className="w-full my-4 border-collapse">
          <thead>
            <tr>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Module</th>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Pin</th>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Connects To</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">ESP32</td><td className="border px-3 py-2">GPIO18</td><td className="border px-3 py-2">MAX485 DI</td></tr>
            <tr><td className="border px-3 py-2">ESP32</td><td className="border px-3 py-2">GPIO19</td><td className="border px-3 py-2">MAX485 RO</td></tr>
            <tr><td className="border px-3 py-2">ESP32</td><td className="border px-3 py-2">GPIO5</td><td className="border px-3 py-2">MAX485 DE & RE</td></tr>
            <tr><td className="border px-3 py-2">ESP32</td><td className="border px-3 py-2">GND</td><td className="border px-3 py-2">MAX485 GND</td></tr>
            <tr><td className="border px-3 py-2">ESP32</td><td className="border px-3 py-2">5V</td><td className="border px-3 py-2">MAX485 VCC</td></tr>
            <tr><td className="border px-3 py-2">MAX485</td><td className="border px-3 py-2">A/B</td><td className="border px-3 py-2">NPK Sensor RS485 A/B lines</td></tr>
            <tr><td className="border px-3 py-2">NPK Sensor</td><td className="border px-3 py-2">VCC/GND</td><td className="border px-3 py-2">5V/GND (same as MAX485)</td></tr>
          </tbody>
        </table>
        <p>
          This setup uses HardwareSerial RS485(2) on GPIO18(RX2) and GPIO19(TX2). GPIO5 is used to control DE/RE for direction switching.
        </p>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">4. Communication Protocol: MODBUS RTU</h2>
        <h4 className="text-[#5b8573] mt-4 text-lg font-medium">MODBUS RTU Network Roles</h4>
        <ul className="pl-[1.2rem] list-disc">
          <li><strong>Master:</strong> Controls the communication (e.g., your ESP32)</li>
          <li><strong>Slave:</strong> Responds to requests (e.g., your NPK sensor)</li>
          <li>Only one master, but can have many slaves (up to 32 typical)</li>
        </ul>
        <p>Every MODBUS RTU message (request or response) is a <strong>frame</strong> of bytes:</p>
        <p className="font-mono">[ Slave Address ][ Function Code ][ Data ][ CRC ]</p>

        <p>Most NPK sensors using RS485 communicate over <strong>MODBUS RTU</strong>, a binary protocol with the following structure:</p>
        <table className="w-full my-4 border-collapse">
          <thead>
            <tr>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Byte Offset</th>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Field</th>
              <th className="border text-left px-3 py-2 border-[#ccc] bg-[#e6f4ea] text-[#1b4332]">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">0</td><td className="border px-3 py-2">Slave Address</td><td className="border px-3 py-2">Sensor device ID (e.g., 0x01)</td></tr>
            <tr><td className="border px-3 py-2">1</td><td className="border px-3 py-2">Function Code</td><td className="border px-3 py-2">0x03 = Read Holding Registers</td></tr>
            <tr><td className="border px-3 py-2">2–3</td><td className="border px-3 py-2">Start Address</td><td className="border px-3 py-2">e.g., 0x00, 0x10</td></tr>
            <tr><td className="border px-3 py-2">4–5</td><td className="border px-3 py-2">Register Count</td><td className="border px-3 py-2">e.g., 0x00, 0x03 for 3 values</td></tr>
            <tr><td className="border px-3 py-2">6–7</td><td className="border px-3 py-2">CRC16</td><td className="border px-3 py-2">Error checking code</td></tr>
          </tbody>
        </table>
        <p>
          <strong>Example MODBUS command to request register Nitrogen:</strong><br />
          <code className="bg-gray-100 px-2 py-1 rounded">0x01, 0x03, 0x00, 0x1E, 0x00, 0x01, 0xE4, 0x0C</code>
        </p>
      </section>

      <section>
        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">5. ESP32 Code Example</h2>
        <p>
          A working implementation of RS485 communication for NPK sensors is available on GitHub:
          <br />
          <a
            href="https://github.com/ductrung0511/Soil_Nutrition_Device/blob/main/src/main.cpp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/ductrung0511/Soil_Nutrition_Device
          </a>
        </p>
      </section>
    </div>
  );
};

export default RS485;
