import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://uaoclocitstvoyezvrdg.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2Nsb2NpdHN0dm95ZXp2cmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODAwODAsImV4cCI6MTk4Mzc1NjA4MH0.MpsZdvCUxrf03C6VUXEhTxcE06lqRGuNxPdkQFo8qAA";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    }
  }
}