
var frontMatter = require('yaml-front-matter');
var babelCore   = require('babel-core');
var fs          = require('fs');
var config      = require('./config.js');

module.exports = {

  compileDocsData() {
    let data = { sections: [] };

    config.docSections.forEach((section) => {
      let sectionData = frontMatter.loadFront(`./docs/${section}/_section.html`);
      let pageList = fs.readdirSync(`./docs/${section}/pages`);

      sectionData.pages = [];

      // build section pages
      pageList.forEach((page) => {
        let pageData = frontMatter.loadFront(`./docs/${section}/pages/${page}`);
        sectionData.pages.push(pageData);
      });

      // sort section pages
      sectionData.pages.sort(function (p, c) {
        if (p.index === c.index) return 0;
        return (p.index > c.index) ? 1 : -1;
      });

      // add section to docs
      data.sections.push(sectionData);
    });

    return data;
  },

  transpileString(source, context, next) {
    if (source.fileContent && !source.content && (source.type == 'js')) {
        source.content = babelCore.transform(source.fileContent, config.babelOptions).code;
        next();
    } else {
      next();
    }
  }

};
