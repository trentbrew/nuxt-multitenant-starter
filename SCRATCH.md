## A tri-layer naming convention that matches projectional editing

The goal is to avoid “admin vs app” language (PocketBase framing) and instead name three _modes of projection_ over the same graph.

Here are 3 strong naming sets. I’ll also tell you which one I’d pick.

---

# Option A (my favorite): **Studio / Space / Ops**

### 1) **Studio** (builder mode)

**What it is**

- The place you _author the world_, define semantics, and decide what exists.

**Primary objects**

- Ontologies, namespaces, types, predicates
- Collections + views as projections
- Query definitions (saved queries)
- Publishing rules (“this view is public”, “this is read-only”)
- Permission policies (capabilities, scopes)

**Typical screens**

- Model browser (ontology, schema editor)
- View designer (table/board/calendar configs)
- API publishing (CRUD + “view endpoints”)
- Agent/tool manifest editor
- Workspace/space settings

**Mental model**

- “I’m building the runtime surface that others will live inside.”

---

### 2) **Space** (inhabit mode)

**What it is**

- The actual user-facing app—Notion-like—where people do work / write / manage data.

**Primary objects**

- Pages/docs, collections/databases, tasks, entities
- The projections you published from Studio

**Typical screens**

- Page view
- Collection views (table/board/calendar/gallery)
- Entity pages (if you choose to expose them)
- Search + command palette

**Mental model**

- “This is the app.”
  Not “admin UI.”

---

### 3) **Ops** (operate mode)

**What it is**

- Observability and safety controls. Mostly for operators and power users.

**Primary objects**

- Epochs, diffs, provenance
- Indexing pipeline status
- Query cost analytics
- Audit logs (who changed which facts)
- Embeddings/model versions, drift monitoring
- Background jobs / workflows / agent runs

**Mental model**

- “Keep it healthy, safe, fast, and inspectable.”

**Key principle**

- Ops is still a projection over the same graph; it’s just a different lens.

---

# Option B: **Forge / World / Observatory**

A bit more “mythic” and brandable.

- **Forge** = build semantics + publish
- **World** = live in it (the app)
- **Observatory** = audit, provenance, epochs, performance

If your brand leans “worldbuilding”, this is extremely coherent.

---

# Option C: **Design / Run / Inspect**

The most utilitarian / enterprise-friendly.

- **Design** = model + publish
- **Run** = app mode
- **Inspect** = ops/audit

This is great for B2B positioning, less poetic.

---

## How this maps to routes (the important bit)

Instead of “admin routes” and “app routes”, you model **one route tree** where routes are gated by:

- **Mode**: `studio | space | ops`
- **Capability**: `edit_model`, `publish_api`, `view_epochs`, etc.
- **Scope**: `tenant`, `space`, `collection`, etc.

So your route structure becomes something like:

- `/s/:space/...` = **Space** mode (default)
- `/s/:space/studio/...` = **Studio** for that space (model/publish)
- `/s/:space/ops/...` = **Ops** for that space (audit/epochs)

This is the projectional-editing-consistent version of PocketBase’s `/_/` admin path, except it’s **scoped** and **not a separate product**.

---

## What “publishing” means in this tri-layer model

Publishing isn’t “generate a separate app.”

Publishing is:

- selecting a subset of Space projections
- attaching an audience (public / authenticated / role-based)
- attaching a policy (read-only, allowed mutations)
- optionally exporting as API surfaces (CRUD + view endpoints)

In other words:

- **Studio** defines projections and policies
- **Space** is the lived experience of those projections
- **Ops** proves what happened and why

---

## My recommendation

If you’re building “Notion as the interface to a universal graph-backed CMS/API”:

- **Studio / Space / Ops** is the cleanest and most intuitive.
- It also scales from personal → team → hosted platform without renaming later.

If you want, I can next sketch the _exact_ top-level navigation (rail + sidebar) for each mode, and what the “mode switch” UX looks like (e.g., a Space dropdown with “Open in Studio”, “Open Ops”).

---

## “World” is the right word for the product you’re describing

If you want this to be for _everyone_, not just developers, “World” is doing real work:

- It implies **a place you inhabit** (Notion got this right with “workspace”).
- It fits **fiction + research + simulations + finance** because those are all “worlds” with entities, relationships, rules, and timelines.
- It de-emphasizes “database/app/backend” language without losing power.

So yes: **Forge / World / Observatory** reads like a creative tool _and_ a serious system.

---

## How I’d explain the three modes to non-developers

### 1) **World** (default)

**Tagline:** _“Live inside your knowledge.”_
This is what 95% of people should see 95% of the time.

- **What you do here**
  - Write pages
  - Create collections (“Characters”, “Invoices”, “Experiments”, “Markets”)
  - View data as tables / boards / calendars / galleries
  - Connect things naturally (mentions, relationships, tags)
  - Ask the assistant questions about your world

- **What it feels like**
  - Notion + Obsidian + Airtable, but unified

---

### 2) **Forge** (advanced, but still human-friendly)

**Tagline:** _“Shape how the world works.”_
This is where you define structure and behavior _without_ forcing “developer mode”.

- **What you do here**
  - Define “kinds of things” (types) and “kinds of connections” (relationships)
  - Define “properties” (fields) and “views” (projections)
  - Define “rules” (derived facts, formulas, automations)
  - Decide what is **publishable** and who can do what

- **Key UX trick**
  - Don’t call it “ontology editor” by default.
  - Call it **World Rules**, **World Types**, **World Building Blocks**.
  - Keep “ontology / JSON-LD / predicates” as an “expert details” drawer.

---

### 3) **Observatory** (trust + truth)

**Tagline:** _“See why the world believes what it believes.”_

This is the credibility layer for AI + synthesized edges.

- **What you do here**
  - Inspect provenance (“why is this person linked to this project?”)
  - Review AI-extracted facts before they become “trusted”
  - See changes over time (epochs / diffs / timeline)
  - Debug rules, embeddings drift, query costs
  - Audit who changed what

This is the mode that makes your system _feel safe_ to normal people.

---

## Mode switch UX (simple + Notion-esque)

A single **World switcher** in the top-left:

- World: `My Novel`
- Mode pills:
  - `World`
  - `Forge` (lock icon unless you have capability)
  - `Observatory` (shield icon)

No separate app, no separate URL conceptually—just “you’re viewing the world through another lens.”

---

## Publishing, for non-developers, without betraying the architecture

In World/Forge language, “publish as REST API” becomes:

- **“Share this World”**
  - Public link (World pages/collections)
  - Team access (roles)
  - **API access** (keys)

And the key: you publish **Views**, not “tables”.

- **Collection view**: “Public Read API”
- **Curated view**: “Partner API”
- **Internal view**: “Ops-only”

This maps cleanly to your earlier “CRUD endpoints + view/query endpoints” idea, but in language normal users can operate.

---

## The implication for your core abstraction

If you commit to “World” as the main concept, it pushes you toward a very good constraint:

- Everything is either:
  - **a thing in the world** (entity)
  - **a way to see the world** (projection/view)
  - **a rule about the world** (inference/formula)
  - **a record of what happened** (epoch/provenance)

That’s the projectional editing thesis in plain English.

---

If you want the next concrete step, I’d propose a **capability matrix** that’s friendly to non-developers (roles like “Author / Builder / Steward” instead of “admin”), and map which actions are allowed in World vs Forge vs Observatory.
