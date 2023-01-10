import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <header>
        <div className="flex justify-center text-black font-semibold py-3">
          <h4>MYCOOLSHOP.COM</h4>
        </div>
      </header>
      <div className="grid grid-cols-12">
        <div className="col-span-12">{children}</div>
      </div>
    </>
  );
};
