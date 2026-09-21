import { useState } from "react";
import Dashboard from "./Dashboard";
import { DashboardContext } from "./context";

export interface User {
  isSubscribed: boolean;
  name: string;
}

interface DemoProps {}

export default function Demo({}: DemoProps) {
  const [user] = useState<User>({
    isSubscribed: true,
    name: "Test",
  });

  return (
    <div>
      // Wrap the Component inside Provider to access useContext Hook
      <DashboardContext.Provider value={user}>
        <Dashboard />
      </DashboardContext.Provider>
      //
    </div>
  );
}
