// import { useEffect, useState } from "react";

// // At the top of your map file
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix default icon paths
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconUrl,
//   shadowUrl: iconShadowUrl,
// });

// export default function FreeMap({ lat, lng }: { lat: number; lng: number }) {
//   const [Leaflet, setLeaflet] = useState<any>(null);
//   const [components, setComponents] = useState<any>(null);
//   console.log("GPS: " , lat, lng);

// useEffect(() => {
//   Promise.all([
//     import("leaflet"),
//     import("react-leaflet")
//   ]).then(([L, leafletComponents]) => {
//     // Fix marker icons here after leaflet is available
//     import("leaflet/dist/images/marker-icon.png").then((iconUrl) => {
//       import("leaflet/dist/images/marker-shadow.png").then((iconShadowUrl) => {
//         delete L.Icon.Default.prototype._getIconUrl;
//         L.Icon.Default.mergeOptions({
//           iconUrl: iconUrl.default,
//           shadowUrl: iconShadowUrl.default
//         });

//         setLeaflet(L);
//         setComponents(leafletComponents);
//       });
//     });
//   });
// }, []);


//   if (!Leaflet || !components) return null;

//   const { MapContainer, TileLayer, Marker, Popup } = components;

//   return (
//     <MapContainer
//       center={[lat, lng]}
//       zoom={18}
//       style={{ height: "300px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=TCqLyeVXqGLaknp4L27x"
//         attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//       <Marker position={[lat, lng]}>
//         <Popup>Selected Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }
