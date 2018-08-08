const babel = require('babel-core');
const { types } = babel;

module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@glimmer/component') {
          let hasTrackedImport = false;
          path.node.specifiers = path.node.specifiers.filter(specifier => {
            if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'tracked') {
              hasTrackedImport = true;
              return false;
            }
            return true;
          });

          if (hasTrackedImport) {
            path.insertAfter(
              types.importDeclaration([types.importSpecifier(types.identifier('tracked'), types.identifier('tracked'))], types.stringLiteral('@ember/component'))
            )
          }

          if (!path.node.specifiers.length) {
            path.remove();
          }
        }
      }
    }
  }
}