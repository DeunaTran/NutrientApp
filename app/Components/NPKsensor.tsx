import React from 'react';

const NPKsensor: React.FC = () => {

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 text-gray-800 bg-white">


      <h1 className="text-3xl font-bold text-center mb-8"> NPK Sensor - Detailed Comparison</h1>


      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">1.1 Product Overview</h2>
        <p>
          The soil nitrogen phosphorus potassium index sensor is suitable for detecting the nitrogen phosphorus potassium index in the soil, and the fertility of the soil is judged by detecting the nitrogen phosphorus potassium index in the soil, thus facilitating the evaluation of the soil situation by the customer system.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">1.2 Scope of Application</h2>
        <p>
          Widely used in paddy fields, greenhouse cultivation, rice, vegetable cultivation, orchard nursery, flowers and soil research.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">1.3 Measurement Parameters</h2>
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2">Parameter</th>
              <th className="border border-gray-300 px-3 py-2">Technical Indicator</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">Measurement Range</td><td className="border px-3 py-2">0 - 1999 (NPK index)</td></tr>
            <tr><td className="border px-3 py-2">Resolution</td><td className="border px-3 py-2">1 (NPK index)</td></tr>
            <tr><td className="border px-3 py-2">Response Time (T90)</td><td className="border px-3 py-2">Less than 10s</td></tr>
            <tr><td className="border px-3 py-2">Working Temperature</td><td className="border px-3 py-2">5°C to 45°C</td></tr>
            <tr><td className="border px-3 py-2">Working Humidity</td><td className="border px-3 py-2">5% to 95% RH, no condensation</td></tr>
            <tr><td className="border px-3 py-2">Baud Rate</td><td className="border px-3 py-2">2400 / 4800 / 9600</td></tr>
            <tr><td className="border px-3 py-2">Communication Port</td><td className="border px-3 py-2">RS485</td></tr>
            <tr><td className="border px-3 py-2">Power Supply</td><td className="border px-3 py-2">12V - 24V DC</td></tr>
          </tbody>
        </table>
        <p className="italic">* The NPK index can be equivalently regarded as mg/kg under the normal soil standard conditions (black soil or loess, natural environment, non-saline and alkali).</p>
      </section>

      <h2 className="text-xl font-semibold text-green-700 mt-8">1.4 Measurement Parameters</h2>
      <img src="https://cdn.discordapp.com/attachments/1302584762078203998/1392706817595019385/Picture1.png" alt="Soil" className="w-[500px] h-[300px] mx-auto my-6" />

      <h2 className="text-xl font-semibold text-green-700 mt-8">1.5 Measurement Parameters</h2>
      <img src="https://cdn.discordapp.com/attachments/1302584762078203998/1392706817200750714/Picture2.png" alt="Soil" className="w-[500px] h-[300px] mx-auto my-6" />

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">1.6 Interface Description</h2>
        <p>
          Power interface for wide voltage power supply 12-24V can be. When wiring 485 signal lines, pay attention to the fact that the /B lines cannot be connected in reverse, and the addresses of multiple devices on the bus cannot conflict.
        </p>
        <img src="https://cdn.discordapp.com/attachments/1302584762078203998/1392706816831524896/Picture3.png" alt="Soil" className="w-[500px] h-[300px] mx-auto my-6" />

        <h4 className="font-semibold mt-4">Wire Color Descriptions</h4>
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="border border-gray-300 px-3 py-2">Line Color</th>
              <th className="border border-gray-300 px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">Brown</td><td className="border px-3 py-2">Power supply positive (12–24V DC)</td></tr>
            <tr><td className="border px-3 py-2">Black</td><td className="border px-3 py-2">Power supply negative</td></tr>
            <tr><td className="border px-3 py-2">Yellow / Gray</td><td className="border px-3 py-2">RS485-A</td></tr>
            <tr><td className="border px-3 py-2">Blue</td><td className="border px-3 py-2">RS485-B</td></tr>
          </tbody>
        </table>
        <p className="italic text-sm mt-2">
          <strong>Note:</strong> Be careful not to connect the wrong line sequence. Incorrect wiring will damage the equipment.
          The factory provides 1.25 m long wire by default, and customers can extend or wire as needed.
          Note that some batches may not have a yellow line; in that case, the gray line replaces the yellow one.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">1.7 Surface Measurement Method</h2>
        <p>
          Select a suitable measurement location, avoid stones, ensure the steel needle will not touch hard objects, throw away the topsoil according to the required depth, maintain the soil's tightness below, and insert the sensor vertically without shaking. Measure multiple times within a small range for accuracy.
        </p>

        <h2 className="text-xl font-semibold text-green-700">1.8 Buried Measurement Method</h2>
        <p>
          Dig a pit with a diameter of more than 20cm vertically, insert the sensor horizontally into the pit wall at the desired depth, then refill tightly. After stabilization, measurements can continue for extended periods.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">1.9 Precautions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>All steel needles must be inserted into the soil during measurement.</li>
          <li>Avoid direct sunlight heating the sensor; protect from lightning in the field.</li>
          <li>Do not bend needles, pull wires forcibly, or strike the sensor.</li>
          <li>Sensor has IP68 protection and can be fully submerged in water.</li>
          <li>Avoid prolonged operation in air with power due to electromagnetic radiation.</li>
        </ul>
      </section>
    </div>
  );
};

export default NPKsensor;
