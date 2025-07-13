import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useUserStore } from '~/stores/useUserStore';
import { useLandStore } from '~/stores/useLandStore';
import supabase from 'utils/supabase';
import AreaMap from '~/components/AreaMap';

import type { LatLng } from '~/library/interface';
import type { GridResult, Nutrient, NutrientGuide, session } from '~/library/interface';

export default function LinkSession() {
  const [grid, setGrid] = useState<GridResult>();
  const [points, setPoints] = useState<number[][]>([]);
  const [coords, setCoords] = useState<LatLng[]>([]);
  const [gridMatrix, setGridMatrix] = useState<string[][] | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingNutrient, setLoadingNutrient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nutrients, setNutrients] = useState<Nutrient[]>();
  const [nutrientGuides, setNutrientGuides] = useState<NutrientGuide[]>();
  const [sessionId, setSessionId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<number>(0);
  const [session, setSession] = useState<session>();
  const [mapLand, setMapLand] = useState<Record<string, string[]>>({});
  const [pointer, setPointer] = useState<LatLng>();

  const setUser = useUserStore((s) => s.setUser);
  const setProfile = useUserStore((s) => s.setProfile);
  const user = useUserStore((s) => s.user);
  const profile = useUserStore((s) => s.profile);
  const lands = useLandStore((s) => s.lands);
  const { setLands } = useLandStore.getState();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setStage(0);
    setCoords([]);
    setPoints([]);
    setGrid(undefined);
    setGridMatrix(null);
  }

  function handleSubmitSession(e: React.FormEvent) {
    e.preventDefault();
    fetchNutrientGuide();
    fetchNutrient(sessionId);
    fetchSession(sessionId);
  }
  
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
  

  const fetchNutrient = async (session_id: string) => {
    setLoadingNutrient(true);
    const { data, error } = await supabase
      .from('nutrient')
      .select('*')
      .eq('session_id', session_id);

    if (!error && data) {
      setNutrients(data);
      const grid = generateNutrientGrid(data);
      setGrid(grid);
      setGridMatrix(grid.matrix);
    } else {
      console.error('Error fetching nutrients:', error);
    }
    setLoadingNutrient(false);
  };

  const fetchNutrientGuide = async () => {
    setLoadingProfile(true);
    const { data, error } = await supabase.from('guide').select('*');
    if (!error && data) {
      setNutrientGuides(data);
    } else {
      console.error('Error fetching guide:', error);
    }
    setLoadingProfile(false);
  };

  const fetchSession = async (session_id: string) => {
    setLoadingNutrient(true);
    const { data, error } = await supabase
      .from('session')
      .select('*')
      .eq('session_id', session_id)
      .single();

    if (!error && data) {
      setSession(data);
      if (data.land_id === null) setStage(2);
      else close();
    } else {
      alert('Không tìm thấy phiên tra cứu đất của bạn!');
    }

    setLoadingNutrient(false);
  };

  const GridDisplay = ({ matrix }: { matrix: string[][] }) => (
    <div className="p-4 space-y-0.5">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-0.5">
          {row.map((cell, colIndex) => {
            const normalized = cell.trim();
            const count = normalized === '0' ? 0 : normalized.split(',').length;

            let bgColor = 'bg-gray-300';
            if (count === 1) bgColor = 'bg-yellow-300';
            else if (count <= 3) bgColor = 'bg-orange-400';
            else if (count >= 4) bgColor = 'bg-red-500';

            const handleClick = () => {
              if (!grid) return;

              const numRows = grid.matrix.length;
              const numCols = grid.matrix[0].length;
              const cellHeight = (grid.north - grid.south) / numRows;
              const cellWidth = (grid.east - grid.west) / numCols;
              const lat = grid.north - (rowIndex + 0.5) * cellHeight;
              const lng = grid.west + (colIndex + 0.5) * cellWidth;

              const selected = points.some(([r, c]) => r === rowIndex && c === colIndex);
              if (selected) {
                setPoints((prev) => prev.filter(([r, c]) => r !== rowIndex || c !== colIndex));
                setCoords((prev) => prev.filter(([lt, lg]) => lt !== lat || lg !== lng));
              } else {
                setPoints((prev) => [...prev, [rowIndex, colIndex]]);
                setCoords((prev) => [...prev, [lat, lng]]);
              }
            };

            return (
              <div
                key={colIndex}
                onClick={handleClick}
                className={`${bgColor} ${points.some(([r, c]) => r === rowIndex && c === colIndex) ? 'border-red-500' : 'border-white'} w-4 h-4 border border-2 cursor-pointer`}
                title={cell}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <button className="text-white rounded-lg mx-10 p-2 bg-black" onClick={() => { setStage(1); open(); }}>
        Nhập phiên đo mẫu đất mới
      </button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-5xl rounded-xl text-black bg-white px-6 py-3 shadow-lg">
              <div className="bg-gray-100 p-4 rounded-lg">
                {profile ? (
                  <div className="flex flex-row gap-2">
                    <MdOutlineAccountCircle size={40} />
                    <div className="flex text-xs font-light flex-col gap-1">
                      <p>id của tài khoản: {profile?.user_id}</p>
                      <p>tên tài khoản: {user?.email}</p>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAuthOpen(true)}>Đăng Nhập</button>
                )}
              </div>

              {stage === 1 && (
                <>
                  <DialogTitle as="h3" className="text-lg font-semibold text-gray-800">
                    Nhập phiên tra cứu NPK (8 chữ và số)
                  </DialogTitle>
                  <form onSubmit={handleSubmitSession} className="text-black mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID Phiên</label>
                      <input
                        type="text"
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Mã 8 chữ & số "
                        required
                      />
                      <div className="text-xs pr-10 font-light text-gray-400">
                        Mã số thiết bị tạo ra trong mỗi lần đo
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="submit" className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                        Tiếp tục
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {loadingNutrient && <span className="loading loading-ring loading-xl"></span>}

              {stage === 2 && gridMatrix && session?.land_id === null && (
                <div className="grid grid-cols-3">
                  <div className="flex flex-col h-full justify-center items-center">
                    <DialogTitle as="h3" className="text-lg font-light text-gray-800">
                      Chọn tối thiểu 3 điểm để định hình mảnh đất của bạn
                    </DialogTitle>
                    <GridDisplay matrix={gridMatrix} />
                    <div className="text-xs font-light text-black">
                      <p>* Nhấp vào ô vuông phía trên để chọn góc - ô vuông đã chọn sẽ có viền đỏ</p>
                      <p>* Nhấp vào ô vuông đã chọn để xóa chọn ô vuông đó</p>
                      <p>* Hệ thống khuyến khích bạn định hình mảnh đất bằng cách chọn ô vuông theo viền của mảnh đất</p>
                    </div>
                  </div>
                  <AreaMap inputCoords={coords} sessionId={sessionId} onclose={close} />
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
