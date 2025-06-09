import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Todo3D = () => {
  const [checked, setChecked] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.12}
      style={{
        width: "90vw",
        maxWidth: 320,
        height: "90vw",
        maxHeight: 320,
        margin: "40px auto",
        perspective: 800,
        cursor: "grab",
        userSelect: "none",
        rotateX,
        rotateY,
        x,
        y,
      }}
      whileTap={{ cursor: "grabbing" }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setChecked(!checked)}
        style={{
          borderRadius: 28,
          background:
            "linear-gradient(145deg, #fff8f1, #fff3e7)", // warm creamy light
          boxShadow:
            "15px 15px 35px rgba(255, 159, 10, 0.2), -15px -15px 35px rgba(255, 200, 77, 0.3)", // warm soft shadows
          userSelect: "none",
          touchAction: "none",
          filter: "drop-shadow(0 10px 15px rgba(255, 159, 10, 0.15))",
        }}
      >
        {/* Paper with folded corner */}
        <rect
          x="40"
          y="40"
          width="200"
          height="200"
          rx="20"
          ry="20"
          fill="url(#paperGradient)"
          stroke="#fba94c"
          strokeWidth="3"
          filter="url(#softShadow)"
        />
        {/* Folded corner */}
        <path
          d="M 240 40 L 200 40 L 240 80 Z"
          fill="#fba94c"
          opacity="0.8"
          style={{ filter: "drop-shadow(0 1px 1px rgba(255, 170, 80, 0.6))" }}
        />
        <path
          d="M 200 40 L 200 80 L 240 80 Z"
          fill="#ffe6b3"
          opacity="0.9"
        />

        {/* Checkbox background */}
        <rect
          x="60"
          y="70"
          width="40"
          height="40"
          rx="8"
          ry="8"
          fill={checked ? "#fba94c" : "#ffe6b3"}
          stroke="#fba94c"
          strokeWidth="2"
          style={{ transition: "fill 0.35s" }}
        />

        {/* Checkmark with scale animation */}
        <motion.path
          initial={{ pathLength: 0, scale: 0.8, opacity: 0 }}
          animate={
            checked
              ? { pathLength: 1, scale: 1, opacity: 1 }
              : { pathLength: 0, scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
          d="M68 90 L80 102 L105 75"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          transformOrigin="center"
        />

        {/* Todo text lines */}
        {[...Array(3)].map((_, i) => (
          <rect
            key={i}
            x="115"
            y={80 + i * 25}
            width="110"
            height="14"
            rx="7"
            ry="7"
            fill="#fcd49b"
            style={{
              filter:
                i === 1
                  ? "brightness(0.9)"
                  : i === 2
                  ? "brightness(0.8)"
                  : "none",
              transition: "filter 0.3s",
            }}
          />
        ))}

        {/* Gradients and filters */}
        <defs>
          <linearGradient id="paperGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff8f1" />
            <stop offset="100%" stopColor="#fff3e7" />
          </linearGradient>

          <filter
            id="softShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="12"
              floodColor="#fba94c"
              floodOpacity="0.2"
            />
          </filter>
        </defs>
      </motion.svg>
    </motion.div>
  );
};

export default Todo3D;
