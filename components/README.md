# Components Directory

This folder contains all reusable UI components for the Linqin.ai redesign.

## Structure

```
components/
├── ui/              # Reusable UI components (buttons, inputs, cards, etc.)
├── dashboard/       # Dashboard-specific components
├── landing/         # Landing page components
└── layout/          # Layout components (footer, container, etc.)
```

## Component Guidelines

### Naming Convention
- Use PascalCase for component files: `Button.tsx`, `Input.tsx`
- One component per file
- Export as default

### TypeScript
- All components must be TypeScript
- Define prop interfaces
- Use proper typing for events and children

### Styling
- Use Tailwind CSS classes only
- Follow design tokens from `app/globals.css`
- Keep styles in className attribute
- Use design system colors, spacing, and typography

### Example Component
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={/* Tailwind classes based on props */}
    >
      {children}
    </button>
  );
}
```

## UI Components (Planned)

### Phase 1 Components:
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Badge
- [ ] Modal
- [ ] Toast
- [ ] Spinner
- [ ] Skeleton

### Dashboard Components:
- [ ] Sidebar
- [ ] Header
- [ ] StatCard
- [ ] ActivityFeed
- [ ] Chart

### Landing Components:
- [ ] Hero
- [ ] Features
- [ ] Navigation

### Layout Components:
- [ ] Footer
- [ ] Container

## Design System Reference

See `UI_UX_REDESIGN_PLAN.md` for:
- Color palette
- Typography scale
- Spacing system
- Component specifications
- Animation guidelines

## Component Status

Created: March 1, 2026
Status: Initial setup complete, ready for Phase 1 development
