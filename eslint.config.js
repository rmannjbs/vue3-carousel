// eslint-disable-next-line import/no-unresolved
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

const sharedRules = {
  "import/no-unresolved": "error",
  "import/named": "error",
  "import/default": "error",
  "import/namespace": "error",
  "no-sparse-arrays": "off",
};

export default createConfigForNuxt(
  {
    features: {
      tooling: true,
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "vue/multi-word-component-names": "off",
      "vue/component-definition-name-casing": "off",
      "vue/require-prop-types": "off",
      "vue/require-slots-as-functions": "off",
    },
  }
)
  .append({
    files: ["*.js", "*.mjs", "*.ts", "*.vue", "*.jsx", "*.tsx"],
    rules: {
      ...sharedRules,
    },
  })
  .append({
    files: ["**/test/**/*.js"],
    languageOptions: {},
    rules: {
      ...sharedRules,
    },
  })
  .prepend({
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/.nuxt",
      "**/.vercel",
      "**/.netlify",
      "**/public",
      "dist/*",
      "coverage/*",
      "/.cache",
    ],
  });
