interface FooterListColProps {
  children: React.ReactNode;
}

const FooterListCol: React.FC<FooterListColProps> = ({ children }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6">
      {children}
    </div>
  );
};

export default FooterListCol;