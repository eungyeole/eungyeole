---
to: apps/<%= name %>/package.json
---
{
  "name": "<%= name %>",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tanstack/react-query": "^4.22.3",
    "@tanstack/react-query-devtools": "^4.22.4",
    "next": "^13.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "ui": "*",
    "utils": "*"
  },
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "eslint": "7.32.0",
    "eslint-config-custom": "*",
    "tsconfig": "*",
    "@types/node": "^17.0.12",
    "@types/react": "^18.0.22",
    "@types/react-dom": "^18.0.7",
    "typescript": "^4.5.3"
  }
}
