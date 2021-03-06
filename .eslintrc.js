
 module.exports = {
	"plugins": ["promise"],
    "extends": "airbnb-base",
	"rules": {

		"no-path-concat": 0,
		"comma-dangle": 0,
		"no-cond-assign": 2,
		"no-console": 1,
		"no-constant-condition": 2,
		"no-control-regex": 2,
		"no-debugger": 2,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty-character-class": 2,
		"no-empty": 1,
		"no-ex-assign": 2,
		"no-extra-boolean-cast": 2,
		"no-extra-parens": 0,
		"no-extra-semi": 2,
		"no-func-assign": 2,
		"no-inner-declarations": 1,
		"no-invalid-regexp": 2,
		"no-irregular-whitespace": 2,
		"no-negated-in-lhs": 2,
		"no-obj-calls": 2,
		"no-regex-spaces": 2,
		"no-sparse-arrays": 2,
		"no-unreachable": 1,
		"use-isnan": 2,
		"valid-jsdoc": 0,
		"valid-typeof": 2,
		"no-unexpected-multiline": 2,

		"accessor-pairs": 2,
		"block-scoped-var": 2,
		"complexity": [1, 15],
		"consistent-return": 2,
		"curly": 2,
		"default-case": 0,
		"dot-notation": 2,
		"dot-location": [2, "property"],
		"eqeqeq": 2,
		"guard-for-in": 0,
		"no-alert": 2,
		"no-caller": 2,
		"no-div-regex": 2,
		"no-else-return": 2,
		"no-empty-label": 0,
		"no-eq-null": 2,
		"no-eval": 2,
		"no-extend-native": 1,
		"no-extra-bind": 1,
		"no-fallthrough": 2,
		"no-floating-decimal": 2,
		"no-implicit-coercion": 1,
		"no-implied-eval": 2,
		"no-invalid-this": 2,
		"no-iterator": 2,
		"no-labels": 2,
		"no-lone-blocks": 2,
		"no-loop-func": 1,
		"no-multi-spaces": 1,
		"no-multi-str": 2,
		"no-native-reassign": 2,
		"no-new-func": 2,
		"no-new-wrappers": 2,
		"no-new": 2,
		"no-octal-escape": 2,
		"no-octal": 2,
		"no-param-reassign": 2,
		"no-process-env": 2,
		"no-proto": 2,
		"no-redeclare": 2,
		"no-return-assign": 2,
		"no-script-url": 2,
		"no-self-compare": 1,
		"no-sequences": 2,
		"no-throw-literal": 2,
		"no-unused-expressions": 2,
		"no-useless-call": 2,
		"no-void": 2,
		"no-warning-comments": [1, { "terms": ["todo", "todelete", "uncomment"], "location": "anywhere" }],
		"no-with": 2,
		"radix": 1,
		"vars-on-top": 0,
		"wrap-iife": 0,
		"yoda": [2, "never"],
		"import/no-dynamic-require": 1,
		"strict": [0, "global"],
		"no-restricted-syntax": 1,
		"init-declarations": 0,
		"no-catch-shadow": 2,
		"no-delete-var": 2,
		"no-label-var": 1,
		"no-shadow-restricted-names": 2,
		"no-shadow": 2,
		"no-undef-init": 2,
		"no-undef": 1,
		"no-undefined": 2,
		"no-unused-vars": 2,
		"no-use-before-define": 1,
		"array-bracket-spacing": [2, "never"],
		"brace-style": [2, "1tbs", {"allowSingleLine": false}],
		"camelcase": 0,
		"comma-spacing": [2, {"before": false, "after": true}],
		"comma-style": [2, "last"],
		"computed-property-spacing": [2, "never"],
		"consistent-this": 0,
		"eol-last": 1,
		"func-names": 0,
		"func-style": [2, "declaration"],
		"id-length": [2, {"min": 1, "max": 30, "exceptions": ["i", "j", "l", "id", "fs", "_"]}],
		"id-match": 0,
		"indent": 0,
		"key-spacing": [2, {"beforeColon": false, "afterColon": true}],
		"lines-around-comment": 0,
        //"linebreak-style": [2, "unix"],
        "linebreak-style": 0,
		"max-nested-callbacks": [1, 5],
		"new-cap": 1,
		"new-parens": 2,
		"newline-after-var": 0,
		"no-array-constructor": 2,
		"no-continue": 1,
		"no-inline-comments": 0,
		"no-lonely-if": 1,
		"no-mixed-spaces-and-tabs": 2,
		"no-multiple-empty-lines": 1,
		"no-nested-ternary": 2,
		"no-new-object": 2,
		"no-spaced-func": 2,
		"no-ternary": 0,
		"no-trailing-spaces": 2,
		"no-underscore-dangle": 0,
		"no-unneeded-ternary": 2,
		"object-curly-spacing": [2, "never"],
		//"one-var": [2, "never"],
		"one-var": 0,
		"one-var-declaration-per-line": 0,
		"operator-assignment": [2, "always"],
		"operator-linebreak": [2, "before"],
		"padded-blocks": [1, "never"],
		"quote-props": [2, "consistent-as-needed"],
		"quotes": [1, "single"],
		"semi-spacing": [2, {"before": false, "after": true}],
		"semi": [2, "always"],
		"sort-vars": 0,
        "keyword-spacing": [2, {"before": true, "after": true}],
        "space-before-blocks": 0,
		"space-before-function-paren": [2, "never"],
		"space-in-parens": [2, "never"],
		"space-infix-ops": 2,
		"space-unary-ops": [2, {"words": true, "nonwords": false}],
		"spaced-comment": 0,
		"wrap-regex": 1,

		"max-len": [1, 140, 4, {"ignoreComments": true, "ignoreUrls": true}],

		"arrow-parens": [2, "as-needed"],
		"arrow-spacing": [2, {"before": true, "after": true}],
		"constructor-super": 2,
		"generator-star-spacing": [2, {"before": false, "after": true}],
		"no-class-assign": 2,
		"no-const-assign": 2,
		"no-dupe-class-members": 2,
		"no-this-before-super": 2,
		"no-var": 0,
		"object-shorthand": 0,
		"prefer-arrow-callback": 0,
		"prefer-const": 1,
		"prefer-spread": 1,
		"prefer-reflect": 0,
		"prefer-template": 1,
		"require-yield": 2,

		"promise/always-return": "error",
		"promise/no-return-wrap": "error",
		"promise/param-names": "error",
		"promise/catch-or-return": "error",
		"promise/no-native": "off",
		"promise/no-nesting": "warn",
		"promise/no-promise-in-callback": "warn",
		"promise/no-callback-in-promise": "warn",
		"promise/avoid-new": "warn",
		"promise/no-new-statics": "error",
		"promise/no-return-in-finally": "warn",
		"promise/valid-params": "warn"
	}
};