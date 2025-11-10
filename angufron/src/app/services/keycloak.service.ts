import Keycloak, { KeycloakInitOptions } from 'keycloak-js';

export class KeycloakService {
  private static kc: Keycloak | null = null;
  private static refreshInFlight: Promise<boolean> | null = null;

  static async init(config: { url: string; realm: string; clientId: string }): Promise<void> {
    if (this.kc) return;
    this.kc = new Keycloak(config);
    const initOptions: KeycloakInitOptions = {
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false
      // silentCheckSsoRedirectUri: 'public/silent-check-sso.html'
    };
    await this.kc.init(initOptions);
  }

  static isLoggedIn(): boolean {
    return !!this.kc?.authenticated;
  }

  static login(): Promise<void> {
    return this.kc!.login();
  }

  static logout(): Promise<void> {
    return this.kc!.logout({ redirectUri: window.location.origin });
  }

  static getToken(): string | undefined {
    return this.kc?.token;
  }

  static getUserRoles(): Promise<string[]> {
    return this.kc?.loadUserProfile().then(() => {
      return this.kc?.realmAccess?.roles || [];
    }) || Promise.resolve([]);
  }

  static async updateToken(minValiditySeconds = 60): Promise<boolean> {
    if (!this.kc) return false;
    // coalesce parallel refresh attempts
    if (this.refreshInFlight) return this.refreshInFlight;
    this.refreshInFlight = this.kc
      .updateToken(minValiditySeconds)
      .then(refreshed => refreshed || false)
      .catch(async () => {
        // If refresh fails, force a login
        await this.kc!.login();
        return false;
      })
      .finally(() => {
        this.refreshInFlight = null;
      });
    return this.refreshInFlight;
  }

  static loadUserProfile() {
    return this.kc?.loadUserProfile();
  }

  static hasRole(role: string): boolean {
    return !!this.kc?.hasRealmRole(role);
  }
}
