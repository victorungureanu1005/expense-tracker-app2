import prettier from "eslint-plugin-prettier";
import slugify from "eslint-plugin-slugify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("airbnb", "prettier", "plugin:node/recommended"), {
    plugins: {
        prettier,
        slugify,
    },

    rules: {
        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }],

        "spaced-comment": "off",
        "no-console": "off",
        "consistent-return": "off",
        "func-names": "off",
        "object-shorthand": "off",
        "no-process-exit": "off",
        "no-param-reassign": "off",
        "no-return-await": "off",
        "no-underscore-dangle": "off",
        "class-methods-use-this": "off",

        "prefer-destructuring": ["error", {
            object: true,
            array: false,
        }],

        "no-unused-vars": ["error", {
            argsIgnorePattern: "req|res|next|val",
        }],

        "node/no-unsupported-features/es-syntax": ["error", {
            version: ">=10.0.0",
            ignores: [],
        }],
    },
}];