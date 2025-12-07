import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <main className="p-12 flex justify-center">{children}</main>;
};

export default Layout;
