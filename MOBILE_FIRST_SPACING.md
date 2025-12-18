# Mobile-First Spacing Strategy

> **Mobile-first approach for all padding, margin, and font-size**

## 📐 Philosophy

**Mobile-first = Design for mobile, then scale for desktop**

```scss
// ✅ CORRECT - Mobile-first
.component {
    padding: $spacing-3; // Mobile (12px)

    @include respond-above(md) {
        padding: $spacing-6; // Tablet (24px)
    }

    @include respond-above(lg) {
        padding: $spacing-8; // Desktop (32px)
    }
}

// ❌ WRONG - Desktop-first
.component {
    padding: $spacing-8; // Desktop

    @include respond-below(md) {
        padding: $spacing-4; // Mobile (override)
    }
}
```

---

## 🎯 General Rule

**Mobile padding ≈ 50% of desktop padding**

| Type              | Mobile (xs-sm)   | Tablet (md)    | Desktop (lg+)   |
| ----------------- | ---------------- | -------------- | --------------- |
| **Container**     | 12px (0.75rem)   | 16px (1rem)    | 24px (1.5rem)   |
| **Section**       | 16px (1rem)      | 24px (1.5rem)  | 32px (2rem)     |
| **Large Section** | 24px (1.5rem)    | 32px (2rem)    | 48px (3rem)     |
| **Margin**        | 16px (1rem)      | 24px (1.5rem)  | 32px (2rem)     |
| **Title Size**    | 28px (1.75rem)   | 36px (2.25rem) | 42px (2.625rem) |
| **Body Text**     | 15px (0.9375rem) | 16px (1rem)    | 18px (1.125rem) |

---

## 📱 Breakpoints (Mobile-First)

```scss
$breakpoints: (
    xs: 0,
    // Mobile (base styles)
    sm: 576px,
    // Large mobile
    md: 768px,
    // Tablet
    lg: 992px,
    // Desktop
    xl: 1200px,
    // Large desktop
    xxl: 1400px // Extra large,
);
```

### Mixin Usage

```scss
// Min-width (mobile-first)
@include respond-above(md) {
    // Styles for tablet and above
}

// Max-width (when needed)
@include respond-below(md) {
    // Styles for mobile only
}

// Between breakpoints
@include respond-between(sm, lg) {
    // Styles for tablet only
}
```

---

## 🔄 Updated Components

### 1. **Global Layout** (`app/layout.tsx`)

```tsx
// Mobile-first: 12px → 16px → 24px → 32px
<main className="max-w-[1440px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
```

### 2. **CategoryOverview** (`CategoryOverview.scss`)

```scss
// Mobile: 16px/12px → Desktop: 48px/24px
padding: fn.rem(16) fn.rem(12);

@include respond-above(md) {
    padding: fn.rem(32) fn.rem(24);
}

@include respond-above(lg) {
    padding: fn.rem(48) fn.rem(24);
}
```

### 3. **PatternLayout** (`PatternLayout.scss`)

```scss
// Mobile: 16px/12px → Desktop: 48px/32px
padding: $spacing-4 $spacing-3;

@include respond-above(sm) {
    padding: $spacing-6 $spacing-4;
}

@include respond-above(md) {
    padding: $spacing-8 $spacing-6;
}

@include respond-above(lg) {
    padding: $spacing-12 $spacing-8;
}
```

### 4. **TeamSetup** (`TeamSetup.scss`)

```scss
// Title: 28px → 36px → 42px
font-size: fn.rem(28) !important;

@include respond-above(md) {
    font-size: fn.rem(36) !important;
}

@include respond-above(lg) {
    font-size: fn.rem(42) !important;
}
```

### 5. **ExampleViewer** (`ExampleViewer.scss`)

```scss
// Full width mobile, constrained desktop
max-width: 100%;

@include respond-above(md) {
    max-width: fn.rem(900);
}
```

### 6. **CodeBlock** (`CodeBlock.scss`)

```scss
// Header padding: 8px/12px → 12px → 16px
padding: $spacing-2 $spacing-3;

@include respond-above(sm) {
    padding: $spacing-3;
}

@include respond-above(md) {
    padding: $spacing-4;
}
```

### 7. **Ant Design Cards** (`globals.scss`)

```scss
// Global Card padding override: 12px → 24px
.ant-card {
    &,
    &-body {
        padding: fn.rem(12) !important;

        @include respond-above(md) {
            padding: fn.rem(24) !important;
        }
    }
}
```

---

## 📏 Spacing Scale

```scss
// Mobile base (0.25rem increments)
$spacing-1: 4px; // 0.25rem
$spacing-2: 8px; // 0.5rem
$spacing-3: 12px; // 0.75rem
$spacing-4: 16px; // 1rem
$spacing-5: 20px; // 1.25rem
$spacing-6: 24px; // 1.5rem
$spacing-8: 32px; // 2rem
$spacing-12: 48px; // 3rem
$spacing-16: 64px; // 4rem
```

---

## 🎨 Typography Scale

```scss
// Mobile-first font sizes
$font-xs: 12px; // 0.75rem
$font-sm: 14px; // 0.875rem
$font-base: 16px; // 1rem (mobile base)
$font-lg: 18px; // 1.125rem
$font-xl: 20px; // 1.25rem
$font-2xl: 24px; // 1.5rem
$font-3xl: 30px; // 1.875rem
$font-4xl: 36px; // 2.25rem
```

---

## ✅ Checklist for New Components

When creating a new component:

1. **Padding/Margin**:

    - [ ] Define mobile values (base)
    - [ ] Add `md` breakpoint (tablet)
    - [ ] Add `lg` breakpoint (desktop)

2. **Font Sizes**:

    - [ ] Headings: 28px → 36px → 42px
    - [ ] Body: 15px → 16px → 18px
    - [ ] Small: 14px → 15px → 16px

3. **Spacing**:

    - [ ] Container padding: 12px → 24px → 32px
    - [ ] Section margin: 16px → 24px → 32px
    - [ ] Element gap: 8px → 12px → 16px

4. **Media Queries**:
    - [ ] Use `@include respond-above()`
    - [ ] ❌ Avoid `@include respond-below()` (special cases only)

---

## 🚀 Practical Examples

### Container Padding

```scss
.component {
    // Mobile: half of desktop
    padding: fn.rem(12);

    @include respond-above(md) {
        padding: fn.rem(18);
    }

    @include respond-above(lg) {
        padding: fn.rem(24); // Desktop
    }
}
```

### Margin Stack

```scss
.section {
    // Mobile: 16px gap
    margin-bottom: $spacing-4;

    @include respond-above(md) {
        margin-bottom: $spacing-6; // 24px
    }

    @include respond-above(lg) {
        margin-bottom: $spacing-8; // 32px
    }
}
```

### Title Scaling

```scss
.title {
    // Mobile: readable but compact
    font-size: fn.rem(24);

    @include respond-above(md) {
        font-size: fn.rem(32);
    }

    @include respond-above(lg) {
        font-size: fn.rem(42); // Desktop: visual impact
    }
}
```

---

## 🐛 Troubleshooting

### Issue: Too much padding on mobile

```scss
// ❌ WRONG
padding: fn.rem(48);

// ✅ CORRECT
padding: fn.rem(16); // Mobile
@include respond-above(lg) {
    padding: fn.rem(48); // Desktop
}
```

### Issue: Inverted breakpoints

```scss
// ❌ WRONG (desktop-first)
padding: fn.rem(48);
@include respond-below(md) {
    padding: fn.rem(16);
}

// ✅ CORRECT (mobile-first)
padding: fn.rem(16);
@include respond-above(md) {
    padding: fn.rem(48);
}
```

---

## 📊 Before/After Comparison

### CategoryOverview Header

```scss
// ❌ BEFORE (desktop-first)
margin-bottom: fn.rem(64);
@include respond-below(md) {
    margin-bottom: fn.rem(40);
}

// ✅ AFTER (mobile-first)
margin-bottom: fn.rem(24); // 60% reduction
@include respond-above(md) {
    margin-bottom: fn.rem(40);
}
@include respond-above(lg) {
    margin-bottom: fn.rem(64);
}
```

---

**Remember**: Mobile-first = define the minimum, then expand. Not the opposite! 📱 → 💻
