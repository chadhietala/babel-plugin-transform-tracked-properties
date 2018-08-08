const innerImportVisitor = {
  StringLiteral(path) {
    const packageName = path.node.value;
    if (packageName === '@glimmer/component') {
      path.node.value = '@ember/component';
    }
  }
};

module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path) {
        path.traverse(innerImportVisitor);
      }
    }
  }
}