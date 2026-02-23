Main goal: I want to build a Website that can store and manage credentials. In order to do that I need you to statisfy the following conditions:

1. Techstack
- Frontend: ReactJS, Tanstack Start, TailwindCSS
- Backend: Does not need backend. All data will be stored in firebase
- Primary Language: Typescript

2. UI/UX
- Simple and modern UI
- Responsive design
- Clean and modern design
- Easy to use
- Fast and smooth

3. Features
- Login ( Using firebase auth)
- Add new credential ( Display as an modal)
- Edit existing credential ( Display as an modal)
- Delete credential ( Display as an modal)
- View all credentials ( display as an table which have four columns: Used For, Account, Password, Created Date - and three buttons: Edit, Delete, Copy Password )
- Search credentials (Search by Used For)
- Sort credentials (Sort by Used For)
- Dark mode
- Light mode

4. Firebase
- Firebase Auth
- Firebase Firestore
- Firebase Storage

5. Deployment
- Deploy on Vercel

6. Updates
- Refactored state management of the application: Extracted all Firebase logic, state handling, and data sorting/filtering from `Dashboard.tsx` into a custom `useCredentials` hook located in `/app/src/hooks`. This significantly improves the codebase structure and makes state management much cleaner.
