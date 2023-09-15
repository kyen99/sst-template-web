# Rapid App Stack

This stack provides the basic plumbing to be able to deploy an application quickly that has signup and an authenticated route. It uses the following tools/services:

- [sst](https://sst.dev) - Infrastructure as code, deploy to AWS
- [next.js](https://nextjs.org) - Web framework
- [trpc](https://trpc.io) - Typesafe API replacement for REST
- [drizzle](https://orm.drizzle.team/) - Typesafe ORM
- [next-auth](https://next-auth.js.org/) - Authentication
- AWS RDS - Serverless Aurora PostgreSQL

## Requirements

## Configuration

- Update name and region in `/sst.config.ts`
- Load secrets `pnpm sst secrets load .env`
- Set prod domain name in `stacks/Web.ts`

## Monorepo

- This is a monorepo using workspaces in `/packages/*`
- Add npm packages from a workspace folder
- Pre-configured with:
  - `web` - Next.us front end and API serving the front end
  - `functions` - Async business logic (sending emails, notifying of orders, etc...)
  - `core` - Anything that's central that doesn't belong in the others

## Managing stages

## Database Migrations

- Update db schema in `packages/web/db/schema.ts`
- Run `pnpm drizzle-kit generate:pg` to generate migrations
- Restart web app (to run migrations)
- Migrations are automatically run on app startup
