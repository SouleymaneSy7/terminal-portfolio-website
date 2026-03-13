"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { ASCII_404, ASCII_ERROR } from "@/constants";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Custom404 = () => {
  const message = "Moo! Error Page not found!";

  return (
    <div>
      <motion.div
        className="opacity-85"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <p className="text-secondary-clr inline-block">
            <span className="text-primary-clr">guest</span>@
            <span className="text-tertiary-clr">souleymane-sy-portfolio</span>
          </p>
          <span className="text-secondary-clr">:~$ </span>
          <span className="text-secondary-clr">404 - error page not found</span>
        </motion.div>

        <div className="terminal-output whitespace-pre my-3">
          <motion.pre variants={itemVariants}>{ASCII_404}</motion.pre>
          <motion.pre variants={itemVariants}>{ASCII_ERROR}</motion.pre>

          <motion.pre variants={itemVariants}>
            {String.raw`
 _________________________
< ${message} >
 -------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
`}
          </motion.pre>

          <motion.div variants={itemVariants}>
            <p>The requested path could not be located in this system.</p>
            <p>It may have been moved, deleted, or never existed.</p>
            <p>Please verify the URL or return to the main directory.</p>
          </motion.div>

          <motion.p variants={itemVariants}>
            Click <Link href={"/"}>home</Link> to return to safety.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Custom404;
