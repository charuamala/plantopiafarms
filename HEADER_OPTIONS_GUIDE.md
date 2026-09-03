# Plantopia Farms — Header Redesign Options

## Quick Start

Three header layout redesigns have been created:
1. **HeaderOption1TwoTier** (RECOMMENDED) — best balance of search + branding + discovery
2. **HeaderOption2SearchFirst** — maximum search prominence
3. **HeaderOption3Refined** — minimal change to current layout

## Files Created

### Components
- `apps/web/customer/src/components/HeaderOption1TwoTier.tsx`
- `apps/web/customer/src/components/HeaderOption2SearchFirst.tsx`
- `apps/web/customer/src/components/HeaderOption3Refined.tsx`

### Styles
- `apps/web/customer/src/styles-header-options.css` — add to your main styles import

## How to Test Each Option

### 1. Import the CSS
Add to `apps/web/customer/src/components/Layout.tsx` or your main CSS import:
```tsx
import '../styles-header-options.css';
```

### 2. Swap the Header Component
Edit `apps/web/customer/src/components/Layout.tsx` to use a different header:

**Current (original):**
```tsx
import Header from './Header';
export default function Layout({ children }) {
  return <Header />...
}
```

**Test Option 1:**
```tsx
import HeaderOption1TwoTier from './HeaderOption1TwoTier';
export default function Layout({ children }) {
  return <HeaderOption1TwoTier />...
}
```

### 3. Run and Preview
```bash
npm run dev:customer     # or: next dev -p 3001
agent-browser open http://localhost:3001 --headed
agent-browser screenshot report-option-1.png
```

## Option Details

### Option 1: Two-Tier Header ⭐ RECOMMENDED

**Structure:**
```
┌─ Logo | Search ————————— | Account ♡ Cart ─┐  (14px padding)
├─────────────────────────────────────────────┤
│ Shop  About  Blog  FAQ                       │  (12px padding)
└─────────────────────────────────────────────┘
```

**Strengths:**
- ✅ Search gets full expanded width (200-400px)
- ✅ Clear visual hierarchy: branding tier → discovery tier
- ✅ Cart/Wishlist prominent in top right
- ✅ Account link at secondary priority
- ✅ Scales well to mobile (bottom tier collapses)
- ✅ Feels balanced and professional

**Weaknesses:**
- Slightly taller header (2 rows)
- More distinct from current design

**Best for:** Balanced e-commerce experience

---

### Option 2: Search-First

**Structure:**
```
┌─ Logo | Account ♡ Cart ──────────────────────┐
├─────────────────────────────────────────────┤
│ Search ————————————————————————————————————— │
├─────────────────────────────────────────────┤
│ Shop  About  Blog  FAQ                       │
└─────────────────────────────────────────────┘
```

**Strengths:**
- ✅ Search gets 100% width (hero treatment)
- ✅ Maximum discoverability for search-first users
- ✅ Clear three-tier visual hierarchy
- ✅ Very scannable on mobile

**Weaknesses:**
- 3 rows = taller header
- Most visual change from current
- May feel over-engineered if users browse categories more than search

**Best for:** Product discovery-heavy e-commerce (fresh groceries, wide selection)

---

### Option 3: Refined Current

**Structure:**
```
┌─ Logo | Search ——— | Shop About Blog FAQ | Account ♡ Cart ─┐
└───────────────────────────────────────────────────────────────┘
```

**Strengths:**
- ✅ Minimal layout change (same single row)
- ✅ Least disruption to existing users
- ✅ Better spacing between sections
- ✅ Account downgraded (smaller, less prominent)

**Weaknesses:**
- Search still constrained (max 280px on desktop)
- Least visual improvement
- Navigation links and search still compete

**Best for:** Conservative teams or when quick iteration is needed

---

## Responsive Behavior

All three options stack gracefully on mobile:

**Desktop (≥900px):** Full layout as shown
**Tablet (620–900px):** Slight padding reduction, all elements visible
**Mobile (<620px):** 
- Show only: Logo, Search, Cart/Wishlist icons
- Hide: Account link, main navigation (would go in hamburger menu)
- Logo shrinks to 48px height
- Search flexes to available space

---

## Implementation Checklist

### Test Phase
- [ ] Run `npm run dev:customer` on port 3001
- [ ] Open headed browser: `agent-browser open http://localhost:3001 --headed`
- [ ] Test each option on desktop, tablet, mobile
- [ ] Verify search still works: type and submit
- [ ] Verify cart count updates
- [ ] Verify wishlist count updates
- [ ] Check all links navigate correctly

### Before/After Verification
- [ ] Capture screenshot of current header (Original)
- [ ] Swap to Option 1, capture screenshot
- [ ] Swap to Option 2, capture screenshot
- [ ] Swap to Option 3, capture screenshot
- [ ] Compare side-by-side

### Final Implementation
- [ ] Choose preferred option
- [ ] Delete the unused option components
- [ ] Replace Header.tsx with chosen option (or rename chosen option to Header.tsx)
- [ ] Verify all cart/wishlist/search functionality works
- [ ] Run visual tests with agent-browser
- [ ] Commit changes

---

## Color Integration

All options use your existing CSS variables:
- `--primary`: #f08a2b (warm orange, used for hover states)
- `--text`: #1f2a1d (dark green text)
- `--border`: rgba(33, 40, 29, 0.08)
- `--bg`: #f7f1e4 (page background)

The nav-badge (cart/wishlist count) uses your existing `.nav-badge` style (red circle).

---

## Why Option 1 is Recommended

1. **Best UX trade-off:** Expands search as you wanted without excessive height
2. **Clear hierarchy:** Logo+Branding → Search+Cart (primary actions) → Navigation (secondary)
3. **Scales to all devices:** Desktop shows full header, mobile collapses gracefully
4. **Professional feel:** Two distinct tiers signal different purposes (commerce vs. discovery)
5. **Low breakage risk:** Uses all your existing components and functionality

---

## Testing E-Commerce Core Flows

Once you choose an option, verify these flows work:

1. **Search:** Type "berries" → Submit → Should navigate to `/shop?search=berries`
2. **Add to Cart:** Browse shop → Add item → Cart count updates → Icon badge appears
3. **Wishlist:** Click heart icon → Navigate to `/wishlist` → Count updates
4. **Account:** Not logged in → Click "Account" → Navigate to `/login`
5. **Navigation:** Click "Shop" → Navigate to `/shop` (no search params)

---

## Next Steps

1. **Choose your option** (Option 1 strongly recommended)
2. **Test it locally** with agent-browser in headed mode
3. **Share screenshots** of the three options to stakeholders if needed
4. **Implement the winner** by replacing Header.tsx
5. **Run full verification** with e-commerce flows

Let me know which option you'd like to go with!
