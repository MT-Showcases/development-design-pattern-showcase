# Tailwind CSS v4 + Ant Design - Project Strategy

## ✅ Current Setup (UPDATED 2025-12-14)

This project uses **Tailwind CSS v4** (4.1.18) as the primary utility framework, combined with **Ant Design** for complex UI components and **SCSS + BEM** for custom styling.

### 🎯 3-Layer Architecture

```
┌─────────────────────────────────────────────────┐
│  Layer 1: Ant Design (Complex UI Components)   │  ← Forms, Modals, Tables
├─────────────────────────────────────────────────┤
│  Layer 2: Tailwind CSS v4 (Utilities)          │  ← 80% of daily styling
├─────────────────────────────────────────────────┤
│  Layer 3: SCSS + BEM (Custom Components)       │  ← 20% special cases
└─────────────────────────────────────────────────┘
```

---

## 📝 When to Use Each Layer

### Layer 1: Ant Design
**Use for**: Forms, Modals, Tables, Drawers, Menus, Tooltips, Dropdowns

```tsx
<Form>
  <Form.Item name="teamName">
    <Input placeholder="Enter team name" />
  </Form.Item>
</Form>
```

### Layer 2: Tailwind CSS v4
**Use for**: Spacing, layout, typography, colors, responsive design

```tsx
<div className="flex items-center gap-4 p-6 bg-navy-dark rounded-lg">
  <h1 className="text-2xl font-bold text-yellow-primary">Title</h1>
  <p className="text-base text-white">Description</p>
</div>
```

**Custom Colors Available**:
- `bg-navy-dark`, `bg-navy-medium`, `bg-navy-light`
- `bg-yellow-primary`, `bg-yellow-dark`, `bg-yellow-light`
- `bg-beige-card`, `bg-beige-dark`, `bg-beige-light`
- `bg-pink-accent`, `bg-pink-dark`, `bg-pink-light`

### Layer 3: SCSS + BEM
**Use for**: Custom animations, complex hover states, Ant Design overrides

```scss
.game-card {
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
    border-color: $yellow-primary;
  }
}
```

---

## 🚀 Benefits of This Approach

1. **Speed**: Tailwind utilities for 80% of styling (no custom CSS needed)
2. **Consistency**: Ant Design ensures professional UI components
3. **Flexibility**: SCSS + BEM for edge cases and custom patterns
4. **Performance**: Tailwind purges unused styles in production
5. **Learning**: Practice both Tailwind v4 and Ant Design in real project

---

## 📚 Configuration Files

### `tailwind.config.ts`
```typescript
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { dark: '#0a1929', medium: '#1a2942', light: '#2a3952' },
        yellow: { primary: '#ffc107', dark: '#d39e00', light: '#ffcd39' },
        pink: { accent: '#ff1744', dark: '#d50000', light: '#ff5252' },
        beige: { card: '#f5e6d3', dark: '#e6d7c4', light: '#fff5e6' },
      },
    },
  },
  corePlugins: {
    preflight: false, // Don't override Ant Design reset
  },
};
```

### `postcss.config.mjs`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### `app/globals.scss`
```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ✅ Example: Hybrid Approach

```tsx
// Ant Design + Tailwind + SCSS (Best of all worlds)
<Card 
  className="p-6 shadow-lg game-card"  // Tailwind utilities
  title={<h3 className="text-xl font-bold text-navy-dark">Round 1</h3>}
>
  <Space direction="vertical" size="large" className="w-full">
    <div className="flex items-center justify-between">
      <Tag color="blue" className="text-sm">Team A</Tag>
      <span className="text-2xl font-bold text-yellow-primary">42</span>
    </div>
  </Space>
</Card>

// SCSS for custom animation
.game-card {
  &:hover {
    transform: translateY(-4px);
    border-color: $yellow-primary;
  }
}
```

---

## 🎓 Learning Resources

- **Tailwind v4**: https://tailwindcss.com/docs (note: v4 syntax)
- **Ant Design**: https://ant.design/components/overview
- **SCSS**: https://sass-lang.com/guide

---

## 📊 Current Stats

- **Tailwind v4**: 4.1.18 ✅ Active
- **Ant Design**: 6.1.0 ✅ Active
- **SCSS**: Via sass 1.96.0 ✅ Active
- **Custom Colors**: 12 (Navy, Yellow, Beige, Pink)
- **Components Using Tailwind**: ExampleViewer, TeamSetup, PatternLayout

---

**Status**: ✅ Fully configured and operational
**Last Updated**: 2025-12-14
