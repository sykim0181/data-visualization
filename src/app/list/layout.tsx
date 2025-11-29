import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <main className="p-12 w-dvw box-border">{children}</main>;
};

export default Layout;
