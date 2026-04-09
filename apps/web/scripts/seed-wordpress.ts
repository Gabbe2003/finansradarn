/**
 * Seed WordPress with categories, authors, and articles from mock data.
 *
 * Usage:
 *   npx tsx scripts/seed-wordpress.ts
 *
 * Requires WP Application Password set in .env.local:
 *   NEXT_PUBLIC_WP_URL, WP_AUTH_USER, WP_AUTH_PASSWORD
 */

import { articles, categories, authors } from "../src/lib/data";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://finansradarn.se";
const WP_USER = process.env.WP_AUTH_USER || "";
const WP_PASS = process.env.WP_AUTH_PASSWORD || "";

if (!WP_USER || !WP_PASS) {
  console.error("❌ Saknar WP_AUTH_USER eller WP_AUTH_PASSWORD i .env.local");
  process.exit(1);
}

const AUTH = Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");
const API = `${WP_URL}/wp-json/wp/v2`;

async function wpFetch(endpoint: string, method = "GET", body?: unknown) {
  const res = await fetch(`${API}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${AUTH}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP API ${method} ${endpoint}: ${res.status} — ${text}`);
  }

  return res.json();
}

async function seedCategories() {
  console.log("\n📁 Skapar kategorier...");
  const map: Record<string, number> = {};

  for (const cat of categories) {
    try {
      // Check if exists
      const existing = await wpFetch(`categories?slug=${cat.slug}`);
      if (existing.length > 0) {
        map[cat.id] = existing[0].id;
        console.log(`  ✓ ${cat.name} (finns redan, id: ${existing[0].id})`);
        continue;
      }

      const created = await wpFetch("categories", "POST", {
        name: cat.name,
        slug: cat.slug,
        description: `Färg: ${cat.color}`,
      });
      map[cat.id] = created.id;
      console.log(`  + ${cat.name} (id: ${created.id})`);
    } catch (err) {
      console.error(`  ✗ ${cat.name}: ${err}`);
    }
  }

  return map;
}

async function seedAuthors() {
  console.log("\n👤 Kontrollerar författare...");
  const existing = await wpFetch("users?per_page=100");
  const map: Record<string, number> = {};

  // Map the first existing user as default author
  if (existing.length > 0) {
    for (const author of authors) {
      map[author.id] = existing[0].id;
    }
    console.log(`  ℹ Använder "${existing[0].name}" (id: ${existing[0].id}) som författare`);
    console.log(`  ℹ Skapa fler användare manuellt i WP om du vill ha flera författare`);
  }

  return map;
}

async function seedArticles(categoryMap: Record<string, number>, authorMap: Record<string, number>) {
  console.log("\n📝 Skapar artiklar...");

  for (const article of articles) {
    try {
      // Check if exists
      const existing = await wpFetch(`posts?slug=${article.slug}`);
      if (existing.length > 0) {
        console.log(`  ✓ ${article.title.substring(0, 50)}... (finns redan)`);
        continue;
      }

      const wpCategoryId = categoryMap[article.category.id];
      const wpAuthorId = authorMap[article.author.id];

      const htmlContent = article.content
        .split("\n\n")
        .map((p) => `<p>${p}</p>`)
        .join("\n");

      await wpFetch("posts", "POST", {
        title: article.title,
        slug: article.slug,
        content: htmlContent,
        excerpt: article.excerpt,
        status: "publish",
        date: article.publishedAt,
        categories: wpCategoryId ? [wpCategoryId] : [],
        author: wpAuthorId || 1,
      });

      console.log(`  + ${article.title.substring(0, 60)}...`);

      // Small delay to not overwhelm the API
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error(`  ✗ ${article.title.substring(0, 40)}...: ${err}`);
    }
  }
}

async function main() {
  console.log(`🚀 Seedar WordPress: ${WP_URL}`);
  console.log(`   User: ${WP_USER}`);

  const categoryMap = await seedCategories();
  const authorMap = await seedAuthors();
  await seedArticles(categoryMap, authorMap);

  console.log("\n✅ Klar! Gå till WordPress admin för att verifiera.");
  console.log(`   ${WP_URL}/wp-admin/edit.php`);
}

main().catch((err) => {
  console.error("❌ Seed misslyckades:", err);
  process.exit(1);
});
