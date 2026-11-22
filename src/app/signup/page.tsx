// src/app/signup/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation"; // ← "next/router" ではなく navigation！
import { useAuth } from "@/auth/AuthProvider";
import Link from "next/link";


export default function Page() {
    const { login } = useAuth();
  const router = useRouter();
  // username / password は useState で持つ
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // src/app/login/page.tsx

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // ページリロードを防ぐ

  // 空チェックなどはここで
  if (username.trim() === "" || password.trim() === "") {
      return;
    }

      try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!res.ok) return;

  await login(username, password);
  router.push("/");
} catch {
  // エラー表示
}
};

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        新規登録
      </h1>
     
<form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          ユーザー名
          <Input
  type="text"
  name="username"
  placeholder="john"
  autoComplete="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700">
          パスワード
          <Input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button type="submit" className="w-full">
            新規登録
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
  アカウントがある場合は{" "}
  <Link href="/login" className="text-blue-500 hover:underline">
    ログイン
  </Link>
</p>
    </div>
  );
}
