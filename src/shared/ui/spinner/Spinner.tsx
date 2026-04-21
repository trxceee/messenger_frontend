"use client";

import { motion, AnimatePresence } from "framer-motion";

const Spinner = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{duration: 0.5}}
        className="flex items-center justify-center mx-auto"
      >
        <div className="w-10 h-10 border-4 border-t-accent border-icon/30 rounded-full animate-spin"></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Spinner;
