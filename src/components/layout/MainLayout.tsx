import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen">
        <div className="px-12 py-10 max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
