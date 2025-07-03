// src/components/PageTransition.jsx
import { motion } from 'framer-motion';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        clipPath: 'inset(0 50% 0 50%)', // يبدأ من المنتصف
        opacity: 0,
      }}
      animate={{
        clipPath: 'inset(0% 0% 0% 0%)', // يظهر الصفحة كاملة
        opacity: 1,
      }}
      exit={{
        clipPath: 'inset(0 50% 0 50%)',
        opacity: 0,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}   
    >
      <div>{children}</div> {/*  لفّ المحتوى داخل div لضمان التنسيق */}
    </motion.div>
  );
}

export default PageTransition;
