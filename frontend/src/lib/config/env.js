
function resolveEnv(value, fallback) {
    if (!value || value.startsWith("${")) return fallback;
    return value;
}

const env = window.__ENV__ ?? {};

export const config = {
    apiUrl: resolveEnv(env.VITE_API_URL, import.meta.env.VITE_API_URL ?? ""),
    appEnv: resolveEnv(env.VITE_APP_ENV, import.meta.env.VITE_APP_ENV ?? "development"),
};