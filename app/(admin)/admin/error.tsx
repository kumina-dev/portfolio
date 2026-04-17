"use client";

type AdminErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminErrorPage({ error, reset }: AdminErrorPageProps) {
  return (
    <div>
      <h1>Admin error</h1>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}