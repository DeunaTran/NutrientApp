import React, { useEffect, useState } from 'react';
import type { LatLng, NPKMmatrix } from '~/library/interface';

interface AreaMapProps {
  inputCoord: LatLng;
  matrixValue: NPKMmatrix[][] | null;
  cell: [number, number] | null;
}

const MapNav: React.FC<AreaMapProps> = ({ inputCoord, matrixValue, cell }) => {
  const [MapComponents, setMapComponents] = useState<any>(null);


  useEffect(() => {
    import('react-leaflet').then((L) => {
      setMapComponents({
        MapContainer: L.MapContainer,
        TileLayer: L.TileLayer,
        Polygon: L.Polygon,
        Tooltip: L.Tooltip,
        useMap: L.useMap,
        Rectangle : L.Rectangle
      });
    });

    import('leaflet/dist/leaflet.css');
  }, []);

  const metersToDegrees = (meters: number): number => {
    // Approximate conversion assuming 1 degree ~ 111,320 meters
    return meters / 111320;
    };

    const halfSide = metersToDegrees(2.5); // 2.5 meters = half of 5m side

    const bounds: [LatLng, LatLng] = [
    [inputCoord[0] - halfSide, inputCoord[1] - halfSide], // Southwest
    [inputCoord[0] + halfSide, inputCoord[1] + halfSide], // Northeast
    ];

  if (!inputCoord || !MapComponents) return null;

  const { MapContainer, TileLayer, Polygon, Tooltip, useMap, Rectangle } = MapComponents;

  return (
    <div className=" fixed bottom-0 text-sm font-light text-black right-0 w-90 h-100">
      <div className='bg-gray-300  p-3'>
        <div className='text-center font-bold'> Chi tiết giá trị của ô đất đang chọn </div>
        {cell && <p> Hàng: {cell[0]} | Cột: {cell[1]}</p>}
        {matrixValue && cell && <div>
          <p> Nitơ: {matrixValue[cell[0]][cell[1]]["nitrogen"]}  </p>
          <p> Phospho: {matrixValue[cell[0]][cell[1]]["phosphorus"]}  </p>
          <p> Kali: {matrixValue[cell[0]][cell[1]]["potassium"]}  </p>
          <p> Độ ẩm: {matrixValue[cell[0]][cell[1]]["moisture"]}  </p>
          <p> Vĩ độ: {inputCoord[0].toPrecision(8)} </p>
          <p> Kinh độ: {inputCoord[1].toPrecision(8)} </p>
        </div>}

      </div>
      <MapContainer
        center={inputCoord}
        zoom={18}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, etc."
        />
        <Rectangle bounds={bounds} pathOptions={{ color: 'red' }}>
        <Tooltip direction="top" offset={[0, -10]}>
            5×5 meter square
        </Tooltip>
        </Rectangle>
      </MapContainer>
    </div>
  );
};

export default MapNav;
