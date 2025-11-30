## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


◇  What's next? ───────────────────────────────────────────────────────────╮
│                                                                          │
│  📁 Project steps                                                        │
│                                                                          │
│    1: cd frontlog                                                        │
│    2: npm run dev -- --open                                              │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  🧩 Add-on steps                                                         │
│                                                                          │
│    drizzle:                                                              │
│      - You will need to set DATABASE_URL in your production environment  │
│      - Run npm run db:start to start the docker container                │
│      - Run npm run db:push to update your database schema                │
│    paraglide:                                                            │
│      - Edit your messages in messages/en.json                            │
│      - Visit /demo/paraglide route to view the demo                      │
│    lucia:                                                                │
│      - Run npm run db:push to update your database schema                │
│      - Visit /demo/lucia route to view the demo                          │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯