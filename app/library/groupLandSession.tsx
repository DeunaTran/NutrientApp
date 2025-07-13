import supabase from 'utils/supabase';
import { useLandStore } from '~/stores/useLandStore';

export async function fetchSessionIdsGroupedByLand() {
    const mapLand: Record<string, string[]> = {};
    for (const land of useLandStore.getState().lands) {
        const { data, error } = await supabase
            .from('session')
            .select('session_id')
            .eq('land_id', land.id);

        if (error) {
            console.error(`Failed to fetch sessions for land ${land.id}`, error);
            continue;
        }

        if (data) {
            mapLand[land.id] = data.map((s) => s.session_id);
        }
        }

    console.log(mapLand);
    return mapLand;
}
