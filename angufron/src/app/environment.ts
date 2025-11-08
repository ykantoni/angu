// Adjust ports/URLs to match your actual Keycloak & Spring Boot.
export const environment = {
  production: false,
  keycloak: {
    // For modern Keycloak (>=17) root path is usually without /auth in issuer; adapter still needs base URL.
    url: 'http://localhost:18080', // Keycloak base (gateway / reverse proxy if any)
    realm: 'nokia',
    clientId: 'apt'
  },
  // Spring Boot resource server base (port 8080 in example below)
  apiBase: 'http://localhost:8888'
};
