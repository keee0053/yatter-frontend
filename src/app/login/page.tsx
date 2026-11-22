// src/app/login/page.tsx

"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation"; // ← "next/router" ではなく navigation！
import { useAuth } from "@/auth/AuthProvider";


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
      await login(username, password);
      router.push("/");
    } catch {
      // エラー表示（パスワードが違うときなどここに来る）
    }
};

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        ログイン
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
    </div>
  );
}
