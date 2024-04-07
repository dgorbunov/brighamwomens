import { Outlet } from "react-router-dom";
import NewHeader from "../components/NewHeader.tsx";

function Layout() {
  return (
    <div>
      <NewHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
//helloWorld
