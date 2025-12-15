# Tailwind CSS v4 - Quick Reference

> **Project Colors & Common Utilities**
> Use this as a cheat sheet when styling components

---

## 🎨 Custom Colors (from tailwind.config.ts)

### Navy (Primary Background)
```tsx
className="bg-navy-dark"      // #0a1929 - Main background
className="bg-navy-medium"    // #1a2942 - Cards, sections
className="bg-navy-light"     // #2a3952 - Hover states
className="text-navy-dark"    // Text in navy
```

### Yellow (Primary Accent)
```tsx
className="bg-yellow-primary" // #ffc107 - Buttons, highlights
className="bg-yellow-dark"    // #d39e00 - Hover states
className="bg-yellow-light"   // #ffcd39 - Subtle highlights
className="text-yellow-primary" // Yellow text
```

### Beige (Cards & Surfaces)
```tsx
className="bg-beige-card"     // #f5e6d3 - Card backgrounds
className="bg-beige-dark"     // #e6d7c4 - Darker cards
className="bg-beige-light"    // #fff5e6 - Light surfaces
```

### Pink (Errors & Alerts)
```tsx
className="bg-pink-accent"    // #ff1744 - Error states
className="bg-pink-dark"      // #d50000 - Dark alerts
className="bg-pink-light"     // #ff5252 - Light alerts
className="text-pink-accent"  // Error text
```

---

## 📏 Spacing (Most Used)

### Padding
```tsx
className="p-2"    // 0.5rem (8px)
className="p-4"    // 1rem (16px)
className="p-6"    // 1.5rem (24px)
className="p-8"    // 2rem (32px)

// Directional
className="px-4 py-2"  // Horizontal 16px, Vertical 8px
className="pt-4"       // Top only
className="pb-6"       // Bottom only
```

### Margin
```tsx
className="m-2"    // 0.5rem (8px)
className="m-4"    // 1rem (16px)
className="mb-2"   // Bottom margin 8px
className="mt-4"   // Top margin 16px
```

### Gap (for Flex/Grid)
```tsx
className="gap-2"      // 0.5rem between items
className="gap-4"      // 1rem between items
className="gap-6"      // 1.5rem between items
className="space-y-4"  // Vertical spacing 1rem
className="space-x-2"  // Horizontal spacing 0.5rem
```

---

## 📐 Layout

### Flexbox
```tsx
className="flex"                    // display: flex
className="flex flex-col"           // Vertical stack
className="flex flex-row"           // Horizontal (default)
className="flex items-center"       // Vertical align center
className="flex justify-between"    // Space between items
className="flex justify-center"     // Center horizontally
className="flex items-start"        // Align to top
className="flex-wrap"               // Allow wrapping
```

### Grid
```tsx
className="grid"                    // display: grid
className="grid grid-cols-2"        // 2 columns
className="grid grid-cols-3"        // 3 columns
className="grid gap-4"              // Grid gap 1rem
```

### Width & Height
```tsx
className="w-full"      // width: 100%
className="w-1/2"       // width: 50%
className="w-auto"      // width: auto
className="max-w-4xl"   // max-width: 56rem
className="min-w-0"     // min-width: 0

className="h-full"      // height: 100%
className="h-screen"    // height: 100vh
className="min-h-[400px]" // min-height: 400px
```

---

## ✍️ Typography

### Font Size
```tsx
className="text-xs"     // 0.75rem (12px)
className="text-sm"     // 0.875rem (14px)
className="text-base"   // 1rem (16px)
className="text-lg"     // 1.125rem (18px)
className="text-xl"     // 1.25rem (20px)
className="text-2xl"    // 1.5rem (24px)
className="text-3xl"    // 1.875rem (30px)
```

### Font Weight
```tsx
className="font-normal"     // 400
className="font-medium"     // 500
className="font-semibold"   // 600
className="font-bold"       // 700
```

### Text Alignment
```tsx
className="text-left"
className="text-center"
className="text-right"
```

### Line Height
```tsx
className="leading-tight"    // 1.25
className="leading-normal"   // 1.5
className="leading-relaxed"  // 1.625
```

---

## 🎭 Borders & Shadows

### Borders
```tsx
className="border"              // border: 1px
className="border-2"            // border: 2px
className="border-navy-dark"    // Custom color
className="rounded"             // border-radius: 0.25rem
className="rounded-lg"          // border-radius: 0.5rem
className="rounded-full"        // border-radius: 9999px
```

### Shadows
```tsx
className="shadow-sm"   // Small shadow
className="shadow"      // Default shadow
className="shadow-md"   // Medium shadow
className="shadow-lg"   // Large shadow
className="shadow-xl"   // Extra large shadow
```

---

## 🎨 Common Combinations

### Card Pattern
```tsx
<div className="bg-white p-6 rounded-lg shadow-md">
  Card content
</div>
```

### Button Pattern
```tsx
<button className="bg-yellow-primary hover:bg-yellow-dark px-4 py-2 rounded font-semibold text-navy-dark">
  Click me
</button>
```

### Centered Container
```tsx
<div className="max-w-4xl mx-auto p-6">
  Centered content
</div>
```

### Flex Row with Gap
```tsx
<div className="flex items-center gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## 📱 Responsive Design

### Breakpoints
```tsx
className="p-4 md:p-6 lg:p-8"    // Increase padding at larger screens
className="text-base md:text-lg"  // Larger text on medium+
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

**Breakpoints**:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

---

## 🔥 Hover & States

### Hover
```tsx
className="hover:bg-navy-medium"
className="hover:text-yellow-primary"
className="hover:scale-105"
className="hover:shadow-lg"
```

### Focus
```tsx
className="focus:outline-none focus:ring-2 focus:ring-yellow-primary"
```

### Active
```tsx
className="active:scale-95"
```

### Transitions
```tsx
className="transition-all duration-300"
className="transition-colors"
className="transition-shadow"
```

---

## 💡 Pro Tips

### 1. Combine with Ant Design
```tsx
<Card className="shadow-lg hover:shadow-xl transition-shadow">
  <Space direction="vertical" className="w-full">
    {/* Content */}
  </Space>
</Card>
```

### 2. Use SCSS for Complex Hover
```tsx
// TSX
<div className="game-card p-6 bg-navy-dark rounded-lg">

// SCSS
.game-card {
  &:hover {
    transform: translateY(-4px);
    border-color: $yellow-primary;
  }
}
```

### 3. Responsive Utilities
```tsx
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

---

## 🚫 Don't Do This

❌ **Inline styles**:
```tsx
<div style={{ padding: '24px' }}>  // Use className="p-6" instead
```

❌ **Hardcoded colors**:
```tsx
className="bg-[#0a1929]"  // Use bg-navy-dark instead
```

❌ **Over-nesting BEM when Tailwind works**:
```tsx
// ❌ BAD
.component__container__inner__wrapper { padding: 24px; }

// ✅ GOOD
<div className="p-6">
```

---

**Quick Links**:
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [Ant Design Components](https://ant.design/components/overview)
- [Project Copilot Instructions](copilot-instructions.md)
