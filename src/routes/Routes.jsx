import { createBrowserRouter } from "react-router-dom";
import FirstLayout from "../layout/FirstLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SecoundLayout from "../layout/SecoundLayout";
import EmployeList from "../pages/EmployeList";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeEdit from "../components/EmployeeEdit";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <FirstLayout />, 
      children: [
        {
          path: '/',
          element: <LoginPage />,
        },
        
      ],
    },
    {
      path: '/',
      element: <  SecoundLayout/>, 
      children: [
        {
          path: 'home',
          element: <HomePage />,
        },
        
        {
          path: 'employe-list',
          element: <EmployeList />,
        },
        {
          path: 'employe-form',
          element: <  EmployeeForm />,
        },
        {
          path: 'employe-edit/:id',
          element: <  EmployeeEdit />,
        },
        
      ],
    }
  ]);
