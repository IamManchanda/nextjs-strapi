const NextI18Next = require("next-i18next").default;

module.exports = new NextI18Next({
  otherLanguages: ["hi"],
  defaultNS: "common",
  localeSubpaths: {
    hi: "hi",
  },
  localePath: "public/static/locales",
});
