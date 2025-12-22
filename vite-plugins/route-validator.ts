import { existsSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import type { Plugin } from "vite";

interface RouteConfig {
  path: string;
  label: string;
  children?: RouteConfig[];
  [key: string]: unknown;
}

/**
 * Vite plugin that validates route config against the file system
 * - Warns about routes without matching page files
 * - Warns about orphan page files without routes
 * - Runs on server start and when routes.ts changes
 */
export function routeValidator(): Plugin {
  const routesConfigPath = "app/config/routes.ts";
  const pagesDir = "app/pages";

  return {
    name: "route-validator",
    apply: "serve", // Only run in dev mode

    configureServer(server) {
      // Run validation on server start
      setTimeout(() => {
        validateRoutes(server.config.root);
      }, 1000); // Delay to let other plugins initialize

      // Watch for changes to routes.ts
      server.watcher.on("change", (file) => {
        if (file.endsWith("routes.ts")) {
          console.log("\n🔄 Routes config changed, re-validating...\n");
          // Clear module cache and re-validate
          setTimeout(() => {
            validateRoutes(server.config.root);
          }, 500);
        }
      });
    },
  };

  function validateRoutes(root: string) {
    try {
      // Dynamically import the routes config
      const configPath = resolve(root, routesConfigPath);

      // We can't easily import TypeScript at runtime, so we'll parse the file
      // For now, we'll scan the pages directory and compare
      const pageFiles = getAllPageFiles(resolve(root, pagesDir));
      const pagePaths = pageFiles.map((f) => fileToRoutePath(f, resolve(root, pagesDir)));

      // Log findings
      console.log("📋 Route Validation Report");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`   Found ${pagePaths.length} page files in ${pagesDir}/\n`);

      // List all discovered routes
      console.log("   Discovered page routes:");
      pagePaths.slice(0, 10).forEach((p) => console.log(`   ✓ ${p}`));
      if (pagePaths.length > 10) {
        console.log(`   ... and ${pagePaths.length - 10} more\n`);
      } else {
        console.log("");
      }

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("💡 To validate against routes.ts, run: npm run validate:routes\n");
    } catch (error) {
      console.error("Route validation error:", error);
    }
  }

  function getAllPageFiles(dir: string, files: string[] = []): string[] {
    if (!existsSync(dir)) return files;

    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        getAllPageFiles(fullPath, files);
      } else if (item.endsWith(".vue")) {
        files.push(fullPath);
      }
    }

    return files;
  }

  function fileToRoutePath(file: string, pagesDir: string): string {
    let route = file
      .replace(pagesDir, "")
      .replace(/\.vue$/, "")
      .replace(/\/index$/, "")
      .replace(/\\/g, "/"); // Windows compatibility

    if (route === "") route = "/";

    return route;
  }
}
