const normalizeBase = (baseUrl) => {
  if (!baseUrl) return "";
  return baseUrl.replace(/\/+$/, "").replace(/\/api\/?$/, "");
};

export const getImageUrl = (pathOrUrl) => {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const base = normalizeBase(import.meta.env.VITE_API_URL);
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${cleanPath}`;
};

