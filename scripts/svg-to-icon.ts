import * as ts from 'typescript';
import { readdir, readFile, writeFile } from 'fs-extra';
import { basename, extname, join } from 'path';
import { camelize } from '../projects/ng-heroicons/src/lib/utilities/camelize';

async function loadSvgsInPath(path: string, postfix: string = ''): Promise<Record<string, string>> {
  // load all the svg files within the path
  const files = (await readdir(path)).filter(file => extname(file) === '.svg');

  // read the contents of each file
  const output: Record<string, string> = {};

  for (const file of files) {
    output[basename(file, '.svg') + postfix] = await readFile(join(path, file), 'utf8');
  }

  return output;
}

async function loadSvgs(): Promise<Record<string, string>> {
  const outlineIcons = await loadSvgsInPath(join(__dirname, '..', 'node_modules', 'heroicons', 'outline'));
  const solidIcons = await loadSvgsInPath(join(__dirname, '..', 'node_modules', 'heroicons', 'solid'), '-solid');

  return { ...outlineIcons, ...solidIcons };
}

function createIconDeclaration(name: string, svg: string): ts.Node {
  return ts.createVariableStatement(
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList(
      [ts.createVariableDeclaration(
        ts.createIdentifier(camelize(name)),
        undefined,
        ts.createNoSubstitutionTemplateLiteral(
          svg.trim(),
          svg.trim()
        )
      )],
      ts.NodeFlags.Const
    )
  );
}

function createIconNameType(names: string[]): ts.Node {
  const node = ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createIdentifier('HeroIconName'),
    undefined,
    ts.createUnionTypeNode(
      names.map(name => ts.createLiteralTypeNode(ts.createStringLiteral(name)))
    )
  );

  walk(node, [convertToSingleQuote]);

  return node;
}

async function createIconFile(): Promise<string> {
  const icons = await loadSvgs();
  const printer = ts.createPrinter();
  const sourceFile = ts.createSourceFile('icons.ts', '', ts.ScriptTarget.ESNext);

  const output: string[] = [];

  for (const icon in icons) {
    const node = createIconDeclaration(icon, icons[icon]);
    const content = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
    output.push(content);
  }

  const typeDefinition = createIconNameType(Object.keys(icons));
  const typeOutput = printer.printNode(ts.EmitHint.Unspecified, typeDefinition, sourceFile);

  output.push(typeOutput);

  return output.join('\n');
}

function convertToSingleQuote(node: ts.Node): void {
  if (ts.isStringLiteral(node)) {
    // tslint:disable-next-line:no-any
    (node as any).singleQuote = true;
  }
}

function walk(node: ts.Node, cbArray: Array<(node: ts.Node) => void>): void {
  ts.forEachChild(node, (n) => {
    for (const cb of cbArray) {
      cb(n);
    }
    walk(n, cbArray);
  });
}

async function start(): Promise<void> {
  const file = await createIconFile();
  await writeFile(join(__dirname, '..', 'projects', 'ng-heroicons', 'src', 'lib', 'icons', 'icons.ts'), file);
}

start();
