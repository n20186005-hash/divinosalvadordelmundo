const host = 'divinosalvadordelmundo.com';
const pages = new Set(['/', '/historia/', '/como-llegar/', '/fotos/']);
export default {
  /** @param {Request} request @param {{ASSETS:{fetch:(request:Request)=>Promise<Response>}}} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.' + host || (url.hostname === host && url.protocol === 'http:')) {
      url.protocol = 'https:'; url.hostname = host;
      return new Response(null, { status: 308, headers: { Location: url.href } });
    }
    const head = request.method === 'HEAD';
    if ((request.method === 'GET' || head) && pages.has(url.pathname + '/')) {
      url.pathname += '/'; return new Response(null, { status: 308, headers: { Location: url.href } });
    }
    const alias = /^\/(?:en\/)?404(?:\.html|\/)?$/.test(url.pathname);
    let response = alias ? null : await env.ASSETS.fetch(request);
    if (!response || response.status === 404) {
      const error = new URL('/404', url);
      response = await env.ASSETS.fetch(new Request(error, { method: 'GET' }));
      if (response.status >= 300 && response.status < 400 && response.headers.get('Location')) {
        const target = new URL(response.headers.get('Location') || '/404', error);
        if (target.origin === error.origin && /^\/404(?:\.html|\/)?$/.test(target.pathname)) response = await env.ASSETS.fetch(new Request(target, { method: 'GET' }));
      }
      const headers = new Headers(response.headers); headers.delete('Location'); headers.set('X-Robots-Tag', 'noindex'); headers.set('Cache-Control', 'no-store');
      return new Response(head ? null : response.body, { status: 404, headers });
    }
    return head ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }
};
