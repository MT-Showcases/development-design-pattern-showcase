# Utility Functions

> **Reusable helper functions organized by domain**

This folder contains pure utility functions that are used across the application. Each file focuses on a specific domain (patterns, examples, i18n, etc.).

---

## 📁 Files

### `patternHelpers.ts`

**Pattern data retrieval utilities**

- `getPatternsByCategory(category)` - Filter patterns by category
- `getPatternById(id)` - Get single pattern by ID
- `getCategoryFromPatternId(id)` - Extract category from pattern ID
- `getAllPatterns()` - Get all patterns as array
- `patternExists(id)` - Check if pattern ID exists
- `getPatternCountByCategory(category)` - Count patterns in category

**Usage**:
```typescript
import { getPatternById, getPatternsByCategory } from '@/lib/utils/patternHelpers';

const singleton = getPatternById('singleton');
const creationalPatterns = getPatternsByCategory('creational');
```

---

## 📐 Architecture

### Pure Functions Pattern

All utilities follow these principles:

- ✅ **Pure** - No side effects, deterministic
- ✅ **Type-safe** - Strong TypeScript typing
- ✅ **Testable** - Easy to unit test
- ✅ **Reusable** - Used across multiple components

### Import Convention

```typescript
// ✅ GOOD: Import from utils
import { getPatternById } from '@/lib/utils/patternHelpers';

// ❌ BAD: Import directly from data source
import { getPatternById } from '@/lib/patternTheory';
```

---

## 🔄 Migration from patternTheory.ts

Pattern helper functions were moved from `lib/patternTheory.ts` to `lib/utils/patternHelpers.ts` to:

1. **Separate concerns** - Data definitions vs data access
2. **Improve testability** - Easier to mock and test
3. **Reduce coupling** - Components don't import large pattern data
4. **Enable tree-shaking** - Import only needed functions

**Before**:
```typescript
import { patterns, getPatternById } from '@/lib/patternTheory';
```

**After**:
```typescript
import { getPatternById } from '@/lib/utils/patternHelpers';
import type { PatternTheory } from '@/lib/patternTheory'; // Only types
```

---

## 🚀 Adding New Utilities

### Template

```typescript
/**
 * COMPONENT TYPE: Utility
 * SECTION: Data Helpers
 *
 * ROLE:
 * - [Describe purpose]
 *
 * PATTERNS USED:
 * - Pure Functions
 * - Type Safety
 */

import type { SomeType } from '@/lib/types';

/**
 * [Function description]
 * @param param - [Parameter description]
 * @returns [Return value description]
 */
export function myUtility(param: SomeType): ReturnType {
  // Implementation
}
```

### Best Practices

1. **Document with JSDoc** - Include param and return types
2. **Keep it pure** - No side effects or mutations
3. **Type everything** - Explicit types for inputs/outputs
4. **Test thoroughly** - Write unit tests for edge cases
5. **Group by domain** - Related functions in same file

---

## 📝 File Naming

- Use **camelCase** for file names: `patternHelpers.ts`
- Use **descriptive names**: `patternHelpers.ts` not `helpers.ts`
- Avoid generic names: `utils.ts`, `misc.ts`

---

## 🧪 Testing

Utilities should have comprehensive unit tests:

```typescript
// patternHelpers.test.ts
describe('getPatternById', () => {
  it('should return pattern when ID exists', () => {
    const pattern = getPatternById('singleton');
    expect(pattern).toBeDefined();
    expect(pattern?.id).toBe('singleton');
  });

  it('should return undefined when ID does not exist', () => {
    const pattern = getPatternById('non-existent');
    expect(pattern).toBeUndefined();
  });
});
```

---

**Remember**: Utilities are the building blocks. Keep them small, focused, and reusable! 🧩
