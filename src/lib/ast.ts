/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';
import TypeScript from 'tree-sitter-typescript';
import Python from 'tree-sitter-python';
import Java from 'tree-sitter-java';
import Go from 'tree-sitter-go';
import Rust from 'tree-sitter-rust';
import PHP from 'tree-sitter-php';
import Ruby from 'tree-sitter-ruby';
import HTML from 'tree-sitter-html';
import JSON from 'tree-sitter-json';
import C from 'tree-sitter-c';
import CPP from 'tree-sitter-cpp';
import CSharp from 'tree-sitter-c-sharp';
import CSS from 'tree-sitter-css';
// import SQL from 'tree-sitter-sql';
import Bash from 'tree-sitter-bash';
import YAML from 'tree-sitter-yaml';
import type { 
  Ast, 
  ParsedFile,
  SourceLocation,
  FunctionInfo,
  Parameter,
  ImportInfo,
  ImportedItem,
  ExportInfo,
  ClassInfo,
  MethodInfo,
  ConstructorInfo,
  PropertyInfo,
  VariableInfo,
  InterfaceInfo,
  InterfaceProperty,
  TypeAliasInfo
} from './types';
const { typescript } = TypeScript;
const languageMap = new Map([
  ['.js', JavaScript],
  ['.ts', typescript],
  ['.tsx', typescript],
  ['.py', Python],
  ['.java', Java],
  ['.go', Go],
  ['.rs', Rust],
  ['.php', PHP],
  ['.rb', Ruby],
  ['.html', HTML],
  ['.json', JSON],
  ['.c', C],
  ['.cpp', CPP],
  ['.cc', CPP],
  ['.cxx', CPP],
  ['.h', CPP],
  ['.hpp', CPP],
  ['.cs', CSharp],
  ['.css', CSS],
  ['.sh', Bash],
  ['.bash', Bash],
  ['.yml', YAML],
  ['.yaml', YAML],
  // ['.sql', SQL],
]);

export async function parseFile(
  content: string | Buffer,
  type: string, 
  relativePath: string
):
Promise<{
  functions: FunctionInfo[];
  imports: ImportInfo[];
  exports: ExportInfo[];
  classes: ClassInfo[];
  variables: VariableInfo[];
  interfaces: InterfaceInfo[];
  types: TypeAliasInfo[];
} | null>
{
  try {
    const language = languageMap.get(type);
    if (!language) {
      console.log(`No language parser found for type: ${type}`);
      return null;
    }

    // Convert content to string with validation
    let contentStr: string;
    if (Buffer.isBuffer(content)) {
      contentStr = content.toString('utf-8');
    } else if (typeof content === 'string') {
      contentStr = content;
    } else {
      console.error(`Invalid content type for ${relativePath}:`, typeof content);
      throw new Error(`Invalid content type: ${typeof content}`);
    }

    // Validate content string
    if (contentStr === null || contentStr === undefined) {
      console.error(`Content is null/undefined for ${relativePath}`);
      throw new Error('Content is null or undefined');
    }

    // Check if content is empty or too large
    if (contentStr.length === 0) {
      console.warn(`Empty content for ${relativePath}`);
      return {
        functions: [],
        imports: [],
        exports: [],
        classes: [],
        variables: [],
        interfaces: [],
        types: []
      };
    }
    const MAX_FILE_SIZE = 30000; // 50KB limit
    if (contentStr.length > MAX_FILE_SIZE) {
      console.warn(`File too large to parse: ${relativePath} (${contentStr.length} chars, limit: ${MAX_FILE_SIZE})`);
      return {
        functions: [],
        imports: [],
        exports: [],
        classes: [],
        variables: [],
        interfaces: [],
        types: []
      };
    }

    // Log parsing attempt
    console.log(`Parsing ${relativePath} (${contentStr.length} chars, type: ${type})`);

    const parser = new Parser();
    
    // Validate language object before setting
    if (!language || typeof language !== 'object') {
      console.error(`Invalid language object for ${type}:`, language);
      throw new Error(`Invalid language object for ${type}`);
    }

    parser.setLanguage(language);
    
    // Parse with error handling
    let tree;
    try {
      tree = parser.parse(contentStr);
    } catch (parseError) {
      console.error(`Parser.parse() error for ${relativePath}:`, parseError);
      console.error(`Content preview (first 200 chars):`, contentStr.substring(0, 200));
      console.error(`Content type:`, typeof contentStr);
      console.error(`Content length:`, contentStr.length);
      console.error(`Language:`, type);
      throw parseError;
    }

    if (!tree || !tree.rootNode) {
      console.error(`Parser returned invalid tree for ${relativePath}`);
      throw new Error('Parser returned invalid tree');
    }
    
    const functions: FunctionInfo[] = [];
    const imports: ImportInfo[] = [];
    const exports: ExportInfo[] = [];
    const classes: ClassInfo[] = [];
    const variables: VariableInfo[] = [];
    const interfaces: InterfaceInfo[] = [];
    const types: TypeAliasInfo[] = [];

    function walkTree(node: any, filePath: string) {
      if (!node) return;

      switch(node.type) {
        case "import_statement":
        case "import_declaration":
          const importInfo = extractImportInfo(node);
          if (importInfo) imports.push(importInfo);
          break;
        
        case "export_statement":
        case "export_declaration":
          const exportInfo = extractExportInfo(node);
          if (exportInfo) exports.push(exportInfo);
          break;
        
        case "function_declaration":
        case "function_definition":
          const funcInfo = extractFunctionInfo(node, filePath);
          if (funcInfo) functions.push(funcInfo);
          break;
        
        case "class_declaration":
        case "class_definition":
          const classInfo = extractClassInfo(node, filePath);
          if (classInfo) classes.push(classInfo);
          break;
        
        case "variable_declaration":
        case "lexical_declaration":
          const varInfo = extractVariableInfo(node, filePath);
          if (varInfo) variables.push(varInfo);
          break;
        
        case "interface_declaration":
          const interfaceInfo = extractInterfaceInfo(node, filePath);
          if (interfaceInfo) interfaces.push(interfaceInfo);
          break;
        
        case "type_alias_declaration":
          const typeInfo = extractTypeAliasInfo(node, filePath);
          if (typeInfo) types.push(typeInfo);
          break;
      }

      if (node.children) {
        for (const child of node.children) {
          walkTree(child, filePath);
        }
      }
    }

    walkTree(tree.rootNode, relativePath);

    console.log(`Successfully parsed ${relativePath}: ${functions.length} functions, ${classes.length} classes, ${imports.length} imports`);

    return {
      functions,
      imports,
      exports,
      classes,
      variables,
      interfaces,
      types
    };
  } catch (error) {
    console.error(`Error in parseFile for ${relativePath}:`, error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    throw error;
  }
}

function extractFunctionInfo(node: any, filePath: string): FunctionInfo | null {
  let name = '';
  const nameNode = node.childForFieldName('name');
  if (nameNode) {
    name = nameNode.text;
  }

  const parameters: Parameter[] = [];
  const parametersNode = node.childForFieldName('parameters');
  if (parametersNode) {
    for (const child of parametersNode.children) {
      if (child.type === 'required_parameter' || 
          child.type === 'optional_parameter' ||
          child.type === 'rest_parameter' ||
          child.type === 'identifier') {
        const paramInfo = extractParameterInfo(child);
        if (paramInfo) parameters.push(paramInfo);
      }
    }
  }

  let returnType: string | undefined = undefined;
  const returnTypeNode = node.childForFieldName('return_type');
  if (returnTypeNode) {
    returnType = returnTypeNode.text.replace(/^:\s*/, '');
  }

  const isAsync = node.children.some((c: any) => c.type === 'async' || c.text === 'async');
  const isGenerator = node.children.some((c: any) => c.type === '*' || c.text === '*');
  
  let isExported = false;
  let current = node.parent;
  while (current) {
    if (current.type === 'export_statement' || current.type === 'export_declaration') {
      isExported = true;
      break;
    }
    current = current.parent;
  }

  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  return {
    name,
    parameters,
    returnType: returnType || '',
    isAsync,
    isExported,
    isGenerator,
    location,
    comments: [] 
  };
}

function extractImportInfo(node: any): ImportInfo | null {
  let type: 'default' | 'named' | 'namespace' | 'side-effect' | 'dynamic' = 'named';
  let source = '';
  const imports: ImportedItem[] = [];
  let isTypeOnly = false;

  if (node.type === 'import_statement' || node.type === 'import_declaration') {
    for (const child of node.children) {
      if (child.type === 'string' || child.type === 'string_literal') {
        const fragment = child.children?.find((c: any) => c.type === 'string_fragment');
        if (fragment) {
          source = fragment.text;
        } else {
          source = child.text.replace(/['"]/g, '');
        }
      }

      if (child.type === 'import_clause') {
        if (child.text.startsWith('type ')) {
          isTypeOnly = true;
        }

        for (const clauseChild of child.children) {
          if (clauseChild.type === 'identifier' && !clauseChild.text.includes('from')) {
            type = 'default';
            imports.push({
              name: clauseChild.text,
              isType: isTypeOnly
            });
          }

          if (clauseChild.type === 'namespace_import') {
            type = 'namespace';
            const namespaceIdentifier = clauseChild.children?.find((c: any) => c.type === 'identifier');
            if (namespaceIdentifier) {
              imports.push({
                name: namespaceIdentifier.text,
                isType: isTypeOnly
              });
            }
          }

          if (clauseChild.type === 'named_imports') {
            type = 'named';
            for (const namedChild of clauseChild.children) {
              if (namedChild.type === 'import_specifier') {
                const nameNode = namedChild.childForFieldName('name');
                const aliasNode = namedChild.childForFieldName('alias');
                
                const isSpecifierTypeOnly = namedChild.children?.some((c: any) => 
                  c.type === 'type' || c.text === 'type'
                );

                if (nameNode) {
                  imports.push({
                    name: nameNode.text,
                    alias: aliasNode ? aliasNode.text : undefined,
                    isType: isTypeOnly || isSpecifierTypeOnly
                  });
                }
              }
            }
          }
        }
      }
    }

    if (imports.length === 0 && source) {
      type = 'side-effect';
    }
  }

  if (node.type === 'call_expression' || node.type === 'await_expression') {
    let callNode = node;
    
    if (node.type === 'await_expression') {
      const awaitArg = node.children?.find((c: any) => c.type === 'call_expression');
      if (awaitArg) {
        callNode = awaitArg;
      }
    }
    
    if (callNode.type === 'call_expression') {
      const func = callNode.childForFieldName('function');
      if (func && func.text === 'import') {
        type = 'dynamic';
        const args = callNode.childForFieldName('arguments');
        if (args) {
          const stringArg = args.children?.find((c: any) => c.type === 'string');
          if (stringArg) {
            const fragment = stringArg.children?.find((c: any) => c.type === 'string_fragment');
            source = fragment ? fragment.text : stringArg.text.replace(/['"]/g, '');
          }
        }
      }
    }
  }

  return {
    source,
    imports,
    type,
    isTypeOnly: isTypeOnly || undefined
  };
}

function extractExportInfo(node: any): ExportInfo | null {
  let name: string = '';
  let type: 'function' | 'class' | 'variable' | 'default' | 'type' | 'interface' = 'variable';
  let isReExport: boolean = false;
  let originalSource: string | undefined = undefined;

  if (node.type === 'export_statement' || node.type === 'export_declaration') {
    const hasDefault = node.children?.some((c: any) => c.type === 'default' || c.text === 'default');

    for (const child of node.children || []) {
      if (child.type === 'string' || child.type === 'string_literal') {
        const fragment = child.children?.find((c: any) => c.type === 'string_fragment');
        originalSource = fragment ? fragment.text : child.text.replace(/['"]/g, '');
        isReExport = true;
      }

      if (child.type === 'export_clause') {
        for (const clauseChild of child.children) {
          if (clauseChild.type === 'export_specifier') {
            const nameNode = clauseChild.childForFieldName('name');
            const aliasNode = clauseChild.childForFieldName('alias');
            
            if (nameNode) {
              name = aliasNode ? aliasNode.text : nameNode.text;
            }
          }
        }
        type = 'variable';
      }

      if (child.type === 'namespace_export') {
        const identifier = child.children?.find((c: any) => c.type === 'identifier');
        if (identifier) {
          name = identifier.text;
        }
        type = 'variable';
      }

      if (child.type === 'function_declaration' || child.type === 'generator_function_declaration') {
        type = 'function';
        const nameNode = child.childForFieldName('name');
        if (nameNode) {
          name = nameNode.text;
        }
      }

      if (child.type === 'class_declaration') {
        type = 'class';
        const nameNode = child.childForFieldName('name');
        if (nameNode) {
          name = nameNode.text;
        }
      }

      if (child.type === 'lexical_declaration' || child.type === 'variable_declaration') {
        type = 'variable';
        const declarator = child.children?.find((c: any) => c.type === 'variable_declarator');
        if (declarator) {
          const nameNode = declarator.childForFieldName('name');
          if (nameNode) {
            name = nameNode.text;
          }
        }
      }

      if (child.type === 'type_alias_declaration') {
        type = 'type';
        const nameNode = child.childForFieldName('name');
        if (nameNode) {
          name = nameNode.text;
        }
      }

      if (child.type === 'interface_declaration') {
        type = 'interface';
        const nameNode = child.childForFieldName('name');
        if (nameNode) {
          name = nameNode.text;
        }
      }

      if (hasDefault) {
        type = 'default';
        if (!name && child.type === 'identifier') {
          name = child.text;
        }
      }
    }
  }

  return {
    name,
    type,
    isReExport,
    originalSource
  };
}

function extractMethodInfo(node: any, filePath: string): MethodInfo {
  let name = '';
  let parameters: Parameter[] = [];
  let returnType: string | undefined = undefined;
  let isStatic: boolean = false;
  let isPrivate: boolean = false;
  let isProtected: boolean = false;
  let isAsync: boolean = false;
  let isAbstract: boolean = false;

  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  for (const child of node.children || []) {
    if (child.type === 'accessibility_modifier') {
      if (child.text === 'private') isPrivate = true;
      if (child.text === 'protected') isProtected = true;
    }
    if (child.type === 'static' || child.text === 'static') {
      isStatic = true;
    }
    if (child.type === 'async' || child.text === 'async') {
      isAsync = true;
    }
    if (child.type === 'abstract' || child.text === 'abstract') {
      isAbstract = true;
    }
  }

  const nameNode = node.childForFieldName('name');
  if (nameNode) {
    name = nameNode.text;
  }

  const parametersNode = node.childForFieldName('parameters');
  if (parametersNode) {
    for (const param of parametersNode.children) {
      if (param.type === 'required_parameter' || 
          param.type === 'optional_parameter' ||
          param.type === 'rest_parameter') {
        const paramInfo = extractParameterInfo(param);
        if (paramInfo) parameters.push(paramInfo);
      }
    }
  }

  const returnTypeNode = node.childForFieldName('return_type');
  if (returnTypeNode) {
    returnType = returnTypeNode.text.replace(/^:\s*/, '');
  } else {
    const typeAnnotation = node.children?.find((c: any) => c.type === 'type_annotation');
    if (typeAnnotation) {
      returnType = typeAnnotation.text.replace(/^:\s*/, '');
    }
  }

  return {
    name,
    parameters,
    returnType,
    isStatic,
    isPrivate,
    isProtected,
    isAsync,
    isAbstract,
    location
  };
}

function extractClassInfo(node: any, filePath: string): ClassInfo | null {
  let name = '';
  let methods: MethodInfo[] = [];
  let properties: PropertyInfo[] = [];
  let constructor: ConstructorInfo | undefined = undefined;
  let extends_: string | undefined = undefined;
  let implements_: string[] | undefined = undefined;
  let isExported: boolean = false;
  let isAbstract: boolean = false;
  let genericTypes: string[] | undefined = undefined;
  
  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  if (node.children?.some((c: any) => c.type === 'abstract' || c.text === 'abstract')) {
    isAbstract = true;
  }

  let current = node.parent;
  while (current) {
    if (current.type === 'export_statement' || current.type === 'export_declaration') {
      isExported = true;
      break;
    }
    if (current.children?.some((child: any) => child.type === 'export' || child.text === 'export')) {
      isExported = true;
      break;
    }
    current = current.parent;
  }

  const nameNode = node.childForFieldName('name');
  if (nameNode) {
    name = nameNode.text;
  }

  const typeParams = node.childForFieldName('type_parameters');
  if (typeParams) {
    genericTypes = [];
    for (const child of typeParams.children) {
      if (child.type === 'type_parameter') {
        const paramName = child.childForFieldName('name');
        if (paramName) {
          genericTypes.push(paramName.text);
        }
      }
    }
  }

  const heritage = node.childForFieldName('heritage');
  if (heritage) {
    for (const child of heritage.children) {
      if (child.type === 'extends_clause') {
        const extendsType = child.children?.find((c: any) => c.type === 'identifier' || c.type === 'type_identifier');
        if (extendsType) {
          extends_ = extendsType.text;
        }
      }
      if (child.type === 'implements_clause') {
        implements_ = [];
        for (const impl of child.children) {
          if (impl.type === 'type_identifier' || impl.type === 'identifier') {
            implements_.push(impl.text);
          }
        }
      }
    }
  }

  const bodyNode = node.childForFieldName('body');
  if (bodyNode) {
    for (const child of bodyNode.children) {
      if (child.type === 'method_definition') {
        const methodName = child.childForFieldName('name');
        if (methodName && methodName.text === 'constructor') {
          constructor = extractConstructorInfo(child, filePath);
        } else {
          methods.push(extractMethodInfo(child, filePath));
        }
      }
      if (child.type === 'public_field_definition' || 
          child.type === 'field_definition' ||
          child.type === 'property_definition') {
        properties.push(extractPropertyInfo(child));
      }
    }
  }

  return {
    name,
    location,
    methods,
    properties,
    constructor,
    extends: extends_,
    implements: implements_,
    isExported,
    isAbstract,
    genericTypes
  };
}

function extractVariableInfo(node: any, filePath: string): VariableInfo | null {
  let name = '';
  let type: 'const' | 'let' | 'var' = 'let';
  let isExported = false;
  let valueType: string | undefined = undefined;
  let defaultValue: string | undefined = undefined;

  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  let current = node.parent;
  while (current) {
    if (current.type === 'export_statement' || current.type === 'export_declaration') {
      isExported = true;
      break;
    }
    if (current.children?.some((child: any) => child.type === 'export' || child.text === 'export')) {
      isExported = true;
      break;
    }
    current = current.parent;
  }

  if (node.type === 'lexical_declaration') {
    const kindNode = node.children?.find((c: any) => c.type === 'const' || c.type === 'let');
    if (kindNode) {
      type = kindNode.text as 'const' | 'let';
    }
  } else if (node.type === 'variable_declaration') {
    type = 'var';
  }

  for (const child of node.children || []) {
    if (child.type === 'variable_declarator') {
      const nameNode = child.childForFieldName('name');
      
      if (nameNode) {
        if (nameNode.type === 'identifier') {
          name = nameNode.text;
        } else if (nameNode.type === 'array_pattern') {
          const elements: string[] = [];
          for (const elem of nameNode.children) {
            if (elem.type === 'identifier') {
              elements.push(elem.text);
            } else if (elem.type === 'rest_pattern') {
              const restId = elem.children?.find((c: any) => c.type === 'identifier');
              if (restId) {
                elements.push(`...${restId.text}`);
              }
            }
          }
          name = `[${elements.join(', ')}]`;
        } else if (nameNode.type === 'object_pattern') {
          const properties: string[] = [];
          for (const prop of nameNode.children) {
            if (prop.type === 'shorthand_property_identifier_pattern') {
              properties.push(prop.text);
            } else if (prop.type === 'pair_pattern') {
              const key = prop.childForFieldName('key');
              const value = prop.childForFieldName('value');
              if (key && value) {
                properties.push(`${key.text}: ${value.text}`);
              }
            }
          }
          name = `{ ${properties.join(', ')} }`;
        }
      }

      const typeAnnotation = child.childForFieldName('type');
      if (typeAnnotation) {
        valueType = typeAnnotation.text.replace(/^:\s*/, '');
      }

      const valueNode = child.childForFieldName('value');
      if (valueNode) {
        defaultValue = valueNode.text;

        if (!valueType) {
          if (valueNode.type === 'number') valueType = 'number';
          else if (valueNode.type === 'string' || valueNode.type === 'template_string') valueType = 'string';
          else if (valueNode.type === 'true' || valueNode.type === 'false') valueType = 'boolean';
          else if (valueNode.type === 'null') valueType = 'null';
          else if (valueNode.type === 'undefined') valueType = 'undefined';
          else if (valueNode.type === 'array') valueType = 'array';
          else if (valueNode.type === 'object') valueType = 'object';
          else if (valueNode.type === 'arrow_function' || valueNode.type === 'function') valueType = 'function';
          else valueType = 'any';
        }
      }
    }
  }

  return {
    name,
    type,
    isExported,
    valueType,
    defaultValue,
    location
  };
}

function extractConstructorInfo(node: any, filePath: string): ConstructorInfo {
  let parameters: Parameter[] = [];

  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  const parametersNode = node.childForFieldName('parameters');
  if (parametersNode) {
    for (const param of parametersNode.children) {
      if (param.type === 'required_parameter' || 
          param.type === 'optional_parameter' ||
          param.type === 'rest_parameter') {
        const paramInfo = extractParameterInfo(param);
        if (paramInfo) parameters.push(paramInfo);
      }
    }
  }

  return {
    parameters,
    location
  };
}

function extractInterfaceInfo(node: any, filePath: string): InterfaceInfo | null {
  let name = '';
  let properties: InterfaceProperty[] = [];
  let extends_: string[] | undefined = undefined;
  let isExported = false;
  let genericTypes: string[] | undefined = undefined;

  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  let current = node.parent;
  while (current) {
    if (current.type === 'export_statement' || current.type === 'export_declaration') {
      isExported = true;
      break;
    }
    current = current.parent;
  }

  const nameNode = node.childForFieldName('name');
  if (nameNode) {
    name = nameNode.text;
  }

  const heritage = node.childForFieldName('heritage');
  if (heritage) {
    extends_ = [];
    for (const child of heritage.children) {
      if (child.type === 'extends_clause') {
        for (const type of child.children) {
          if (type.type === 'type_identifier' || type.type === 'identifier') {
            extends_.push(type.text);
          }
        }
      }
    }
  }

  const typeParams = node.childForFieldName('type_parameters');
  if (typeParams) {
    genericTypes = [];
    for (const child of typeParams.children) {
      if (child.type === 'type_parameter') {
        const paramName = child.childForFieldName('name');
        if (paramName) {
          genericTypes.push(paramName.text);
        }
      }
    }
  }

  const bodyNode = node.childForFieldName('body');
  if (bodyNode) {
    for (const child of bodyNode.children) {
      if (child.type === 'property_signature') {
        const propName = child.childForFieldName('name');
        const propType = child.childForFieldName('type');
        const isOptional = child.children?.some((c: any) => c.type === '?' || c.text === '?');
        
        if (propName) {
          properties.push({
            name: propName.text,
            type: propType ? propType.text.replace(/^:\s*/, '') : 'any',
            isOptional: isOptional || false,
            isReadonly: child.children?.some((c: any) => c.type === 'readonly' || c.text === 'readonly') || false
          });
        }
      }
      
      if (child.type === 'index_signature') {
        const paramNode = child.childForFieldName('parameter');
        const typeNode = child.childForFieldName('type');
        
        if (paramNode && typeNode) {
          const paramName = paramNode.childForFieldName('name') || paramNode;
          const paramType = paramNode.childForFieldName('type');
          
          properties.push({
            name: `[${paramName.text}: ${paramType ? paramType.text.replace(/^:\s*/, '') : 'string'}]`,
            type: typeNode.text.replace(/^:\s*/, ''),
            isOptional: false,
            isReadonly: child.children?.some((c: any) => c.type === 'readonly' || c.text === 'readonly') || false
          });
        }
      }
    }
  }

  return {
    name,
    properties,
    extends: extends_,
    isExported,
    genericTypes,
    location
  };
}

function extractPropertyInfo(node: any): PropertyInfo {
  let name = '';
  let type: string | undefined = undefined;
  let isStatic: boolean = false;
  let isPrivate: boolean = false;
  let isProtected: boolean = false;
  let isReadonly: boolean = false;
  let defaultValue: string | undefined = undefined;

  for (const child of node.children || []) {
    if (child.type === 'accessibility_modifier') {
      if (child.text === 'private') isPrivate = true;
      if (child.text === 'protected') isProtected = true;
    }
    if (child.type === 'static' || child.text === 'static') {
      isStatic = true;
    }
    if (child.type === 'readonly' || child.text === 'readonly') {
      isReadonly = true;
    }
  }

  const nameNode = node.childForFieldName('name');
  if (nameNode) {
    name = nameNode.text;
  }

  const typeNode = node.childForFieldName('type');
  if (typeNode) {
    type = typeNode.text.replace(/^:\s*/, '');
  }

  const valueNode = node.childForFieldName('value');
  if (valueNode) {
    defaultValue = valueNode.text;
  }

  return {
    name,
    type,
    isStatic,
    isPrivate,
    isProtected,
    isReadonly,
    defaultValue
  };
}

function extractParameterInfo(param: any): Parameter | null {
  let name = '';
  let type = 'any';
  let defaultValue: string | null = null;
  let isOptional = false;
  let isRest = false;
  let parameters: Parameter[] | undefined = undefined;
  let isDestructured = false;

  if (param.type === 'rest_parameter') {
    isRest = true;
  }

  if (param.children?.some((p: any) => p.type === '...' || p.text === '...')) {
    isRest = true;
  }

  const patternNode = param.childForFieldName('pattern');
  
  if (patternNode) {
    if (patternNode.type === 'object_pattern') {
      isDestructured = true;
      name = patternNode.text;
      
      parameters = [];
      const properties = patternNode.children?.filter(
        (c: any) => c.type === 'shorthand_property_identifier_pattern' || 
             c.type === 'pair_pattern' ||
             c.type === 'rest_pattern'
      );
      
      for (const prop of properties || []) {
        if (prop.type === 'shorthand_property_identifier_pattern') {
          parameters.push({
            name: prop.text,
            type: 'any',
            defaultValue: null,
            isOptional: false,
            isRest: false
          });
        } else if (prop.type === 'pair_pattern') {
          const key = prop.childForFieldName('key');
          const value = prop.childForFieldName('value');
          if (key && value) {
            const valueType = value.childForFieldName('type');
            parameters.push({
              name: key.text,
              type: valueType ? valueType.text.replace(/^:\s*/, '') : 'any',
              defaultValue: null,
              isOptional: false,
              isRest: false
            });
          }
        } else if (prop.type === 'rest_pattern') {
          const restId = prop.children?.find((c: any) => c.type === 'identifier');
          if (restId) {
            parameters.push({
              name: restId.text,
              type: 'any',
              defaultValue: null,
              isOptional: false,
              isRest: true
            });
          }
        }
      }
    } else if (patternNode.type === 'array_pattern') {
      isDestructured = true;
      name = patternNode.text;
      
      parameters = [];
      const elements = patternNode.children?.filter(
        (c: any) => c.type === 'identifier' || c.type === 'rest_pattern'
      );
      
      for (const elem of elements || []) {
        if (elem.type === 'identifier') {
          parameters.push({
            name: elem.text,
            type: 'any',
            defaultValue: null,
            isOptional: false,
            isRest: false
          });
        } else if (elem.type === 'rest_pattern') {
          const restId = elem.children?.find((c: any) => c.type === 'identifier');
          if (restId) {
            parameters.push({
              name: restId.text,
              type: 'any',
              defaultValue: null,
              isOptional: false,
              isRest: true
            });
          }
        }
      }
    } else if (patternNode.type === 'identifier') {
      name = patternNode.text;
    }
  } else {
    const nameNode = param.children?.find((child: any) => child.type === 'identifier');
    if (nameNode) {
      name = nameNode.text;
    }
  }

  if (param.type === 'optional_parameter' || 
      param.children?.some((p: any) => p.type === '?' || p.text === '?')) {
    isOptional = true;
  }

  const typeAnnotation = param.childForFieldName('type');
  if (typeAnnotation) {
    type = typeAnnotation.text.replace(/^:\s*/, '');
    
    if (typeAnnotation.children?.some((c: any) => 
        c.type === 'function_type' || 
        c.type === 'parenthesized_type'
    )) {
      const funcType = typeAnnotation.children?.find((c: any) => 
        c.type === 'function_type'
      );
      
      if (funcType) {
        const formalParams = funcType.childForFieldName('parameters');
        if (formalParams) {
          parameters = [];
          const paramList = formalParams.children?.filter((c: any) => 
            c.type === 'required_parameter' || 
            c.type === 'optional_parameter' ||
            c.type === 'rest_parameter'
          );
          
          for (const p of paramList || []) {
            const extractedParam = extractParameterInfo(p);
            if (extractedParam) {
              parameters.push(extractedParam);
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < (param.children?.length || 0); i++) {
    const child = param.children[i];
    if (child.type === '=' || child.text === '=') {
      const next = param.children[i + 1];
      if (next) {
        defaultValue = next.text;
        isOptional = true;
      }
      break;
    }
  }

  if (isRest && name.startsWith('...')) {
    name = name.substring(3);
  } else if (isRest && !name.startsWith('...')) {
    const restChild = param.children?.find((c: any) => c.type === 'identifier');
    if (restChild) {
      name = restChild.text;
    }
  }

  const result: Parameter = { 
    name, 
    type, 
    defaultValue, 
    isOptional, 
    isRest 
  };
  
  if (parameters && parameters.length > 0) {
    result.parameters = parameters;
  }
  
  if (isDestructured) {
    result.isDestructured = isDestructured;
  }

  return result;
}

function extractTypeAliasInfo(node: any, filePath: string): TypeAliasInfo | null {
  let name = '';
  let type: string | undefined = undefined;
  let isExported = false;
  let genericTypes: string[] | undefined = undefined;

  const location: SourceLocation = {
    start: {
      line: node.startPosition.row + 1,
      column: node.startPosition.column
    },
    end: {
      line: node.endPosition.row + 1,
      column: node.endPosition.column
    },
    filePath
  };

  let current = node.parent;
  while (current) {
    if (current.type === 'export_statement' || current.type === 'export_declaration') {
      isExported = true;
      break;
    }
    if (current.children?.some((child: any) => child.type === 'export' || child.text === 'export')) {
      isExported = true;
      break;
    }
    current = current.parent;
  }

  const nameNode = node.childForFieldName('name');
  if (nameNode) {
    name = nameNode.text;
  }

  const typeParams = node.childForFieldName('type_parameters');
  if (typeParams) {
    genericTypes = [];
    for (const child of typeParams.children) {
      if (child.type === 'type_parameter') {
        const paramName = child.childForFieldName('name');
        if (paramName) {
          genericTypes.push(paramName.text);
        }
      }
    }
  }

  const typeNode = node.childForFieldName('value') || node.childForFieldName('type');
  if (typeNode) {
    type = typeNode.text;
  }

  return {
    name,
    type: type || 'unknown',
    isExported,
    genericTypes,
    location
  };
}