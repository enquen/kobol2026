export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const host = incoming.hostname.toLowerCase();

    let path = incoming.pathname;

    if (path === "/" || path === "") {
      path = host === "1z.kobol2026.hu" ? "/1Z.html" : "/index.html";
    }

    const assetUrl = new URL(path, "https://assets.local");
    assetUrl.search = incoming.search;

    const assetRequest = new Request(assetUrl.toString(), {
      method: "GET",
      headers: {
        "accept": request.headers.get("accept") || "*/*"
      }
    });

    const response = await env.ASSETS.fetch(assetRequest);

    if (response.status === 404) {
      return new Response(`Asset not found: ${path}`, {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    return response;
  }
};
