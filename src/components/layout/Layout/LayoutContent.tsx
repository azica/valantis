import cn from "clsx";
import { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

import { basicPaths } from "@/shared/routes";

const LayoutContent = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) {
      setDisplayLocation(location);
    } else {
      setTransistionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransistionStage("fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <main className={cn(transitionStage, "h-screen")} onAnimationEnd={handleAnimationEnd}>
      <Routes location={displayLocation}>
        {basicPaths.map(({ id, path, element, children }) => {
          return children ? (
            <Route key={id} path={path} element={element}>
              <Route index element={children[0].element} />
              {children.map((child) => (
                <Route key={child.id} path={child.path} element={child.element} />
              ))}
            </Route>
          ) : (
            <Route key={id} path={path} element={element} />
          );
        })}
      </Routes>
    </main>
  );
};

export default LayoutContent;
