import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/shared/lib/env";
import { createSupabaseServerAuthClient } from "@/integrations/supabase/server-auth";

async function isAuthenticatedAdminRequest() {
  try {
    const supabase = await createSupabaseServerAuthClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") || "/";
  const secret = url.searchParams.get("secret");
  const disable = url.searchParams.get("disable") === "1";
  const hasAdminSession = await isAuthenticatedAdminRequest();
  const hasSecretPreviewAccess = Boolean(
    env.CMS_PREVIEW_SECRET &&
      secret === env.CMS_PREVIEW_SECRET &&
      env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const secretMatchedWithoutDraftAccess = Boolean(
    env.CMS_PREVIEW_SECRET &&
      secret === env.CMS_PREVIEW_SECRET &&
      !env.SUPABASE_SERVICE_ROLE_KEY,
  );

  if (secretMatchedWithoutDraftAccess && !hasAdminSession) {
    return new NextResponse(
      "Preview secret is configured, but SUPABASE_SERVICE_ROLE_KEY is required for secret-based draft access.",
      { status: 503 },
    );
  }

  const authorized = hasSecretPreviewAccess || hasAdminSession;

  if (!authorized) {
    return new NextResponse("Unauthorized preview request.", { status: 401 });
  }

  const draft = await draftMode();
  if (disable) {
    draft.disable();
  } else {
    draft.enable();
  }

  return NextResponse.redirect(new URL(path, request.url));
}
