interface Position {
    line: number;
    column: number;
}

interface SourceLocation {
    start: Position;
    end: Position;
    filePath: string;
}

interface Ast {
    functions: never[];
    imports: never[];
    exports: never[];
    classes: never[];
    variables: never[];
    interfaces: never[];
    types: never[];
    parsedFiles: ParsedFile[];
    metadata: AstMetadata;
}

interface AstMetadata {
    timestamp: Date;
    parserVersion: string;
    projectName?: string;
    rootDirectory: string;
    totalFiles: number;
    totalFunctions: number;
    totalClasses: number;
    languages: LanguageStats[];
}

interface LanguageStats {
    language: SupportedLanguage;
    fileCount: number;
    lineCount: number;
}

interface ParsedFile {
    filePath: string;
    relativePath: string;
    language: SupportedLanguage;
    functions: FunctionInfo[];
    imports: ImportInfo[];
    exports: ExportInfo[];
    classes: ClassInfo[];
    variables: VariableInfo[];
    interfaces?: InterfaceInfo[];
    types?: TypeAliasInfo[];
    lineCount: number;
}

interface FunctionInfo {
    name: string;
    parameters: Parameter[];
    returnType: string;
    isAsync: boolean;
    isExported: boolean;
    isGenerator: boolean;
    location: SourceLocation;
    comments: CommentInfo[];
    visibility?: 'public' | 'private' | 'protected';
    isStatic?: boolean;
}

interface Parameter {
    name: string;
    type?: string;
    defaultValue?: string;
    isOptional: boolean;
    isRest: boolean;
    isDestructured?: boolean;
    parameters?: Parameter[];
    location?: SourceLocation;
}

interface ImportInfo {
    source: string;
    imports: ImportedItem[];
    type: 'default' | 'named' | 'namespace' | 'side-effect' | 'dynamic';
    isTypeOnly?: boolean;
}

interface ImportedItem {
    name: string;
    alias?: string;
    isType?: boolean;
}

interface ExportInfo {
    name: string;
    type: 'function' | 'class' | 'variable' | 'default' | 'type' | 'interface';
    isReExport: boolean;
    originalSource?: string;
}

interface ClassInfo {
    name: string;
    location: SourceLocation;
    methods: MethodInfo[];
    properties: PropertyInfo[];
    constructor?: ConstructorInfo;
    extends?: string;
    implements?: string[];
    isExported: boolean;
    isAbstract: boolean;
    comments: CommentInfo[];
    genericTypes?: string[];
}

interface MethodInfo {
    name: string;
    parameters: Parameter[];
    returnType?: string;
    isStatic: boolean;
    isPrivate: boolean;
    isProtected: boolean;
    isAsync: boolean;
    isAbstract: boolean;
    location: SourceLocation;
    comments: CommentInfo[];
}

interface ConstructorInfo {
    parameters: Parameter[];
    comments: CommentInfo[];
}

interface PropertyInfo {
    name: string;
    type?: string;
    isStatic: boolean;
    isPrivate: boolean;
    isProtected: boolean;
    isReadonly: boolean;
    defaultValue?: string;
    comments: CommentInfo[];
}

interface VariableInfo {
    name: string;
    type: 'const' | 'let' | 'var';
    isExported: boolean;
    valueType?: string;
    defaultValue?: string;
    location: SourceLocation;
    value: string;
    comments: CommentInfo[];
}

interface InterfaceInfo {
    name: string;
    properties: InterfaceProperty[];
    extends?: string[];
    location: SourceLocation;
    isExported: boolean;
    comments: CommentInfo[];
    genericTypes?: string[];
}

interface InterfaceProperty {
    name: string;
    type: string;
    isOptional: boolean;
    isReadonly: boolean;
}

interface TypeAliasInfo {
    name: string;
    definition: string;
    location: SourceLocation;
    isExported: boolean;
    comments: CommentInfo[];
    genericTypes?: string[];
}

interface CommentInfo {
    text: string;
    type: 'line' | 'block' | 'jsdoc';
    tags?: JSDocTag[];
}

interface JSDocTag {
    tag: string;
    name?: string;
    type?: string;
    description: string;
}

type SupportedLanguage =
    | 'javascript'
    | 'typescript'
    | 'tsx'
    | 'python'
    | 'java'
    | 'go'
    | 'rust'
    | 'php'
    | 'ruby'
    | 'css'
    | 'html'
    | 'json';

    export type {
        SourceLocation,
        Ast,
        AstMetadata,
        LanguageStats,
        ParsedFile,
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
        TypeAliasInfo,
        CommentInfo,
        JSDocTag
      };