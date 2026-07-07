import type { LocationValue } from "../../components/locations/LocationPicker";

export function shelfLocationSearch(loc: LocationValue): string {
  const params = new URLSearchParams();
  if (loc.room_id) params.set("room_id", loc.room_id);
  if (loc.bookcase_id) params.set("bookcase_id", loc.bookcase_id);
  if (loc.section_id) params.set("section_id", loc.section_id);
  if (loc.shelf_id) params.set("shelf_id", loc.shelf_id);
  return params.toString();
}

function clean(value: string | null): string | null {
  return value && value !== "undefined" && value !== "null" ? value : null;
}

export function readShelfLocation(params: URLSearchParams): LocationValue {
  const shelf_id = clean(params.get("shelf_id"));
  if (!shelf_id) return { room_id: null, bookcase_id: null, section_id: null, shelf_id: null };
  return {
    shelf_id,
    section_id: clean(params.get("section_id")),
    bookcase_id: clean(params.get("bookcase_id")),
    room_id: clean(params.get("room_id")),
  };
}
