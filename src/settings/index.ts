//throw new Error('Settings module must be replaced depending on mode');
const ajax = {
  timeout: process.env.AJAX_TIMEOUT,
  responseType: process.env.AJAX_RESPONSE_TYPE,
  responseEncoding: process.env.AJAX_ENCODING,
};

const cache = {
  storage: process.env.CACHE_STORAGE,
};

console.log(process.env);

const serviceUrl = {
  selfUrl: process.env.SERVICE_SELF_URL,
  url: process.env.SERVICE_URL,
  protocol: process.env.SERVICE_PROTOCOL,
  port: process.env.SERVICE_PORT,
  api: process.env.SERVICE_API,
  apiAudio: process.env.SERVICE_URL_AUDIO,
  localPath: '//localhost',
  onLocal: process.env.SERVICE_ON_LOCAL === 'true',
};

let urlPath = `${serviceUrl.protocol}:${serviceUrl.url}${serviceUrl.api}`;
const urlPathAudio = `${serviceUrl.protocol}:${serviceUrl.apiAudio}`;
if (process.env.CLIENT) {
  if (serviceUrl.onLocal || window.location.hostname === 'localhost') {
    urlPath = `${serviceUrl.localPath}:${serviceUrl.port}${serviceUrl.api}`;
  }
}
const selfUrl = `${serviceUrl.protocol}:${serviceUrl.url}`;
const selfPath = `${serviceUrl.protocol}:${serviceUrl.selfUrl}`;

const robotsTxt = {
  filePath: '/robots.txt',
  host: selfPath,
  policy: [
    {
      userAgent: process.env.ROBOTS_USER_AGENT,
      allow: JSON.parse(process.env.ROBOTS_ALLOW || null),
      disallow: JSON.parse(process.env.ROBOTS_DISALLOW || null),
    },
  ],
};
export { selfUrl, ajax, cache, urlPath, urlPathAudio, selfPath, robotsTxt };
