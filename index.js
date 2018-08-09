const babel = require('babel-core');
const { types } = babel;

module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@glimmer/component') {
          let trackedSpecifer;
          path.node.specifiers = path.node.specifiers.filter(specifier => {
            if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'tracked') {
              trackedSpecifer = specifier;
              return false;
            }
            return true;
          });

          if (trackedSpecifer) {
            path.insertAfter(
              types.importDeclaration([trackedSpecifer], types.stringLiteral('@ember/component'))
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