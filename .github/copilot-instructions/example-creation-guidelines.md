# Example Creation Guidelines

> **Complete guide for creating high-quality pattern examples**  
> Follow these rules to maintain consistency and educational value across all 200+ examples.

---

## 📋 Table of Contents

1. [JSON Schema Structure](#json-schema-structure)
2. [Writing Effective Code](#writing-effective-code)
3. [Naming Conventions](#naming-conventions)
4. [Solution Explanations](#solution-explanations)
5. [Solution Steps](#solution-steps)
6. [Solution Advantages](#solution-advantages)
7. [Quality Checklist](#quality-checklist)
8. [Common Mistakes](#common-mistakes)
9. [Examples by Category](#examples-by-category)

---

## 📐 JSON Schema Structure

Every example must follow this **exact structure**:

```typescript
interface PatternExample {
  id: string;                    // Format: "category-##" (e.g., "creational-01")
  title: string;                 // Context + specific problem (NO pattern name)
  category: Category;            // "creational" | "structural" | "behavioral"
  code: string;                  // JavaScript/TypeScript code (15-30 lines)
  solutionPatterns: string[];    // ["Pattern Name"] in Italian
  solutionExplanation: string;   // 3-4 sentences explaining the pattern
  solutionSteps: SolutionStep[]; // 3-4 step-by-step breakdowns
  solutionAdvantages: string[];  // 3-4 key benefits
}

interface SolutionStep {
  title: string;                 // Step title (2-4 words)
  description: string;           // What this step does (1 sentence)
  code: string;                  // Code snippet for this specific step
}
```

---

## 💻 Writing Effective Code

### **Rule 1: NO Pattern Names in Code**

❌ **WRONG - Pattern name visible**:
```javascript
class SingletonDatabase {
  constructor() {
    if (SingletonDatabase.instance) return SingletonDatabase.instance;
    // ...
  }
}
```

✅ **CORRECT - Pattern hidden**:
```javascript
class Database {
  constructor() {
    if (Database.instance) return Database.instance;
    // ...
  }
}
```

---

### **Rule 2: Use Realistic, Production-Like Code**

❌ **WRONG - Academic/trivial**:
```javascript
class Foo {
  constructor() {
    this.bar = 'baz';
  }
}
```

✅ **CORRECT - Real-world context**:
```javascript
class UserCache {
  constructor() {
    if (UserCache.instance) return UserCache.instance;
    this.cache = new Map();
    UserCache.instance = this;
  }
  
  set(userId, data) {
    this.cache.set(userId, data);
  }
}
```

---

### **Rule 3: Keep It Concise (15-30 Lines)**

Focus on the **core pattern mechanism**, not edge cases or full implementations.

✅ **GOOD LENGTH**:
```javascript
// Payment processor factory
class StripeProcessor {
  process(amount) {
    console.log(`Stripe: €${amount}`);
  }
}

class PayPalProcessor {
  process(amount) {
    console.log(`PayPal: €${amount}`);
  }
}

function createPaymentProcessor(type) {
  if (type === 'stripe') return new StripeProcessor();
  if (type === 'paypal') return new PayPalProcessor();
  throw new Error('Provider not supported');
}

const processor = createPaymentProcessor('stripe');
processor.process(99.99);
```

---

### **Rule 4: Use Modern JavaScript (ES6+)**

✅ **Prefer**:
- `const` / `let` (not `var`)
- Arrow functions `() => {}`
- Template literals `` `text ${var}` ``
- Classes `class MyClass {}`
- Destructuring `const { prop } = obj;`
- Spread operator `{ ...obj }`

❌ **Avoid**:
- `var` declarations
- `function() {}` (use arrow functions)
- String concatenation `'text ' + var`
- Prototype-based OOP
- Callback hell

---

### **Rule 5: Include Usage Example**

Always show **how the pattern is used**, not just the definition.

✅ **COMPLETE**:
```javascript
// Pattern implementation
class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    this.logs = [];
    Logger.instance = this;
  }
  
  log(msg) {
    this.logs.push({ msg, time: Date.now() });
  }
}

// USAGE - this is critical!
const logger1 = new Logger();
logger1.log('App started');

const logger2 = new Logger();
console.log(logger1 === logger2); // true
```

---

## 🏷️ Naming Conventions

### **ID Format**

```
category-##
```

- `category`: `creational`, `structural`, `behavioral`, `multipattern`
- `##`: Zero-padded number (01, 02, ..., 50)

**Examples**:
- `creational-01`
- `structural-23`
- `behavioral-05`

---

### **Title Format**

```
Context - Specific problem
```

❌ **WRONG**:
- `Factory Method Example` (reveals pattern)
- `Creazione oggetti` (too generic)

✅ **CORRECT**:
- `Sistema di notifiche` (clear context)
- `Payment processor` (specific problem)
- `Logger con livelli` (describes scenario)

---

## 📝 Solution Explanations

### **Structure (3-4 sentences)**

1. **Pattern name** (in `<strong>` tag)
2. **What it does** (mechanism)
3. **Why it's useful** (benefit)
4. *(Optional)* **When to use**

---

### **Template**

```
Il <strong>Pattern Name</strong> [describes mechanism]. 
[Explains key concept in 1-2 sentences]. 
[States primary benefit or use case].
```

---

### **Examples**

✅ **Factory Method**:
```
Il <strong>Factory Method</strong> centralizza la creazione di oggetti simili che condividono la stessa interfaccia. Invece di istanziare direttamente le classi concrete, deleghiamo la decisione a una funzione factory che sceglie quale oggetto creare in base ai parametri ricevuti.
```

✅ **Singleton**:
```
Il <strong>Singleton</strong> garantisce che una classe abbia una sola istanza condivisa in tutta l'applicazione. Ogni volta che si tenta di creare una nuova istanza, viene restituita quella esistente, permettendo di condividere stato e risorse.
```

✅ **Builder**:
```
Il <strong>Builder</strong> costruisce oggetti complessi passo dopo passo attraverso un'interfaccia fluente. Ogni metodo imposta una proprietà e restituisce il builder stesso (return this), permettendo il chaining. Evita costruttori con troppi parametri e rende il codice leggibile.
```

---

## 🔢 Solution Steps

### **Structure (3-4 steps)**

Each step should:
1. Have a **short title** (2-4 words)
2. Include a **1-sentence description**
3. Show **code snippet** for that specific step

---

### **Template**

```typescript
solutionSteps: [
  {
    title: "Step title",
    description: "What this code does",
    code: "// Relevant code for this step only"
  },
  {
    title: "Next step",
    description: "How it builds on previous step",
    code: "// Code showing this progression"
  },
  {
    title: "Final step",
    description: "Usage or result",
    code: "// How it's used in practice"
  }
]
```

---

### **Example: Factory Method**

```typescript
solutionSteps: [
  {
    title: "Definizione prodotti",
    description: "Due classi con la stessa interfaccia (metodo `send`)",
    code: "class EmailNotifier {\n  send(msg) {\n    console.log(`📧 Email: ${msg}`);\n  }\n}\n\nclass SMSNotifier {\n  send(msg) {\n    console.log(`📱 SMS: ${msg}`);\n  }\n}"
  },
  {
    title: "Factory function",
    description: "Un'unica funzione decide quale oggetto creare in base al parametro",
    code: "function createNotifier(type) {\n  if (type === 'email') return new EmailNotifier();\n  if (type === 'sms') return new SMSNotifier();\n}"
  },
  {
    title: "Utilizzo",
    description: "Il client non conosce la classe concreta, usa solo l'interfaccia comune",
    code: "const notifier = createNotifier('email');\nnotifier.send('Benvenuto!');"
  }
]
```

---

### **Example: Singleton**

```typescript
solutionSteps: [
  {
    title: "Controllo istanza",
    description: "Se esiste già, ritorna quella",
    code: "if (Cache.instance) {\n  return Cache.instance;\n}"
  },
  {
    title: "Creazione unica",
    description: "Salva l'istanza in una proprietà statica",
    code: "this.data = new Map();\nCache.instance = this;"
  },
  {
    title: "Condivisione",
    description: "Tutte le `new Cache()` ritornano la stessa istanza",
    code: "const cache1 = new Cache();\nconst cache2 = new Cache();\nconsole.log(cache1 === cache2); // true"
  }
]
```

---

## ✨ Solution Advantages

### **Structure (3-4 bullet points)**

Each advantage should:
1. Be **short and punchy** (3-8 words)
2. Focus on **practical benefits**
3. Use **lowercase** (except proper nouns)

---

### **Categories of Advantages**

1. **Code Quality**: maintainability, readability, testability
2. **Architecture**: decoupling, extensibility, scalability
3. **Performance**: memory optimization, speed, caching
4. **Development**: ease of adding features, debugging
5. **Business**: A/B testing, multi-provider, compliance

---

### **Examples**

✅ **Factory Method**:
```typescript
solutionAdvantages: [
  "Centralizza la logica di istanziazione",
  "Facilita l'aggiunta di nuovi tipi",
  "Disaccoppia il codice client dalle classi concrete"
]
```

✅ **Singleton**:
```typescript
solutionAdvantages: [
  "Dati condivisi tra componenti",
  "Memoria ottimizzata (una sola istanza)",
  "Stato centralizzato e sincronizzato"
]
```

✅ **Builder**:
```typescript
solutionAdvantages: [
  "Evita costruttori con troppi parametri",
  "Codice leggibile e auto-documentante",
  "Validazioni intermedie possibili"
]
```

✅ **Prototype**:
```typescript
solutionAdvantages: [
  "Evita reinizializzazioni costose",
  "Template riutilizzabili",
  "Performance migliori in clonazione"
]
```

---

## ✅ Quality Checklist

Before submitting an example, verify:

### **Code Quality**
- [ ] No pattern names in class/function names
- [ ] Uses modern JavaScript (ES6+: const/let, arrow functions, classes)
- [ ] 15-30 lines of code (not too short, not too long)
- [ ] Includes usage example (not just definition)
- [ ] Realistic scenario (not academic `foo`/`bar`)
- [ ] Code is syntactically correct (no typos)

### **Documentation**
- [ ] `id` follows format `category-##`
- [ ] `title` describes context (NO pattern name)
- [ ] `solutionPatterns` has correct pattern name(s)
- [ ] `solutionExplanation` is 3-4 sentences with `<strong>` tag
- [ ] `solutionSteps` has 3-4 steps with code
- [ ] `solutionAdvantages` has 3-4 benefits

### **Educational Value**
- [ ] Pattern is **clearly recognizable** in code
- [ ] Code is **simple enough** to understand in 30 seconds
- [ ] Explanation **connects code to pattern theory**
- [ ] Steps **progressively build understanding**
- [ ] Advantages are **practical, not theoretical**

---

## ❌ Common Mistakes

### **Mistake 1: Pattern Name Spoilers**

❌ **WRONG**:
```javascript
class SingletonLogger { /* ... */ }
class FactoryMethodBuilder { /* ... */ }
```

✅ **CORRECT**:
```javascript
class Logger { /* ... */ }
class RequestBuilder { /* ... */ }
```

---

### **Mistake 2: Too Generic/Abstract**

❌ **WRONG**:
```javascript
class Thing {
  doStuff() {
    return 'stuff';
  }
}
```

✅ **CORRECT**:
```javascript
class PaymentProcessor {
  process(amount) {
    console.log(`Processing €${amount}`);
  }
}
```

---

### **Mistake 3: Missing Usage**

❌ **WRONG** - Only definition:
```javascript
class Cache {
  constructor() {
    if (Cache.instance) return Cache.instance;
    Cache.instance = this;
  }
}
```

✅ **CORRECT** - Includes usage:
```javascript
class Cache {
  constructor() {
    if (Cache.instance) return Cache.instance;
    Cache.instance = this;
  }
}

// Usage showing the pattern in action
const cache1 = new Cache();
const cache2 = new Cache();
console.log(cache1 === cache2); // true
```

---

### **Mistake 4: Overly Complex Code**

❌ **WRONG** - Too many edge cases:
```javascript
class UserFactory {
  createUser(type, options = {}) {
    const { name, email, role, permissions, settings, metadata } = options;
    
    if (!name || !email) {
      throw new ValidationError('Missing required fields');
    }
    
    // 50 more lines of validation and logic...
  }
}
```

✅ **CORRECT** - Focus on pattern:
```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

function createUser(type) {
  if (type === 'admin') return new User('Admin', 'admin');
  if (type === 'guest') return new User('Guest', 'guest');
}
```

---

### **Mistake 5: Weak Explanations**

❌ **WRONG**:
```
Questo pattern è utile per creare oggetti.
```

✅ **CORRECT**:
```
Il <strong>Factory Method</strong> centralizza la creazione di oggetti simili che condividono la stessa interfaccia. Invece di istanziare direttamente le classi concrete, deleghiamo la decisione a una funzione factory che sceglie quale oggetto creare in base ai parametri ricevuti.
```

---

## 📚 Examples by Category

### **Creational Patterns**

| Pattern | Key Concept | Example Contexts |
|---------|-------------|------------------|
| **Singleton** | One instance shared | Cache, Logger, Config, Database connection |
| **Factory Method** | Creation logic centralized | Notifiers, Validators, Payment processors |
| **Abstract Factory** | Family of related objects | UI themes, Cross-platform components, Database providers |
| **Builder** | Step-by-step construction | PC configurator, Email builder, Query builder |
| **Prototype** | Clone instead of create | Document templates, Config duplicates, Test fixtures |

---

### **Structural Patterns**

| Pattern | Key Concept | Example Contexts |
|---------|-------------|------------------|
| **Adapter** | Interface compatibility | API adapters, Legacy integrations |
| **Composite** | Tree structures | File systems, UI components |
| **Facade** | Simplified interface | Complex library wrappers |
| **Proxy** | Access control/lazy loading | Image lazy load, API caching |
| **Decorator** | Add behavior dynamically | Stream wrappers, UI enhancements |
| **Bridge** | Separate abstraction/implementation | Device drivers, Cross-platform UI |
| **Flyweight** | Share common data | Typography, Game particles |

---

### **Behavioral Patterns**

| Pattern | Key Concept | Example Contexts |
|---------|-------------|------------------|
| **Observer** | Event notification | Event bus, Pub/Sub, State sync |
| **Strategy** | Interchangeable algorithms | Sorting, Compression, Validation |
| **Command** | Encapsulate actions | Undo/Redo, Macro commands, Task queue |
| **State** | Behavior changes with state | Order workflow, Game states |
| **Template Method** | Algorithm skeleton | Data processing pipelines |
| **Iterator** | Sequential access | Tree traversal, Pagination |
| **Mediator** | Centralized communication | Chat room, UI coordinators |
| **Chain of Responsibility** | Request handlers chain | Logging levels, Middleware |

---

## 🎯 Quick Reference Template

```json
{
  "id": "creational-26",
  "title": "Redis cache connection",
  "category": "creational",
  "code": "class RedisClient {\n  constructor() {\n    if (RedisClient.instance) {\n      return RedisClient.instance;\n    }\n    this.connected = false;\n    this.data = new Map();\n    RedisClient.instance = this;\n  }\n\n  connect() {\n    if (!this.connected) {\n      console.log('Connecting to Redis...');\n      this.connected = true;\n    }\n  }\n\n  get(key) {\n    return this.data.get(key);\n  }\n\n  set(key, value) {\n    this.data.set(key, value);\n  }\n}\n\nconst redis1 = new RedisClient();\nredis1.connect();\n\nconst redis2 = new RedisClient();\nconsole.log(redis1 === redis2); // true",
  "solutionPatterns": ["Singleton"],
  "solutionExplanation": "Il <strong>Singleton</strong> garantisce una sola connessione Redis condivisa in tutta l'applicazione. Ogni tentativo di creare una nuova istanza restituisce quella esistente, prevenendo multiple connessioni e ottimizzando le risorse.",
  "solutionSteps": [
    {
      "title": "Instance check",
      "description": "Verifica se esiste già un'istanza",
      "code": "if (RedisClient.instance) {\n  return RedisClient.instance;\n}"
    },
    {
      "title": "Single connection",
      "description": "Crea connessione e salva l'istanza",
      "code": "this.connected = false;\nthis.data = new Map();\nRedisClient.instance = this;"
    },
    {
      "title": "Shared usage",
      "description": "Tutte le istanze condividono la stessa connessione",
      "code": "const redis1 = new RedisClient();\nconst redis2 = new RedisClient();\nconsole.log(redis1 === redis2); // true"
    }
  ],
  "solutionAdvantages": [
    "Previene connection pool overflow",
    "Ottimizza risorse di sistema",
    "Garantisce consistenza dei dati"
  ]
}
```

---

## 🚀 Next Steps

1. **Choose a pattern** from the category you're working on
2. **Find a context** that hasn't been used yet (check existing examples)
3. **Write code** following the rules above (15-30 lines, no pattern names)
4. **Document thoroughly** (explanation, steps, advantages)
5. **Run quality checklist** before submitting
6. **Test in the app** to verify it displays correctly

---

**Remember**: The goal is to teach design patterns through **discovery, not memorization**. Let the code speak for itself! 🎓
