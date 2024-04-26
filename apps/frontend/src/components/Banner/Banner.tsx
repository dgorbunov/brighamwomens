import { motion } from "framer-motion";
/*import ExitButton from "./ExitButton.tsx";*/

interface BannerProps {
  children: JSX.Element;
}

function Banner(props: BannerProps) {
  return (
    <motion.div
      className="bg-white fixed top-0 flex gap-1 justify-center items-center p-3 rounded-xl text-secondary z-10"
      initial={{ y: "-100%" }}
      animate={{
        y: "1vh",
        transition: { type: "spring", delay: 2.5, stiffness: 30, duration: 1 },
      }}
      exit={{
        y: "-100%",
        transition: { type: "spring", stiffness: 30, duration: 1 },
      }}
    >
      {props.children}
      {/* <ExitButton onClick={props.onClick} />*/}
    </motion.div>
  );
}

export default Banner;
