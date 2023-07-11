module.exports = {
  require: ['./features/step-definitions/login.steps.cjs'],
  format: ['json:reports/cucumber_report.json', 'html:reports/cucumber_report.html'],
};
