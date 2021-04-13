import * as ts from 'typescript';
import { camelCase } from 'change-case';
import { Project, SourceFile } from 'ts-morph';

function valid(text: string) {
  return text.includes('_') && text[0] === text[0].toLowerCase();
}

export const apiCamelCaseReplacements = (rootNode: SourceFile) => {
  rootNode.forEachDescendant((node) => {
    if (
      node.getKind() === ts.SyntaxKind.StringLiteral &&
      node.getParent()?.getKind() !== ts.SyntaxKind.ImportDeclaration &&
      valid(node.getText())) {
      const text = node.getText();
      node.replaceWithText(text[0] === '\'' ? `'${camelCase(text)}'` : camelCase(text));
    } else if (node.getKind() === ts.SyntaxKind.Identifier &&
        valid(node.getText()) &&
        (node.getParent()?.getKind() === ts.SyntaxKind.PropertySignature ||
        node.getParent()?.getKind() === ts.SyntaxKind.PropertyAssignment ||
        node.getParent()?.getKind() === ts.SyntaxKind.PropertyAccessExpression)) {
        const text = node.getText();
        node.replaceWithText(camelCase(text));
    }
  });
};

function compile() {
  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
    addFilesFromTsConfig: false,
  });

  project.addSourceFilesAtPaths('src/**/*.ts');

  project.getSourceFiles().forEach((sourceFile) => {
    apiCamelCaseReplacements(sourceFile);
    sourceFile.save();
  });
}

compile();
