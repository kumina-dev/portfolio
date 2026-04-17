"use client";

import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/features/admin/actions/auth.actions";
import { Button } from "@/shared/components/Button/Button";
import styles from "./LoginForm.module.css";

const initialState: LoginActionState = {
  error: null,
};

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form className={styles.form} action={formAction}>
      <input type="hidden" name="redirectTo" value={redirectTo ?? ""} />

      <label className={styles.field}>
        <span>Email</span>
        <input
          className={styles.input}
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Password</span>
        <input
          className={styles.input}
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>

      {state.error ? <p className={styles.error}>{state.error}</p> : null}

      <Button className={styles.button} type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
