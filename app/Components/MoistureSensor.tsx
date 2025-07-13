import React from 'react';

const MoistureSensor: React.FC = () => {

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-bold text-center mb-8">Soil Moisture Sensor - Detailed Comparison</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          An internet search today turns up thousands of options for measuring soil moisture — from analog dial-based devices to sophisticated electronic sensors. The abundance of options can be overwhelming when simply trying to identify which sensor provides reliable, accurate, and publishable data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Project Objective</h2>
        <p>
          The goal is to develop a reliable and cost-effective soil moisture monitoring system for field use — especially for agricultural settings like coffee farms during dry seasons. A key component is an <strong>in-situ soil moisture sensor</strong> that reflects real changes in volumetric water content (VWC) under field conditions.
        </p>
        <p>
          After evaluating several sensing technologies, <strong>capacitance-based sensors</strong> were selected over resistance-based ones due to their superior accuracy, scientific validity, and robustness.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">I. Resistance Moisture Sensor</h2>
        <p>
          A resistance moisture sensor measures the soil water content percentage by creating a voltage difference across two electrodes, allowing a small amount of current to flow between them and outputting a value of resistance or electrical conductivity.
        </p>
        <img
          src="
https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752326887/dzmtiqmj9ah1bke92jrp.jpg"
          alt="Soil"
          className="mx-auto my-4 w-[500px] h-[300px] object-contain"
        />
        <p>
          Since water is a very poor conductor, it is the ions in the water that carry the current from one electrode to the other. In theory, the idea is a good one; it makes sense that the resistance will go down as the amount of water in soil increases. However, in practice, there are challenges associated with the assumptions behind this method.
        </p>
        <img
          src="
https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752326932/ndeeuu0brhgeir2etdlx.jpg"
          alt="Soil"
          className="mx-auto my-4 w-[500px] h-[300px] object-contain"
        />
        <p>
          For the resistance method to work, one critical assumption is that the number of ions in the soil remains relatively constant. If the number of ions in the soil is not constant or we use the sensor in a different soil, accuracy becomes impossible because as the number of ions in the pore water changes, the ability for current to flow is altered, even when the amount of water has not changed.
        </p>
        <p>
          For a sensor to be used for more than wet/dry measurements, it needs to have a calibration that relates the sensor output (in this case, its resistance or its simple inverse: electrical conductivity) to volumetric water content.
        </p>
        <img
          src="
https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752326954/ok5yhzfebmpygvue3mqe.jpg"
          alt="Soil"
          className="mx-auto my-4 w-[500px] h-[300px] object-contain"
        />
        <p className='font-light text-xs text-center px-60'> The calibration of a resistance sensor at four different soil saturation extract electrical conductivities (ECe). For a modest change in ECe, the sensor calibration changes by ten times.</p>
        <p>
          Figure above is a simple model of saturation extract electrical conductivity (the electrical conductivity of water after it’s pulled out of a saturated soil). It shows that the sensor calibration can change more than an order of magnitude.
        </p>
        <p>
          So, although resistance sensors are inexpensive, react to changes in water content, and are simple to integrate into DIY projects, their only real use is for home gardening and science fair projects. In any scientific pursuit, they simply can’t produce reliable volumetric water content measurements.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Comparison of Sensor Types</h4>
        <table className="w-full table-auto border border-gray-400 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Sensor Type</th>
              <th className="border px-2 py-1">Measurement Principle</th>
              <th className="border px-2 py-1">Sensitivity to Water Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Resistance</td>
              <td className="border px-2 py-1">Electrical conductivity of ions</td>
              <td className="border px-2 py-1">Affected by salt, not just water</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Capacitance</td>
              <td className="border px-2 py-1">Dielectric permittivity of water</td>
              <td className="border px-2 py-1">Responds directly to water volume</td>
            </tr>
          </tbody>
        </table>
      </section>

      <p className="mb-8">
        Resistance sensors measure how easily electrical current passes between two probes, which is highly dependent on ion concentration (salinity), not just moisture. This leads to inaccurate or unstable readings in different soil types or fertilized plots.
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-2">II. Capacitance Sensor (Dielectric Measurement)</h2>
        <p>
          Dielectric sensors (TDR, FDR, capacitance types) are a general category of sensors that measure the charge-storing capacity of the soil. This charge-storage approach is much more effective than a resistance approach and correlates strongly with actual water content (VWC).
        </p>

        {/* {['Picture4', 'Picture5', 'Picture6', 'Picture7'].map((pic, idx) => ( */}
          <img
            // key={idx}
            src="https://res.cloudinary.com/dtjjgiitl/image/upload/q_auto:good,f_auto,fl_progressive/v1752326972/w74m4qyxbgpimxtjwloy.jpg"
            className="mx-auto my-4 w-[500px] h-[300px] object-contain"
          />
        {/* ))} */}

        <p>
          The ideal dielectric sensor electrical circuit is one that simply acts to polarize water molecules between two electrodes. The water molecules align in that field very briefly, so it stores a small amount of charge without causing the salt ions to polarize. This ideal measurement is sensitive to changes in the amount of water but not to changes in the amount of salt.
        </p>
        <p>
          Each material in soil has a unique ability to store electrical charge, referred to as its dielectric constant. The dielectric scale arbitrarily assigns a value of 1 to air and then relates other materials to that value. Soil is a mixture of solids, liquids, and gases. Each of these has a different dielectric, but in general, they all have low dielectric values compared to water. Thus, when the charge-storing capacity of the soil is measured by a dielectric sensor, water and air are the only things that change significantly by volume, so we can relate that to volumetric water content.
        </p>
        <p>
          Dielectric sensors are not perfect at predicting volumetric water content. However, things that affect performance do so with a much smaller effect. High-quality sensors have developed technology to mitigate many of these challenges and minimize error.
        </p>
      </section>
    </div>
  );
};

export default MoistureSensor;
