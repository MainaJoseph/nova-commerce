interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="px-4 py-3 hover:bg-slate-600 transition">
      {children}
    </div>
  );
};

export default MenuItem;
