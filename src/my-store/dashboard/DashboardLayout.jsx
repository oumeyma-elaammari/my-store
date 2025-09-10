import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";

function DashboardLayout({ role }) {
  const navigate = useNavigate();

  const basePath = role === 'admin' ? '/admin' : '/subadmin';

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h3>{role === 'admin' ? 'Admin' : 'Sous-Admin'}</h3>
        <ul>
          {role === 'admin' && (
            <>
              <li onClick={() => navigate(`${basePath}/users`)}>Sous Admins</li>
              <li onClick={() => navigate(`${basePath}/clients`)}>Clients</li>
            </>
          )}
          <li onClick={() => navigate(`${basePath}/orders`)}>Commandes</li>
          <li onClick={() => navigate(`${basePath}/products`)}>Produits</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
