import AgentNav from "../components/agent/AgentNav";

export const metadata = {
  title: "Agent",
  description: "Nova agent dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AgentNav />
      {children}
    </div>
  );
};

export default AdminLayout;
