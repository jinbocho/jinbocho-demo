import { useData } from "../../store/DataContext";
import { useLanguage } from "../../i18n";
import { Select } from "../ui/Select";

export interface LocationValue {
  room_id: string | null;
  bookcase_id: string | null;
  section_id: string | null;
  shelf_id: string | null;
}

interface LocationPickerProps {
  value: LocationValue;
  onChange: (value: LocationValue) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const { t } = useLanguage();
  const { rooms, bookcases, sections, shelves } = useData();

  const filteredBookcases = bookcases.filter((bc) => bc.room_id === value.room_id);
  const filteredSections = sections
    .filter((s) => s.bookcase_id === value.bookcase_id)
    .sort((a, b) => a.section_index - b.section_index);
  const filteredShelves = shelves
    .filter((sh) => sh.section_id === value.section_id)
    .sort((a, b) => a.shelf_index - b.shelf_index);

  return (
    <div className="grid grid-cols-2 gap-3">
      <Select
        label={t.placement.room}
        placeholder={t.placement.selectPlaceholder}
        value={value.room_id ?? ""}
        onChange={(e) => onChange({ room_id: e.target.value || null, bookcase_id: null, section_id: null, shelf_id: null })}
        options={rooms.map((r) => ({ value: r.id, label: r.name }))}
      />
      <Select
        label={t.placement.bookcase}
        placeholder={t.placement.selectPlaceholder}
        disabled={!value.room_id}
        value={value.bookcase_id ?? ""}
        onChange={(e) => onChange({ ...value, bookcase_id: e.target.value || null, section_id: null, shelf_id: null })}
        options={filteredBookcases.map((bc) => ({ value: bc.id, label: bc.name }))}
      />
      <Select
        label={t.placement.section}
        placeholder={t.placement.selectPlaceholder}
        disabled={!value.bookcase_id}
        value={value.section_id ?? ""}
        onChange={(e) => onChange({ ...value, section_id: e.target.value || null, shelf_id: null })}
        options={filteredSections.map((s) => ({ value: s.id, label: s.label ?? t.locations.sectionLabel(s.section_index) }))}
      />
      <Select
        label={t.placement.shelf}
        placeholder={t.placement.selectPlaceholder}
        disabled={!value.section_id}
        value={value.shelf_id ?? ""}
        onChange={(e) => onChange({ ...value, shelf_id: e.target.value || null })}
        options={filteredShelves.map((sh) => ({ value: sh.id, label: t.locations.shelfLabel(sh.shelf_index) }))}
      />
    </div>
  );
}
