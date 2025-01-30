# プロジェクト概要
🔍 このプロジェクトは、Next.jsをベースに構築されたWebアプリケーションです。主な機能として、ユーザー認証、プロフィール管理、Firestoreを使用したデータ管理を提供します。

### フロントエンド
- Next.js: Reactフレームワーク
- Tailwind CSS: スタイリング
- Radix UI: UIコンポーネント

### バックエンド
- Next.js API Routes: APIエンドポイント (`app/api/users/route.ts`, `app/api/users/[userId]/route.ts`)
- Firebase Admin: Firestoreとの連携

## プロジェクト構造
```
app/
  ├── api/
  │   └── users/
  │       └── [userId]/
  ├── components/
  │   └── providers/
  │       └── LiffProvider.tsx
  │   └── ui/
  ├── user/
  │   └── components/
  │       └── Profile.tsx
  ├── layout.tsx
  └── page.tsx
components/
  └── providers/
      └── LiffProvider.tsx
lib/
  └── utils.ts
services/
  └── firestore/
      ├── FirestoreService.ts
      └── repository/
          └── UserRepository.ts
```

## 開発環境
- Node.js
- npm (または yarn, pnpm, bun)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
