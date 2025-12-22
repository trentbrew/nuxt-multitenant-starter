/**
 * Route Validation Script
 * Compares routes.ts config against actual page files
 *
 * Run with: npx tsx scripts/validate-routes.ts
 * Or add to package.json: "validate:routes": "tsx scripts/validate-routes.ts"
 */

import { existsSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  dim: "\x1b[2m",
};

const ROOT = resolve(import.meta.dirname, "..");
const PAGES_DIR = resolve(ROOT, "app/pages");

interface RouteConfig {
  path: string;
  label: string;
  children?: RouteConfig[];
}

// Import and flatten routes
async function getConfiguredRoutes(): Promise<string[]> {
  // Dynamic import of the routes config
  const { routeConfig, flattenRoutes } = await import("../app/config/routes");
  const routes = flattenRoutes(routeConfig as RouteConfig[]);
  return routes.map((r: RouteConfig) => r.path).filter(Boolean);
}

// Scan file system for page files
function getPageFiles(dir: string, files: string[] = []): string[] {
  if (!existsSync(dir)) return files;

  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getPageFiles(fullPath, files);
    } else if (item.endsWith(".vue")) {
      files.push(fullPath);
    }
  }

  return files;
}

function fileToRoutePath(file: string): string {
  let route = file
    .replace(PAGES_DIR, "")
    .replace(/\.vue$/, "")
    .replace(/\/index$/, "")
    .replace(/\\/g, "/");

  if (route === "") route = "/";

  return route;
}

function routeToFilePaths(route: string): string[] {
  const base = route === "/" ? "/index" : route;
  return [`${PAGES_DIR}${base}.vue`, `${PAGES_DIR}${base}/index.vue`];
}

async function validate() {
  console.log("\n📋 Route Validation Report");
  console.log("━".repeat(50));

  // Get configured routes
  const configuredRoutes = await getConfiguredRoutes();
  console.log(
    `\n${colors.blue}Config:${colors.reset} ${configuredRoutes.length} routes in routes.ts`
  );

  // Get page files
  const pageFiles = getPageFiles(PAGES_DIR);
  const pageRoutes = pageFiles.map(fileToRoutePath);
  console.log(
    `${colors.blue}Files:${colors.reset}  ${pageRoutes.length} page files in app/pages/\n`
  );

  // Find routes without page files
  const missingPages: string[] = [];
  for (const route of configuredRoutes) {
    const possibleFiles = routeToFilePaths(route);
    const exists = possibleFiles.some((f) => existsSync(f));
    if (!exists) {
      missingPages.push(route);
    }
  }

  // Find orphan pages (files without routes)
  const orphanPages: string[] = [];
  for (const pageRoute of pageRoutes) {
    if (!configuredRoutes.includes(pageRoute)) {
      orphanPages.push(pageRoute);
    }
  }

  // Report missing pages
  if (missingPages.length > 0) {
    console.log(`${colors.red}⚠️  Routes without page files:${colors.reset}`);
    missingPages.forEach((route) => {
      console.log(`   ${colors.red}✗${colors.reset} ${route}`);
    });
    console.log("");
  }

  // Report orphan pages
  if (orphanPages.length > 0) {
    console.log(`${colors.yellow}📄 Page files without routes in config:${colors.reset}`);
    orphanPages.forEach((route) => {
      console.log(`   ${colors.yellow}?${colors.reset} ${route}`);
    });
    console.log(
      `${colors.dim}   (These pages work but aren't in navigation/command palette)${colors.reset}\n`
    );
  }

  // Summary
  console.log("━".repeat(50));
  if (missingPages.length === 0 && orphanPages.length === 0) {
    console.log(`${colors.green}✓ All routes are valid!${colors.reset}\n`);
    process.exit(0);
  } else {
    const issues = missingPages.length + orphanPages.length;
    console.log(
      `${colors.yellow}Found ${issues} issue(s) to review${colors.reset}\n`
    );
    process.exit(missingPages.length > 0 ? 1 : 0); // Only fail on missing pages
  }
}

validate().catch(console.error);
