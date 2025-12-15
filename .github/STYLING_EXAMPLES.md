# Styling Examples - Tailwind v4 + Ant Design + SCSS

> **Real-world examples from the project**
> See how we combine the 3 styling layers effectively

---

## Example 1: Game Card (Hybrid Approach)

### Component
```tsx
import { Card, Tag, Space } from 'antd';

export function GameCard({ team, score }: Props) {
  return (
    <Card 
      className="p-6 bg-beige-card rounded-lg shadow-md hover:shadow-xl transition-shadow game-card"
      title={
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-navy-dark">{team.name}</h3>
          <Tag color={team.color} className="text-sm font-semibold">Active</Tag>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-base text-navy-medium">Current Score</span>
          <span className="text-3xl font-bold text-yellow-primary">{score}</span>
        </div>
        
        <div className="w-full h-2 bg-navy-light rounded-full">
          <div 
            className="h-full bg-yellow-primary rounded-full transition-all"
            style={{ width: `${(score / 100) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
```

### SCSS (for custom hover animation)
```scss
.game-card {
  &:hover {
    transform: translateY(-4px);
    border-color: $yellow-primary;
  }
}
```

**Layers used**:
- ✅ **Ant Design**: Card, Tag (complex components)
- ✅ **Tailwind**: Layout (flex, gap), spacing (p-6), colors (bg-beige-card)
- ✅ **SCSS**: Custom hover animation

---

## Example 2: Team Setup Form (Ant Design + Tailwind)

### Component
```tsx
import { Form, Input, Button, ColorPicker, Space } from 'antd';

export function TeamSetupForm({ onSubmit }: Props) {
  return (
    <Form onFinish={onSubmit} className="max-w-md mx-auto">
      <Space direction="vertical" size="large" className="w-full">
        <Form.Item 
          name="teamName" 
          rules={[{ required: true, message: 'Please enter team name' }]}
        >
          <Input 
            placeholder="Team Name" 
            className="text-lg px-4 py-2"
          />
        </Form.Item>

        <Form.Item name="color" initialValue="#ffc107">
          <ColorPicker showText />
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          size="large"
          className="w-full bg-yellow-primary hover:bg-yellow-dark text-navy-dark font-bold"
        >
          Add Team
        </Button>
      </Space>
    </Form>
  );
}
```

**Layers used**:
- ✅ **Ant Design**: Form, Input, Button, ColorPicker (form logic)
- ✅ **Tailwind**: Layout (max-w-md, mx-auto), spacing (w-full), typography
- ❌ **No SCSS**: Not needed for simple forms

---

## Example 3: Pattern Example Viewer (All 3 Layers)

### Component
```tsx
import { Card, Alert, Tag, Typography } from 'antd';
import CodeBlock from './CodeBlock';

export function ExampleViewer({ example, revealed }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-xl example-viewer__card">
        <Space direction="vertical" size="large" className="w-full">
          {/* Title Section */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-navy-dark">
                {example.title}
              </h3>
              <Tag color="blue" className="text-sm">{example.category}</Tag>
            </div>
          </div>

          {/* Code Block */}
          <div className="bg-navy-dark p-4 rounded-lg">
            <CodeBlock code={example.code} language="javascript" />
          </div>

          {/* Solution (if revealed) */}
          {revealed && (
            <div className="space-y-4">
              <Alert 
                type="info" 
                message="Explanation" 
                description={example.explanation}
              />
              
              {example.steps.map((step, index) => (
                <Card 
                  key={index}
                  size="small"
                  className="shadow-sm hover:shadow-md transition-shadow"
                  title={
                    <span className="text-base font-semibold text-navy-dark">
                      Step {index + 1}: {step.title}
                    </span>
                  }
                >
                  <Typography.Paragraph className="mb-4">
                    {step.description}
                  </Typography.Paragraph>
                  <CodeBlock code={step.code} language="javascript" />
                </Card>
              ))}
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
}
```

### SCSS (for custom card styles)
```scss
.example-viewer {
  &__card {
    background: linear-gradient(135deg, $beige-card 0%, $beige-light 100%);
    border: 2px solid transparent;
    transition: all 0.3s ease;

    &:hover {
      border-color: $yellow-primary;
      box-shadow: 0 10px 40px rgba($yellow-primary, 0.2);
    }
  }
}
```

**Layers used**:
- ✅ **Ant Design**: Card, Alert, Tag, Typography (complex UI)
- ✅ **Tailwind**: Layout, spacing, typography (utilities)
- ✅ **SCSS**: Custom gradient background, hover effects

---

## Example 4: Responsive Navigation (Tailwind Heavy)

### Component
```tsx
import { Menu } from 'antd';

export function Navigation() {
  return (
    <nav className="bg-navy-dark border-b-2 border-yellow-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-yellow-primary hidden md:block">
              Design Pattern Showcase
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="/quiz" 
              className="text-white hover:text-yellow-primary transition-colors px-3 py-2"
            >
              Quiz
            </a>
            <a 
              href="/theory" 
              className="text-white hover:text-yellow-primary transition-colors px-3 py-2"
            >
              Theory
            </a>
            <a 
              href="/examples" 
              className="text-white hover:text-yellow-primary transition-colors px-3 py-2"
            >
              Examples
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-navy-medium transition-colors">
            <svg className="h-6 w-6 text-white" /* ... */ />
          </button>
        </div>
      </div>
    </nav>
  );
}
```

**Layers used**:
- ✅ **Tailwind**: 95% of the styling (responsive, layout, colors, hover)
- ❌ **Ant Design**: Not needed (simple navigation)
- ❌ **SCSS**: Not needed (Tailwind handles everything)

---

## Example 5: Score Animation (SCSS Heavy)

### Component
```tsx
export function ScoreCounter({ score, isIncreasing }: Props) {
  return (
    <div className={`score-counter ${isIncreasing ? 'score-counter--animating' : ''}`}>
      <span className="text-4xl font-bold text-yellow-primary">
        {score}
      </span>
    </div>
  );
}
```

### SCSS (for complex animation)
```scss
.score-counter {
  position: relative;
  display: inline-block;

  &--animating {
    animation: scoreIncrease 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &::after {
      content: '+10';
      position: absolute;
      top: -20px;
      right: -30px;
      color: $yellow-primary;
      font-size: fn.rem(18);
      font-weight: 700;
      animation: floatUp 0.6s ease-out forwards;
    }
  }

  @keyframes scoreIncrease {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-40px);
    }
  }
}
```

**Layers used**:
- ✅ **Tailwind**: Basic text styling (text-4xl, font-bold)
- ✅ **SCSS**: Complex animations, pseudo-elements
- ❌ **Ant Design**: Not needed (simple display)

---

## Decision Tree

```
Need complex form/modal/table?
├─ YES → Ant Design + Tailwind utilities
└─ NO → Continue

Need just layout/spacing/simple styling?
├─ YES → Tailwind only
└─ NO → Continue

Need animations/complex hover/gradients?
└─ YES → Tailwind + SCSS
```

---

## Common Patterns Summary

| Pattern | Layers | Example |
|---------|--------|---------|
| **Forms** | Ant Design + Tailwind | `<Form>` + `className="w-full"` |
| **Cards** | All 3 | Ant `<Card>` + Tailwind utilities + SCSS hover |
| **Navigation** | Tailwind | `flex`, `gap-4`, responsive classes |
| **Animations** | Tailwind + SCSS | Tailwind for simple, SCSS for complex |
| **Typography** | Tailwind | `text-2xl font-bold text-navy-dark` |
| **Modals** | Ant Design + Tailwind | `<Modal>` + Tailwind for content layout |

---

**Pro Tip**: Start with Tailwind. Only add SCSS when you need:
1. Complex animations (keyframes)
2. Multi-property hover states
3. Pseudo-elements (::before, ::after)
4. Ant Design component overrides
