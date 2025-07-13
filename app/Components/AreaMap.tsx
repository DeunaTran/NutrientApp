import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';
import type { LatLngExpression } from 'leaflet';
import type { LatLng } from '~/library/interface';
import supabase from 'utils/supabase';
import { useLandStore } from '~/stores/useLandStore';
import { useUserStore } from '~/stores/useUserStore';


interface PolygonData {
  coords: LatLng[];
  area: number;
}

interface AreaMapProps {
  inputCoords: LatLng[];
  sessionId : string;
  onclose: () => any;
}

const AreaMap: React.FC<AreaMapProps> = ({inputCoords, sessionId, onclose}) => {
  const [MapComponents, setMapComponents] = useState<any>(null);
  const [polygon, setPolygon] = useState<PolygonData | null>(null);
  const [coords, setCoords] = useState<LatLng[]>(inputCoords);
  const profile = useUserStore((s)=> s.profile);
  const lands = useLandStore((s)=> s.lands);
  const [landName, setLandName] = useState<string>("");
  const [crop, setCrop] = useState<string>("");


  useEffect(() => {
    setCoords(inputCoords);
  }, [inputCoords]);


async function handleSubmitLand(e: React.FormEvent) {
  e.preventDefault();
  console.log("Land", landName, sessionId);
  console.log("Area", crop);

  if (!coords || coords.length < 3) return;

  try {
    // Step 1: Insert land
    const { data, error: insertError } = await supabase
      .from("land")
      .insert([
        {
          crop: crop,
          name: landName,
          area: polygon?.area,
          polygon: polygon?.coords,
        },
      ])
      .select()
      .single();

    if (insertError || !data) {
      console.error("Error inserting land:", insertError);
      return;
    }

    const land_id = data.id;
    useLandStore.getState().addLand(data);

    // Step 2: Update profile
    if (profile) {
      const newLand_ids = [...profile.land_ids, land_id];

      const { error: profileError } = await supabase
        .from("profile")
        .update({ land_ids: newLand_ids })
        .eq("user_id", profile.user_id);

      if (profileError) {
        console.error("Failed to update profile:", profileError);
      } else {
        useUserStore.getState().setProfile({
          ...profile,
          land_ids: newLand_ids,
        });
      }
    }

    // Step 3: Update session
    if (sessionId) {
      console.log("update Sesion - id: ", sessionId)
      const { error: sessionError } = await supabase
        .from("session")
        .update({ land_id: land_id })
        .eq("session_id", sessionId);

      if (sessionError) {
        console.error("Failed to update session:", sessionError);
      }
    }

    // Finalize
    onclose();
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// const fetchLand = async () => {
//   if(!profile) return ;
//   const land_ids = profile.land_ids; // must be an array of strings (or UUIDs)
//   if (!Array.isArray(land_ids) || land_ids.length === 0) return;
//   const { data, error } = await supabase
//     .from("land")
//     .select("*")
//     .in("id", land_ids); // filter where id is in land_ids array
//   if (error) {
//     console.error("Error fetching lands:", error);
//     return;
//   }else if(data) {
//     setLands(data);
//   }
// };

  

useEffect(() => {
  if (!coords || coords.length < 3) return; // Need at least 3 points for a polygon
  const turfCoords = coords.map(([lat, lng]) => [lng, lat]);

  if (
    turfCoords[0][0] !== turfCoords.at(-1)?.[0] ||
    turfCoords[0][1] !== turfCoords.at(-1)?.[1]
  ) {
    turfCoords.push(turfCoords[0]);
  }

  const poly = turf.polygon([turfCoords]);
  const area = turf.area(poly);

  setPolygon({ coords, area });

  // Dynamically import Leaflet components
  import('react-leaflet').then((L) => {
    setMapComponents({
      MapContainer: L.MapContainer,
      TileLayer: L.TileLayer,
      Polygon: L.Polygon,
      Tooltip: L.Tooltip,
      useMap: L.useMap,
    });
  });

  import('leaflet/dist/leaflet.css');
}, [coords]);

  if (!MapComponents || !polygon || coords.length < 3) return null;

  const { MapContainer, TileLayer, Polygon, Tooltip, useMap } = MapComponents;

  const FitMapToPolygon = ({ coords }: { coords: LatLng[] }) => {
    const map = useMap();

    useEffect(() => {
      map.fitBounds(coords);
    }, [coords]);

    return null;
  };

  return (
    <form onSubmit={handleSubmitLand} className="p-4 col-span-2  ">
      <div className='grid grid-cols-2 gap-4'>
        <MapContainer
          center={polygon.coords[0] as LatLngExpression}
          zoom={18}
          scrollWheelZoom={true}
          style={{ height: '400px', marginTop: '0px' }}
        >
          {/* <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          /> */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, etc."
          />
          <FitMapToPolygon coords={polygon.coords} />
          <Polygon
            positions={polygon.coords}
            pathOptions={{ color: 'blue', weight: 2 }}
          >
            <Tooltip sticky>
              Area: {polygon.area.toFixed(2)} m²
            </Tooltip>
          </Polygon>
        </MapContainer>

        <div className="mt-4 text-gray-700 gap-2 flex flex-col">
          <h3 className="text-lg text-black font-semibold">Diện tích đất: {polygon.area.toFixed(2)} m²</h3>
          <div>
            <label className="block text-sm font-medium ">
              Đặt tên mảnh đất của bạn
            </label>
            <input
              type="text"
              value={landName}
              onChange={(e) => setLandName(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Tên (VD: Bảo Lộc 1) "
              required
            />
          </div>
         
          <p className='text-sm font-light'>Hoặc chọn từ mảnh đất bạn đã tạo</p>

          <div>
            <label className="block text-sm font-medium ">
              Đặt tên mảnh đất của bạn
            </label>
            <select
              value={landName}
              onChange={(e) => setLandName(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              {lands.map((land, idx)=>{
              return(<option key={idx} value={land.name}>
                {land.name}
              </option>)
              })}
            </select>
          </div>

                             <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Loại cây trồng
                    </label>
                    <select
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    >
                      <option value="">Chọn loại cây</option>
                      <option value="Coffee">Coffee</option>
                      <option value="Tea">Tea</option>
                      <option value="Rubber">Rubber</option>
                      <option value="Cashew">Cashew</option>
                      <option value="Peach">Peach</option>
                      <option value="Corn">Corn</option>
                      <option value="Soybean">Soybean</option>
                      <option value="Tomato">Tomato</option>
                      <option value="Cucumber">Cucumber</option>
                      <option value="Potato">Potato</option>
                    </select>

                    <div className="text-xs pr-10 font-light text-gray-400">
                      Sau này hệ thống sẽ giúp dự báo khối lượng phân bón bạn cần 
                    </div>
                  </div>

           <button onClick={handleSubmitLand} className='bg-black text-white cursor-pointer p-2 rounded-lg' >
            Hoàn tất cài đặt thông tin
          </button>

        </div>
      </div>
    </form>
  );
};

export default AreaMap;
