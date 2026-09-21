import { createContext, useContext } from "react";
import type { User } from ".";

export const DashboardContext = createContext<User | undefined>(undefined);

//Create Custom useUserContext Hook To Show Error If Someone missed to use Provider
export function useUserContext() {
  const user = useContext(DashboardContext);

  if (user === undefined) {
    throw new Error("UseUserContext must be used with DashboardContext!");
  }

  return user;
}
