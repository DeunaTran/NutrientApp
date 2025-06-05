// lib/queries.ts

import supabase from 'utils/supabase';

export const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
};
