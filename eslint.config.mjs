import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),

//   {
//     ignores: [
//       "node_modules/**",
//       ".next/**",
//       "out/**",
//       "build/**",
//       "next-env.d.ts",
//     ],
//   },

//   {
//     rules: {
//       /**
//        * JS Strictness
//        */
//       "no-console": ["error", { allow: ["warn", "error"] }],
//       "no-debugger": "error",
//       "no-var": "error",
//       "prefer-const": "error",
//       "eqeqeq": ["error", "always"],
//       "curly": ["error", "all"],

//       /**
//        * Code Quality
//        */
//       "complexity": ["error", 10],
//       "max-depth": ["error", 4],
//       "max-lines": ["error", 300],
//       "max-lines-per-function": ["error", 80],
//       "max-params": ["error", 4],

//       /**
//        * Imports
//        */
//       "no-duplicate-imports": "error",

//       /**
//        * TypeScript Strictness
//        */
//       "@typescript-eslint/no-explicit-any": "error",
//       "@typescript-eslint/explicit-function-return-type": [
//         "error",
//         { allowExpressions: false },
//       ],
//       "@typescript-eslint/explicit-module-boundary-types": "error",
//       "@typescript-eslint/no-unused-vars": [
//         "error",
//         { argsIgnorePattern: "^_" },
//       ],
//       "@typescript-eslint/consistent-type-imports": "error",
//       "@typescript-eslint/no-floating-promises": "error",
//       "@typescript-eslint/await-thenable": "error",
//       "@typescript-eslint/no-misused-promises": "error",

//       /**
//        * Safer TS
//        */
//       "@typescript-eslint/strict-boolean-expressions": "error",
//       "@typescript-eslint/prefer-nullish-coalescing": "error",
//       "@typescript-eslint/prefer-optional-chain": "error",

//       /**
//        * Next / React tightening
//        */
//       "react/jsx-key": "error",
//       "react/self-closing-comp": "error",
//       "react-hooks/exhaustive-deps": "error",

//       /**
//        * Disable noisy / redundant
//        */
//       "react/react-in-jsx-scope": "off",
//     },
//   },
// ];

// export default eslintConfig;