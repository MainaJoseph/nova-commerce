export const metadata = {
  title: "Nova-admin",
  description: "Nova Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>Navbar</div>
      {children}
    </div>
  );
};

export default AdminLayout;
