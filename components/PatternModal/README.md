# PatternModal - Sistema di Navigazione Globale

> **Modale universale per tutti i link (interni ed esterni)**

## 🎯 Architettura

```
┌─────────────────────────────────────────────────┐
│  Parent Window (Main App)                      │
│  ├─ PatternModalProvider (Context)             │
│  ├─ usePatternModal() hook                     │
│  └─ Modal (Ant Design)                         │
│     └─ <iframe src={currentUrl} />             │
│                                                 │
│         ↓ postMessage ↑                         │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Iframe Content (Theory Pages, etc.)       │ │
│  │ ├─ useModalLinkInterceptor()              │ │
│  │ └─ Intercepts <a> clicks                  │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## 📖 Come Funziona

### 1. **Link dalla Main App → Apre Modal**

```tsx
import { usePatternModal } from '@/components/PatternModal/PatternModal';

function MyComponent() {
  const { openModal, openModalWithUrl } = usePatternModal();

  return (
    <>
      {/* Pattern theory page */}
      <button onClick={() => openModal('creational', 'singleton')}>
        Singleton Pattern
      </button>

      {/* Any URL */}
      <button onClick={() => openModalWithUrl('/theory/behavioral/observer')}>
        Observer Pattern
      </button>

      {/* External link */}
      <button onClick={() => openModalWithUrl('https://refactoring.guru/design-patterns')}>
        External Resource
      </button>
    </>
  );
}
```

### 2. **Link dentro Iframe → Aggiorna stesso Iframe**

Quando l'utente clicca un link **dentro l'iframe**:

1. `useModalLinkInterceptor()` intercetta il click
2. Previene navigazione di default
3. Invia `postMessage` al parent
4. Parent aggiorna `currentUrl` dello stesso iframe
5. **Nessuna modale annidata** - rimane nella modale esistente

```typescript
// Automatico! L'interceptor gestisce:
<a href="/theory/structural/adapter">Adapter</a>
// ↓ Click intercepted
// ↓ postMessage sent
// ↓ Iframe URL updated (no new modal)
```

### 3. **Comunicazione postMessage**

```typescript
// Iframe → Parent
window.parent.postMessage(
  {
    type: 'NAVIGATE_IN_MODAL',
    url: '/theory/structural/adapter',
  },
  window.location.origin
);

// Parent receives and updates iframe
setCurrentUrl(event.data.url);
```

## 🔧 API

### `usePatternModal()` Hook

```typescript
interface PatternModalContextType {
  openModal: (category: string, patternId: string) => void;
  openModalWithUrl: (url: string) => void;
  closeModal: () => void;
  isOpen: boolean;
}
```

**Methods**:

- **`openModal(category, patternId)`** - Apri pagina teoria pattern
  ```tsx
  openModal('creational', 'singleton');
  // → /theory/creational/singleton
  ```

- **`openModalWithUrl(url)`** - Apri qualsiasi URL
  ```tsx
  openModalWithUrl('/any/internal/path');
  openModalWithUrl('https://external.com');
  ```

- **`closeModal()`** - Chiudi modale
  ```tsx
  closeModal();
  ```

- **`isOpen`** - Stato apertura modale
  ```tsx
  {isOpen && <div>Modal is open</div>}
  ```

## 🛠️ Implementazione

### Files

1. **`PatternModal.tsx`**
   - Provider con Context API
   - Modal component (Ant Design)
   - postMessage listener
   - State management (isOpen, currentUrl)

2. **`useModalLinkInterceptor.ts`**
   - Hook per intercettare link in iframe
   - Event listener su click
   - postMessage sender

3. **`ClientLayoutWrapper.tsx`**
   - Wrapper client-side per layout
   - Applica useModalLinkInterceptor globalmente

4. **`app/layout.tsx`**
   - Integra PatternModalProvider
   - Integra ClientLayoutWrapper

## 📋 Pattern Utilizzati

### Observer Pattern
```typescript
// Parent ascolta messaggi da iframe
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === 'NAVIGATE_IN_MODAL') {
      setCurrentUrl(event.data.url);
    }
  };
  window.addEventListener('message', handleMessage);
}, []);
```

### Command Pattern
```typescript
// Iframe invia comandi di navigazione
window.parent.postMessage({
  type: 'NAVIGATE_IN_MODAL',
  url: '/new/path',
}, origin);
```

### Context Pattern
```typescript
// Accesso globale senza prop drilling
<PatternModalContext.Provider value={{ openModal, closeModal, isOpen }}>
  {children}
</PatternModalContext.Provider>
```

## 🎨 Styling

Modal occupa **95% viewport**:

```scss
:global(.pattern-modal) {
  width: 95vw;
  max-width: 1600px;
  top: 10px;
  
  :global(.ant-modal-body) {
    height: 90vh;
    padding: 0;
  }
}
```

## 🔒 Sicurezza

**Origin Validation**:
```typescript
// Solo messaggi dallo stesso dominio
if (event.origin !== window.location.origin) return;
```

## 📱 Responsive

- **Desktop**: 95vw, max 1600px, centered
- **Mobile**: 100vw, 100vh, no borders

## 🚀 Esempi d'Uso

### Pattern Tags (già implementato)
```tsx
// ExampleViewer.tsx
<Tag onClick={() => openModal(category, patternData.id)}>
  {pattern}
</Tag>
```

### Navbar Links
```tsx
<Menu.Item onClick={() => openModal('creational', 'singleton')}>
  Singleton
</Menu.Item>
```

### External Resources
```tsx
<Button onClick={() => openModalWithUrl('https://refactoring.guru')}>
  Learn More
</Button>
```

## ✅ Checklist Integrazione

Per rendere un link "modal-aware":

1. ✅ Usa `usePatternModal()` hook
2. ✅ Chiama `openModal()` o `openModalWithUrl()`
3. ✅ Link dentro iframe vengono intercettati automaticamente
4. ✅ Nessuna configurazione aggiuntiva necessaria

## 🐛 Debugging

**Modal non si apre**:
- Verifica `PatternModalProvider` in layout
- Check console per errori Context

**Link in iframe non intercettati**:
- Verifica `ClientLayoutWrapper` in layout
- Check `window.self !== window.parent` in iframe

**postMessage non funziona**:
- Verifica origin matching
- Check browser console per errori CORS

---

**Sistema completo e funzionante!** 🎉
