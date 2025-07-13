import React from 'react';
import { useState } from 'react';
import HeaderBannerPage from '~/Components/HeaderBannerPage';
import Authenticate from '~/Components/Authenticate';





      
const Home2: React.FC = () => {
      const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    

  return (
    <div className=" mt-20 max-w-full px-60 mx-auto p-8 bg-white text-[#333] font-['Segoe_UI'] ">
      <HeaderBannerPage setOpenAuthModal={() => setAuthOpen(true)} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />
      
      <div>
        <h1 className="text-center text-[#2d6a4f] bg-[#40916c] text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-8 px-8 py-4 rounded-lg">
          NPK Analysis Methods - Detail Comparison
        </h1>
      </div>

      <section className="space-y-4">
        <p>
          Determining the levels of nitrogen (N), phosphorus (P), and potassium (K) in soil is vital for optimizing
          agricultural productivity and minimizing environmental impact. This report explores five key methods for NPK
          detection: laboratory-based chemical analysis, ion-selective electrodes (ISEs), conductivity/impedance-based
          sensors (e.g., JXCT), near-infrared spectroscopy (NIRS), and remote sensing.
        </p>

        <h2 className="text-[#40916c] mt-8 text-xl font-semibold">2. Detailed Comparison of NPK Measurement Methods</h2>

        <h3 className="text-[#28644b] mt-4 text-lg font-semibold">2.1 Laboratory-Based Chemical Analysis</h3>
        <p className="font-medium">
          Principle of the lab-based method is comprised of separate and distinct elements measurements:
        </p>
        <ul className="pl-6 list-disc space-y-2">
          <li>
            <strong>Nitrogen: Kjeldahl digestion (total N)</strong>
            <img
              src="https://cdn1.byjus.com/wp-content/uploads/2021/03/Kjeldahl-Method1.png"
              alt="Soil"
              className="block w-[500px] h-[300px] mx-auto"
            />
            <ul className="pl-6 list-disc">
              <li>Digestion:</li>
              <ul className="pl-6 list-disc">
                <li>The soil sample is digested with concentrated sulfuric acid (H₂SO₄) and a catalyst (often selenium or copper).</li>
                <li>Organic nitrogen compounds are converted to ammonium sulfate [(NH₄)₂SO₄].</li>
              </ul>
              <li>Neutralization and Distillation:</li>
              <ul className="pl-6 list-disc">
                <li>The solution is neutralized with sodium hydroxide (NaOH), converting ammonium to ammonia gas (NH₃).</li>
                <li>Ammonia is distilled and captured in a boric acid solution</li>
              </ul>
            </ul>
          </li>
        </ul>
        <img
          src="https://www.mdpi.com/agronomy/agronomy-12-02907/article_deploy/html/images/agronomy-12-02907-g005.png"
          alt="Soil"
          className="block w-[500px] h-[300px] mx-auto"
        />
        <h4 className="text-[#5b8573] mt-4">
          ⇒ The result is a reliable measurement for total nitrogen in organic and inorganic forms... remains as a benchmark in agronomic research and regulation.
        </h4>

        <ul className="pl-6 list-disc">
          <li>
            For Phosphorous and Potassium: Mehlich-3 Method is considered the most versatile...
          </li>
          <ul className="pl-6 list-disc">
            <li>
              Soil Suitability: Well-suited for routine soil testing laboratories...
            </li>
          </ul>
        </ul>

        <h3 className="text-[#28644b] mt-4 font-semibold">
          <li>The process of extracting needed measurements includes:</li>
        </h3>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Extractant Composition:</h4>
        <h4 className="text-[#5b8573] mt-4">Mehlich-3 uses a complex mixture...</h4>

        <table className="w-full my-4 border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">Component</th>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">0.2 M Acetic Acid</td>
              <td className="border px-3 py-2">Weak acid that releases exchangeable nutrients</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">0.25 M NH₄NO₃</td>
              <td className="border px-3 py-2">Replaces cations like K⁺, Ca²⁺, Mg²⁺</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">0.015 M NH₄F</td>
              <td className="border px-3 py-2">Releases phosphorus bound to aluminum and iron oxides</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">0.013 M HNO₃</td>
              <td className="border px-3 py-2">Increases extraction strength (acidifies)</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">0.001 M EDTA</td>
              <td className="border px-3 py-2">Chelates micronutrients for extraction</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-[#28644b] mt-4 font-semibold">Extraction Steps</h3>
        <ul className="pl-6 list-disc">
          <li>Sample Preparation: Soil is air-dried and sieved (&lt; 2 mm)</li>
          <li>Soil-to-Solution Ratio: Typically 1:10 (e.g., 2.5 g of soil with 25 mL of extractant)</li>
          <li>Shaking: Mixture is shaken for 5 minutes</li>
          <li>Filtration: Solution is filtered to remove solids</li>
          <li>Analysis: Extract analyzed using ICP-OES or colorimetry</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4">
          ⇒ The Mehlich-3 method is a modern, universal extraction technique that offers a practical, cost-effective solution...
        </h4>

        <img
          src="https://www.mdpi.com/agronomy/agronomy-12-02907/article_deploy/html/images/agronomy-12-02907-g005.png"
          alt="Soil"
          className="block w-[500px] h-[300px] mx-auto"
        />

        <h4 className="text-[#5b8573] mt-4 font-semibold">Advantages:</h4>
        <ul className="pl-6 list-disc">
          <li>High precision and reliability.</li>
          <li>Measures both total and available forms of nutrients.</li>
          <li>Benchmark for calibration and regulatory testing.</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Limitations:</h4>
        <ul className="pl-6 list-disc">
          <li>Requires soil sampling and lab equipment</li>
          <li>Cost per sample can be high</li>
          <li>Time-consuming (days for results)</li>
          <li>Limited spatial resolution</li>
          <li>ICP-OES machine required</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Use Cases:</h4>
        <ul className="pl-6 list-disc">
          <li>Research institutions</li>
          <li>Soil fertility baseline studies</li>
          <li>Validation of field-based methods</li>
        </ul>

        {/* Continue Tailwind conversion for sensors, spectroscopy, and other sections as above */}

        <h3 className="text-[#28644b] mt-4 text-lg font-semibold">2.2 Conductivity/Impedance-Based Sensors (e.g., JXCT)</h3>
        <h4 className="text-[#5b8573] mt-4 font-semibold">Operating Principle</h4>
        <p>
          Conductivity/impedance-based soil sensors estimate nutrient concentrations by measuring changes in the soil’s electrical properties.
        </p>
        <ul className="pl-6 list-disc">
          <li>Bulk Electrical Conductivity (EC): Influenced by water content, ionic concentration, and temperature.</li>
          <li>Dielectric Constant: Reflects soil’s ability to store electric charge, impacted by moisture and composition.</li>
        </ul>
        <p>
          Sensors apply a known electrical signal and measure impedance or conductivity, with variations reflecting soil chemistry.
        </p>
        <img
          src="https://europe1.discourse-cdn.com/arduino/optimized/4X/f/9/e/f9e280b74a705285ac83a4de3b9306e7c69c264b_2_690x398.jpeg"
          alt="Soil"
          className="block w-[500px] h-[300px] mx-auto"
        />
        <h4 className="text-[#5b8573] mt-4 font-semibold">Nutrient Estimation via Empirical Models</h4>
        <p>
          These sensors use calibrated empirical models derived from lab correlations to estimate nutrient concentrations.
        </p>
        <ul className="pl-6 list-decimal">
          <li>Sensor captures EC/impedance data in real time.</li>
          <li>Algorithms convert data into estimated NPK levels.</li>
          <li>Results are reagent-free and low-cost.</li>
        </ul>
        <h4 className="text-[#5b8573] mt-4 font-semibold">Advantages:</h4>
        <ul className="pl-6 list-disc">
          <li>Low cost and easy deployment.</li>
          <li>In-situ, reagent-free measurement.</li>
          <li>Often rugged and waterproof.</li>
        </ul>
        <h4 className="text-[#5b8573] mt-4 font-semibold">Limitations:</h4>
        <ul className="pl-6 list-disc">
          <li>Lower specificity and accuracy.</li>
          <li>Results affected by soil type and moisture.</li>
          <li>Requires frequent calibration.</li>
        </ul>
        <h4 className="text-[#5b8573] mt-4 font-semibold">Use Cases:</h4>
        <ul className="pl-6 list-disc">
          <li>Routine field monitoring.</li>
          <li>Low-budget agricultural operations.</li>
        </ul>

        <h3 className="text-[#28644b] mt-4 text-lg font-semibold">2.3 Optical Spectroscopy (NIRS, Multispectral, Hyperspectral)</h3>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_blBl6nBUQVKHr9xI1jBHy2TSXErJE23mA&s"
          alt="Spectroscopy"
          className="block w-[500px] h-[300px] mx-auto"
        />
        <h4 className="text-[#5b8573] mt-4 font-semibold">Principle:</h4>
        <ul className="pl-6 list-disc">
          <li>Measures light reflectance, absorbance, or transmittance across wavelengths.</li>
          <li>Detects molecular bonds and physiological indicators.</li>
        </ul>

        <table className="w-full my-4 border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">VIS (400–700nm)</th>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">NIR (700–1000nm)</th>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">SWIR (1000–2500nm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">RGB/multispectral</td>
              <td className="border px-3 py-2">NIRS + multi</td>
              <td className="border px-3 py-2">Hyperspectral</td>
            </tr>
          </tbody>
        </table>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Optical Techniques Overview</h4>
        <table className="w-full my-4 border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">Technique</th>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">Spectral Basis</th>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">What It Measures</th>
              <th className="border px-3 py-2 bg-[#e6f4ea] text-[#1b4332]">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">NIRS</td>
              <td className="border px-3 py-2">700–2500 nm</td>
              <td className="border px-3 py-2">Absorption by chemical bonds</td>
              <td className="border px-3 py-2">Soil/tissue nutrient quantification</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Multispectral Imaging</td>
              <td className="border px-3 py-2">3–10 bands</td>
              <td className="border px-3 py-2">Reflectance patterns</td>
              <td className="border px-3 py-2">Crop health & nutrient status</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Hyperspectral Imaging</td>
              <td className="border px-3 py-2">100–300+ bands</td>
              <td className="border px-3 py-2">High resolution data</td>
              <td className="border px-3 py-2">Stress, nutrient, and soil mapping</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">VIS/NIR Spectroscopy</td>
              <td className="border px-3 py-2">400–1000 nm</td>
              <td className="border px-3 py-2">Vegetation indices</td>
              <td className="border px-3 py-2">N deficiency detection</td>
            </tr>
          </tbody>
        </table>

        <h4 className="text-[#5b8573] mt-4 font-semibold">How It Works</h4>
        <ul className="pl-6 list-decimal">
          <li>Light source illuminates soil or plant.</li>
          <li>Sensors measure reflected or absorbed light.</li>
          <li>Spectral data converted into indices or chemical estimations.</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Advantages:</h4>
        <ul className="pl-6 list-disc">
          <li>Fast and non-destructive.</li>
          <li>Portable handheld scanners available.</li>
          <li>Analyzes moisture, NPK, organic matter.</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Limitations:</h4>
        <ul className="pl-6 list-disc">
          <li>Requires large calibration dataset.</li>
          <li>Accuracy influenced by soil moisture and texture.</li>
        </ul>

        <h4 className="text-[#5b8573] mt-4 font-semibold">Use Cases:</h4>
        <ul className="pl-6 list-disc">
          <li>Smart farming platforms.</li>
          <li>Soil scanning and mobile labs.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home2;
