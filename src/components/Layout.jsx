// 페이지 구조 최상위 컴포넌트
import React from "react";
// 1
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* // 2 */}
      <Outlet />
    </>
  );
};

export default Layout;
