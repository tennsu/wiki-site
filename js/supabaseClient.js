import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://ksxivskpgxsvfvhbrhhh.supabase.co", // ←自分のURL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzeGl2c2twZ3hzdmZ2aGJyaGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTI3MDgsImV4cCI6MjA3NDUyODcwOH0.NY48ixkZ-GVt9CO-TeyZmkVG4kyEgE5V3YC3iId-lF0"                      // ←自分のAnon Key
);
