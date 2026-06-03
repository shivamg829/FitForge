export function normalizeApiError(error) {
  const status =
    error?.response?.status ?? error?.status ?? error?.code ?? null;

  const data = error?.response?.data;

  const message =
    data?.message ||
    data?.error ||
    error?.message ||
    "Something went wrong. Please try again.";
  let kind = "UNKNOWN";

  if (status === 401 || status === 403) kind = "AUTH_ERROR";
  else if (status === 400) kind = "BAD_REQUEST";
  else if (status >= 500) kind = "SERVER_ERROR";

  const title =
    kind === "AUTH_ERROR"
      ? "Session expired"
      : kind === "SERVER_ERROR"
        ? "Server error"
        : kind === "BAD_REQUEST"
          ? "Invalid request"
          : "Request failed";

  return { title, message, kind, status };
}

