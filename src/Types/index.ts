export interface ISystemSliceInitialState {
  mode: TailwindThemeType;
}

export type TailwindThemeType =
  | ThemeTypesEnum.DARK
  | ThemeTypesEnum.LIGHT
  | ThemeTypesEnum.SYSTEM;

export enum ThemeTypesEnum {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system",
}

export interface VoltageReading {
  timestamp: string;
  voltage: string;
}

export interface Transformer {
  assetId: number;
  name: string;
  region: string;
  health: string;
  lastTenVoltgageReadings: VoltageReading[];
}
