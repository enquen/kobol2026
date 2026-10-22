export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (url.pathname === "/" || url.pathname === "") {
      url.pathname =
        host === "1z.kobol2026.hu" ? "/1Z.html" : "/index.html";
    }

    return env.ASSETS.fetch(new Request(url, request));
  },
};
