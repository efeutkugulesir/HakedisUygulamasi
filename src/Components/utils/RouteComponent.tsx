import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import getComponents from "./getComponents"
import { routes } from "./routes"

const RouterComponent = () => (
  <Routes>
    {routes?.map((route, index) => {
      const RouteComponent = getComponents[`_${route.component}`]

      return route?.component != null ? (
        <Route
          element={<RouteComponent />}
          key={index}
          path={route.path}
        />
      ) : null
    },
    )}
    <Route element={<Navigate to="/login" />} path="/" />
  </Routes>
)

export default RouterComponent