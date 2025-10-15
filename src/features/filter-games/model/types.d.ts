import type { AvailableSizes } from "~/shared/types";

export type SizeDropdownValue = AvailableSizes | null;

export interface SizeDropdownOption {
  value: SizeDropdownValue;
  label: string;
}
