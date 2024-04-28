import paths from "./paths.tsx";
import Home from "../routes/Home.tsx";
import MapEdit from "../routes/MapEdit.tsx";
import PathTables from "../routes/MapData.tsx";
import AboutUs from "../routes/AboutUs.tsx";
import ServiceSelection from "../routes/service-selection/ServiceSelection.tsx";
import MedicineForm from "../routes/service-requests/MedicineForm.tsx";
import MedicalDeviceForm from "../routes/service-requests/MedicalDeviceForm.tsx";
import GiftForm from "../routes/service-requests/GiftForm.tsx";
import SanitationForm from "../routes/service-requests/SanitationForm.tsx";
import RoomForm from "../routes/service-requests/RoomForm.tsx";
import SecurityForm from "../routes/service-requests/SecurityForm.tsx";
import ServicesTable from "../routes/ServicesTable.tsx";
import EmployeeTable from "../routes/EmployeeTable.tsx";
import AuthComp from "../components/AuthenticationComponent.tsx";
import Credit from "../routes/Credit.tsx";
import Profile from "../routes/Profile.tsx";

const routes = [
  { path: paths.HOME, element: <Home /> },
  { path: paths.MAP_EDITOR, element: <AuthComp component={MapEdit} /> },
  { path: paths.MAP_DATA, element: <AuthComp component={PathTables} /> },
  { path: paths.ABOUT_US, element: <AboutUs /> },
  { path: paths.CREDIT, element: <Credit /> },
  { path: paths.SERVICES, element: <AuthComp component={ServiceSelection} /> },
  { path: paths.PROFILE, element: <AuthComp component={Profile} /> },

  {
    path: paths.MEDICINE_DELIVERY,
    element: <AuthComp component={MedicineForm} />,
  },
  {
    path: paths.MEDICAL_DEVICE_DELIVERY,
    element: <AuthComp component={MedicalDeviceForm} />,
  },
  { path: paths.GIFT_DELIVERY, element: <AuthComp component={GiftForm} /> },
  {
    path: paths.SANITATION_REQUEST,
    element: <AuthComp component={SanitationForm} />,
  },
  { path: paths.ROOM_RESERVATION, element: <AuthComp component={RoomForm} /> },
  {
    path: paths.SECURITY_REQUEST,
    element: <AuthComp component={SecurityForm} />,
  },
  { path: paths.SERVICE_LOG, element: <AuthComp component={ServicesTable} /> },
  { path: paths.EMPLOYEE_LOG, element: <AuthComp component={EmployeeTable} /> },
];

export default routes;