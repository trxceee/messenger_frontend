"use client";

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { modalContainerDefault } from "@/shared";

interface IModalConstructor {
  content?: ReactNode;
}

const ModalConstructor: FC<IModalConstructor> = ({ content }) => {
  return (
    <>
      <motion.div
        variants={modalContainerDefault}
        initial="initial"
        animate="animate"
        exit="initial"
        layout
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black/40 z-1931283122233 flex items-center justify-center p-10"
      ></motion.div>
      <div
        className="fixed inset-0 flex flex-col items-center justify-center space-y-4 rounded-xl z-12312312123"
      >
        {content}
      </div>
    </>
  );
};

export default ModalConstructor;
