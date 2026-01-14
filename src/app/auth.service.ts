import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authConfig: AuthConfig = {
    issuer: 'http://localhost:9000/application/o/employee_api/',
    clientId: 'employee_api_client',
    redirectUri: window.location.origin + '/callback',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    requireHttps: false,
    postLogoutRedirectUri: window.location.origin,
    strictDiscoveryDocumentValidation: false,  // Wichtig für Authentik!
  };

  private configurePromise: Promise<void>;
  private accessToken: string = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0YzgyYmEwZDU1NWM5NDkzODg5Y2ViMGNiZGI2NTI5IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiYTA0NjM3NzlkYWNhMDY4ZTAzNWFiMTg3NzI1OGYzOTk5MjljNTA3ODAyYTQ2YjVlMWZkZjQ2NDU1ZmY5ZGYxYiIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3NjgzODcxMTMsImlhdCI6MTc2ODM4NDExMywiYXV0aF90aW1lIjoxNzY4Mzg0MTEzLCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiWFR3NHlLV1hrcUc0bzBYWGJjY3NZRjF3S2ZjZlhtZXk0WXYwaEtjeSJ9.TgcDwyjKmte56AazIieFYbtwHxV3CbF6aeDtUNLZ4df2bfb0TN8E7Xod2vO5Jn2OXVzZ4qjrDJ8ROAS_6UG4k-vkvgk8tVgvd4tLj2Lrr9tquy4Rxc32KGcM2eFkOZL8VPoV7x2wX1bHbbeNCMWR5ViCTrOlwbTjEFVeu_GuHn9lu9segG6SpHU2McWtI3HxROvYPOujrm7U5xC9CBcj1C6lvOJvydU-upAqrAuquLMRCcZpGOahwHtU7yiwka-BOxl-ty8bfU6BkHAZLJBhYF9C1tay-_wV8pOFVkR7lnGVcXvUYShTgttat-VpZdX_WG39sfiMdJfkM-2iFEt70EXkmroC68tyyzEBqtNWwA4kUP2ndVzIFCJ13PSNtSOmv05S0VMB3DiD7VL6PT3RIi9bE76nn0MBdZVTUniikl0T_2ULihCFl7w_bhnAvgtWk0lE8FelXW7lRIVorNU-Nt2pfhtuyrX6Yfec-g6GGNA5MI-72VFmWSiC1uFsyruc5yBdY1P7mzhHpRBgPLEaLlq_67bI2LFpxvwakNmuuTonPzwURNZg2QLnScEXQcR-GwoXcBW7lBixrHHAAqyd0LVYXD7gHsrQtIyprpCqeQGlSaaJT-1RPXVjow8NcPG0rLy3QOkzwERnw0AHhqsYW4opCque2KCcfelK2i2-9Hc';

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.configurePromise = this.configure();
  }

  private async configure() {
    this.oauthService.configure(this.authConfig);

    try {
      // Discovery-Dokument laden
      await this.oauthService.loadDiscoveryDocument();

      // Authentik gibt die Endpoints als Arrays zurück, wir müssen sie normalisieren
      const discoveryDoc = (this.oauthService as any).discoveryDocument;
      if (discoveryDoc) {
        const endpointFields = [
          'authorization_endpoint',
          'token_endpoint',
          'userinfo_endpoint',
          'jwks_uri',
          'end_session_endpoint',
          'revocation_endpoint',
          'introspection_endpoint'
        ];

        endpointFields.forEach(field => {
          if (Array.isArray(discoveryDoc[field]) && discoveryDoc[field].length > 0) {
            discoveryDoc[field] = discoveryDoc[field][0];
          }
        });

        (this.oauthService as any).discoveryDocument = discoveryDoc;
      }

      this.oauthService.setupAutomaticSilentRefresh();
    } catch (error) {
      console.error('Fehler beim Laden des Discovery-Dokuments:', error);
    }
  }

  public async handleCallback(): Promise<boolean> {
    try {
      await this.configurePromise;
      await this.oauthService.tryLogin();
      return this.hasValidToken();
    } catch (error) {
      console.error('Fehler beim Login-Callback:', error);
      return false;
    }
  }

  public async login() {
    await this.configurePromise;
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

    setAccessToken(token: string) {
    this.accessToken = token;
  }

  public hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

    getAccessToken(): string {
    return this.accessToken || this.oauthService.getAccessToken();
  }
}