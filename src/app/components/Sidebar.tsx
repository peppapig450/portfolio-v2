import React, { useState, useEffect } from "react";
import { useScrollTrigger } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import FullSidebar from "./FullSidebar";
import CompactSidebar from "./CompactSidebar";

const Sidebar: React.FC = () => {
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    setIsCompact(trigger);
  }, [trigger]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AnimatePresence>
      {!isCompact ? (
        <motion.div
          key="full"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5 }}
        >
          <FullSidebar />
        </motion.div>
      ) : (
        <motion.div
          key="compact"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5 }}
        >
          <CompactSidebar onMenuClick={handleMenuClick} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
