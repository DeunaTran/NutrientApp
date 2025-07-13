import { useState, useEffect } from "react";
import Footer from "~/Components/Footer";
import supabase from "utils/supabase";
import Authenticate from "~/Components/Authenticate";
import { type GridResult, type LatLng, type NPKMmatrix, type Nutrient, type NutrientGuide, type session } from "~/library/interface";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import AreaMap from "~/Components/AreaMap";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useUserStore } from "~/stores/useUserStore";
import { useLandStore } from "~/stores/useLandStore";
import { fetchSessionIdsGroupedByLand } from "~/library/groupLandSession";
import HeaderBannerPage from "~/Components/HeaderBannerPage";
import MapNav from "~/Components/MapNav";
import LinkSession from "~/Components/LinkSession";

interface UserProfile {
  cart: Record<string, any>; // or a more specific type if you know cart shape
  created_at: string;
  user_id: string;
  session_id: string[];
}

export default function Lookup() {
  const [authOpen, setAuthOpen] = useState(false);
  const setUser = useUserStore((s) => s.setUser)
  const setProfile = useUserStore((s) => s.setProfile)
  const profile = useUserStore((s) => s.profile)
  const lands = useLandStore((s)=> s.lands);
  const [loadingNutrient, setLoadingNutrient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nutrients, setNutrients] = useState<Nutrient[]>()
  const [gridMatrix, setGridMatrix] = useState<string[][] | null>(null)
  const [nutrientGuides, setNutrientGuides] = useState<NutrientGuide[]>();
  const [sessionId, setSessionId] = useState<string>("");
  const [grid, setGrid] = useState<GridResult>();
  const [session, setSession] = useState<session>();
  const [mapLand, setMapLand] = useState<Record<string, string[]>>({});
  const {setLands} = useLandStore.getState();
  const [pointer, setPointer] = useState<LatLng>();
  const [cell, setCell] = useState<[number, number] | null>(null);

  useEffect(()=> {
    if(!profile) console.log("No Profile");
    fetchLand();
  }, [profile])

  useEffect(()=>{
    if(lands.length === 0) return;
    mapLandSession(); // Map land to session !
  },[lands])

  useEffect(()=>{
    if(gridMatrix !== null){
      generateMapNPKM(gridMatrix);
    }
  }, [gridMatrix])
  

  const mapLandSession = async () =>  {
    const mapLand = await fetchSessionIdsGroupedByLand()
    setMapLand(mapLand);
    console.log("Map Land: ", mapLand);
  }

  const fetchLand = async () => {
  if(!profile) return ;
  const land_ids = profile.land_ids; // must be an array of strings (or UUIDs)
  if (!Array.isArray(land_ids) || land_ids.length === 0) return;
  const { data, error } = await supabase
    .from("land")
    .select("*")
    .in("id", land_ids); // filter where id is in land_ids array
  if (error) {
    console.error("Error fetching lands:", error);
    return;
  }else if(data) {
    setLands(data);
  }
};



  function handleLoadingData(ID:string) {
    setSessionId(ID)
    fetchSession(ID);
    setLoadingNutrient(true);
    fetchNutrientGuide();
    fetchNutrient(ID);
    setLoadingNutrient(false);
  }

    const fetchSession = async (session_id: string) => {
    setLoadingNutrient(true);
    const { data, error } = await supabase
      .from('session')
      .select('*')
      .eq('session_id', session_id)
      .single();

    if (!error && data) {
      setSession(data);
    } else {
      alert('Không tìm thấy phiên tra cứu đất của bạn!');
    }
    setLoadingNutrient(false);
  };


  
  useEffect(() => {
    const loadUserAndProfile = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser()

      if (authData.user && authData.user.email) {
        const u = authData.user
        setUser({
          id: u.id,
          email: u.email!,
          full_name: u.user_metadata?.full_name,
          phone: u.user_metadata?.phone,
          app_metadata: u.app_metadata,
          user_metadata: u.user_metadata,
          created_at: u.created_at,
        })

        // Load user profile from your own table
        const { data: profile, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('user_id', u.id)
          .single()
        if (profile) {
          setProfile(profile)
        } else {
          console.warn('Profile not found', profileError)
        }
      }
      else{
        setAuthOpen(true);
      }
    }
    loadUserAndProfile()
  }, [])



  const fetchNutrientGuide = async ( ) => {
    const { data, error } = await supabase
      .from("guide")
      .select("*") // or select('role, cart, ...') if you want specific columns
    if (error) {
      console.error("Error fetching profile:", error); // Reset profile if there's an error
    } else {
      setNutrientGuides(data);
      console.table(data);
    }
  };
 const fetchNutrient = async (session_id: string) => {
    setLoadingNutrient(true);
    const { data, error } = await supabase
      .from("nutrient")
      .select("*") 
      .eq("session_id", session_id)

    if (error) {
      console.error("Error fetching nutrients:", error); 
    } else {
      setNutrients(data);
      console.log("nutrients: ", data);
      const grid = generateNutrientGrid(data);
      setGrid(grid);
      setGridMatrix(grid.matrix);
    }
    setLoadingNutrient(false);
  };


function generateNutrientGrid(points: Nutrient[], cellSizeMeters = 5): GridResult {
  if (points.length === 0) throw new Error("No points provided.");

  // Step 1: Bounding box
  let north = -Infinity, south = Infinity, west = Infinity, east = -Infinity;

  for (const pt of points) {
    if (pt.latitude > north) north = pt.latitude;
    if (pt.latitude < south) south = pt.latitude;
    if (pt.longitude < west) west = pt.longitude;
    if (pt.longitude > east) east = pt.longitude;
  }

  // Constants
  const latMeters = 111320; // 1 degree latitude ≈ 111.32 km
  const avgLat = (north + south) / 2;
  const lonMeters = 111320 * Math.cos(avgLat * Math.PI / 180);

  // Step 2: Grid dimensions
  const latRange = (north - south) * latMeters;
  const lonRange = (east - west) * lonMeters;

  const numRows = Math.ceil(latRange / cellSizeMeters);
  const numCols = Math.ceil(lonRange / cellSizeMeters);

  // Step 3: Create matrix filled with 0s
  const matrix = Array.from({ length: numRows }, () =>
    Array<string>(numCols).fill("0")
  );

  // Step 4: Map each point to its cell
  for (const pt of points) {
    const row = Math.floor((north - pt.latitude) * latMeters / cellSizeMeters);
    const col = Math.floor((pt.longitude - west) * lonMeters / cellSizeMeters);

    if (
      row >= 0 && row < numRows &&
      col >= 0 && col < numCols
    ) {
      if(matrix[row][col] == "0"){
        matrix[row][col] = String(pt.id);
      }
      else{
        matrix[row][col] +=  "," +String(pt.id);
      }
    }
  }

  return {
    matrix,
    numRows,
    numCols,
    north,
    south,
    west,
    east
  };
}

function GridDisplay( {matrix}: {matrix :  string[][]} ) {
  return (
    <div className="p-4 space-y-0.5">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-0.5">
          {row.map((cell, colIndex) => {
            const normalized = cell.trim();
            // const count = cell === '0' ? 0 : cell.split(",").length;
            const count = normalized === '0' ? 0 : normalized.split(",").length;

            let bgColor = "bg-gray-300"; // default
            if (count === 1) bgColor = "bg-yellow-300";
            else if (count <= 3 && count > 1) bgColor = "bg-orange-400";
            else if (count >= 4) bgColor = "bg-red-500";

            const handleClick = () => {
              if (!grid) return;
             
              const numRows = grid.matrix.length;
              const numCols = grid.matrix[0].length;

              const cellHeight = (grid.north - grid.south) / numRows;
              const cellWidth = (grid.east - grid.west) / numCols;

              const lat = grid.north - (rowIndex + 0.5) * cellHeight;
              const lng = grid.west + (colIndex + 0.5) * cellWidth;
              setPointer([lat,lng]);
            };

            return (
              <div
                key={colIndex}
                className={`${bgColor} 
                 w-4 h-4 cursor-pointer`}
                title={cell}
                onClick={handleClick}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const [ matrixValue, setMatrixValue ] = useState<NPKMmatrix[][] | null>(null);

function generateMapNPKM(matrix: string[][] ) {
  if (!nutrients) return;

  const newMatrix: NPKMmatrix[][] = matrix.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      const normalized = cell.trim();

      if (normalized === "0") {
        // Empty cell, return zero values
        return {
          nitrogen: 0,
          phosphorus: 0,
          potassium: 0,
          moisture: 0,
        };
      }

      const ids = normalized.split(",").map((id) => parseInt(id));
      const nutrientRows = ids
        .map((id) => nutrients.find((n) => n.id === id))
        .filter(Boolean);

      const avg = (arr: number[]) =>
        arr.reduce((sum, val) => sum + val, 0) / arr.length;

      const Nvalues = nutrientRows.map((n) => n!.nitrogen);
      const Pvalues = nutrientRows.map((n) => n!.phosphorus);
      const Kvalues = nutrientRows.map((n) => n!.potassium);
      const Mvalues = nutrientRows.map((n) => n!.moisture);

      return {
        nitrogen: avg(Nvalues),
        phosphorus: avg(Pvalues),
        potassium: avg(Kvalues),
        moisture: avg(Mvalues),
      };
    });
  });
  console.log("matrixValue: ", newMatrix)

  setMatrixValue(newMatrix);
}

function GridDisplayMetrics({ matrix, metrics }: { matrix: string[][], metrics: string }) {
  if(!nutrientGuides || !nutrients ) {
    console.log("No Nutrient or guide");
    return;
  };
  console.log("lands", lands, session)
  const crop = lands.find(land => land.id === session?.land_id)?.crop?.toLowerCase();
  const guide = nutrientGuides.find(g => g.crop.toLowerCase() === crop);
  console.log("crop from land: ",);
  const standardMinMax = guide
    ? {
        "nitrogen" : { min: guide.minNitrogen, max: guide.maxNitrogen },
        "phosphorus": { min: guide.minPhosphorus, max: guide.maxPhosphorus },
        "potassium": { min: guide.minPotassium, max: guide.maxPotassium }
      }
    : null;

  const note = guide?.note || "";

  return (
    <div className="p-4 space-y-0.5">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => {
            const normalized = cell.trim();
            let bgColor = "bg-gray-300"; // Default for empty cell

            if (normalized !== "0") {
              const ids = normalized.split(",").map(id => parseInt(id));
              const values = ids
                .map(id => nutrients.find(n => n.id === id))
                .filter(Boolean)
                .map(n => n?.[metrics as keyof Nutrient]) as number[];

              const mean =
                values.reduce((sum, val) => sum + val, 0) / values.length;

              if (standardMinMax) {
                const { min, max } = standardMinMax[metrics as keyof typeof standardMinMax];

                if (mean < min) bgColor = "bg-blue-200";         // Below standard
                else if (mean > max) bgColor = "bg-red-200";      // Above standard
                else bgColor = "bg-green-300";                    // Within standard
              }
            }
            if (!grid) return;       
            const numRows = grid.matrix.length;
            const numCols = grid.matrix[0].length;

            const cellHeight = (grid.north - grid.south) / numRows;
            const cellWidth = (grid.east - grid.west) / numCols;

            const lat = grid.north - (rowIndex + 0.5) * cellHeight;
            const lng = grid.west + (colIndex + 0.5) * cellWidth;

            const handleClick = () => {
              setPointer([lat,lng]);
              setCell([rowIndex, colIndex]);
            }
            const isSelected =
            pointer &&
            Math.abs(pointer[0] - lat) < 1e-5 &&
            Math.abs(pointer[1] - lng) < 1e-5;

            return (
              <div
                key={colIndex}
                onClick={handleClick}
                className={`${bgColor}  
                 ${isSelected ? "border-brown-400" : "border-white"}
                border w-4 h-4 border `}
                title={cell} 
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
function Subtitle() {
  const items = [
    { color: 'bg-red-200', label: 'Hàm lượng vượt quá tiêu chuẩn' },
    { color: 'bg-green-300', label: 'Hàm lượng hợp lý' },
    { color: 'bg-blue-200', label: 'Hàm lượng dưới mức tiêu chuẩn' },
  ];

  return (
    <>
      {items.map(({ color, label }, idx) => (
        <div key={idx} className="font-thin text-xs flex flex-row items-center mb-1">
          <div className={`${color} w-4 h-4 mx-1 rounded-sm`} />
          {label}
        </div>
      ))}
    </>
  );
}

useEffect(()=>{
    if(!grid) return;
    const numRows = grid.matrix.length;
    const numCols = grid.matrix[0].length;

    const cellHeight = (grid.north - grid.south) / numRows;
    const cellWidth = (grid.east - grid.west) / numCols;

    const lat = grid.north - (0 + 0.5) * cellHeight;
    const lng = grid.west + (0 + 0.5) * cellWidth;
    setPointer([lat,lng]);
},[grid])

  
  return (
    <div className="bg-white ">
      <HeaderBannerPage setOpenAuthModal={() => setAuthOpen(true)} />
      <Authenticate isOpen={authOpen} onClose={() => setAuthOpen(false)} setIsAuthenticated={setIsAuthenticated} />
    
      <div className="mt-20 p-8 overflow-x-auto text-black">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200">Tên Mảnh Đất</th>
                  <th className="px-4 py-2">Các Phiên Đo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lands?.map((land) => (
                  <tr key={land.id}>
                    <td className="px-4 py-2 font-semibold whitespace-nowrap border-r border-gray-200">
                      {land.name}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        {mapLand[land.id]?.map((ID) => (
                          <button
                            key={ID}
                            onClick={() => handleLoadingData(ID)}
                            className={`px-3 py-1 rounded-full text-sm font-medium 
                              ${
                                ID === sessionId
                                  ? "bg-green-400 text-white"
                                  : "bg-green-100 text-green-900 hover:bg-green-200"
                              }`}
                          >
                            {ID}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <LinkSession/>


      <div className="text-center mt-20">
        <p className="text-lg font-black text-black"> Báo cáo của phiên tra cứu đất: <span className="text-gray-500"> {sessionId} </span> </p>
      </div>
      <div className="p-10 grid grid-cols-2 gap-8 text-sm text-black font-light">
        <div className=" col-span-1 flex flex-col gap-1">
          {gridMatrix && 
          <GridDisplay matrix = {gridMatrix}/>
          }
          <p className=""> Bản đồ mật độ đo đạc </p>
          <div className="font-thin text-xs flex flex-row"> 
            <div className={` bg-red-500 w-4 mx-1 h-4 cursor-pointer`}></div> 
            màu đỏ cho biết có từ 4 mẫu đất trở lên
          </div>
          <div className="font-thin text-xs flex flex-row"> 
            <div className={` bg-orange-400 w-4 mx-1 h-4 cursor-pointer`}></div> 
            màu cam cho biết có từ 1 tới 3 mẫu đất
          </div>
           <div className="font-thin text-xs flex flex-row"> 
            <div className={` bg-yellow-300 w-4 mx-1 h-4  cursor-pointer`}></div> 
            màu xanh cho biết có 1 mẫu đất
          </div>
        </div>
        <div className=" col-span-1 gap-1 flex-col flex">
          {  gridMatrix && (
            <GridDisplayMetrics matrix={gridMatrix} metrics="nitrogen" />
          )}
          <p className=""> Bản đồ mật độ Nitơ </p>
          <Subtitle/>
        </div>

        <div className=" col-span-1">
          {  gridMatrix && (
            <GridDisplayMetrics matrix={gridMatrix} metrics="phosphorus" />
          )}
          <p className=""> Bản đồ mật độ Phospho </p>
          <Subtitle/>
        </div>

        <div className=" col-span-1">
          {  gridMatrix && (
            <GridDisplayMetrics matrix={gridMatrix} metrics="potassium" />
          )}
          <p className=""> Bản đồ mật độ Kali </p>
          <Subtitle/>
        </div>
        <p>{pointer ? pointer[0]: 0}</p>
      </div> 
      {
        pointer && 
      <MapNav inputCoord={pointer} matrixValue={matrixValue} cell={cell}/>
      }


      <Footer />
    </div>
  );
}
