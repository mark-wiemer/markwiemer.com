# [markwiemer.com](https://markwiemer.com)

## Developer notes

- Toolchain: Bun, Vite, React, Typescript, SWC, GitHub Actions, Namecheap
- `bun.lockb` is [Bun's binary lockfile](https://bun.sh/docs/install/lockfile)
- See also [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) which uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
