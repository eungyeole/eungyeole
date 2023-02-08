---
to: apps/<%= name %>/tsconfig.json
---
{
  "extends": "tsconfig/nextjs.json",
  "include": ["next-env.d.ts", "styled.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",
  },
  "exclude": ["node_modules"]
}
