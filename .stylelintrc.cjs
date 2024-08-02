const ruleOrder = [
  { type: 'at-rule', name: 'import' },
  { type: 'at-rule', name: 'forward' },
  { type: 'at-rule', name: 'use' },
  'dollar-variables',
  'at-variables',
  'custom-properties',
  { type: 'at-rule', name: 'custom-media' },
  { type: 'at-rule', name: 'function' },
  { type: 'at-rule', name: 'mixin' },
  { type: 'at-rule', name: 'extend' },
  'declarations',
  {
    type: 'rule',
    selector: /^&::[\w-]+/,
    hasBlock: true,
  },
  'rules',
  { type: 'at-rule', name: 'mixin', parameter: /^responsive.*/ },
  { type: 'at-rule', name: 'media', hasBlock: true },
];

module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  rules: {
    'selector-class-pattern': null,
    'scss/load-partial-extension': 'always',
    'order/order': [
      ruleOrder,
      {
        severity: 'warning',
      },
    ],
  },
};
