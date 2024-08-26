import { DriverStore, LocationStore, MarkerData } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set((state) => ({
      ...state,
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitude,
    })),
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>
    set((state) => ({
      ...state,
      destinationAddress: address,
      destinationLongitude: longitude,
      destinationLatitude: latitude,
    })),
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set((state) => ({ ...state, selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) =>
    set((state) => ({ ...state, drivers })),
  clearSelectedDriver: () =>
    set((state) => ({ ...state, selectedDriver: null })),
}));
