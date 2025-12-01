## Problems Encountered & Solutions

### 1. Dynamic Page Rendering Issues
- **Problem:** Movie detail pages sometimes failed to render due to async API calls.  
- **Solution:** Added proper loading states and error handling in the dynamic `[id]/page.tsx` component.

### 2. Favorites Not Persisting
- **Problem:** Saved movies were not consistently retained across sessions.  
- **Solution:** Implemented `localStorage` helper functions to reliably store and retrieve user favorites.

