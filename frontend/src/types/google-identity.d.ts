export {};

declare global {
  interface GoogleCredentialResponse {
    credential?: string;
  }

  interface GoogleIdConfiguration {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    context?: string;
  }

  interface GoogleIdService {
    initialize: (config: GoogleIdConfiguration) => void;
    renderButton: (
      parent: HTMLElement,
      options: Record<string, string | number>,
    ) => void;
  }

  interface GoogleAccounts {
    id: GoogleIdService;
  }

  interface GoogleGlobal {
    accounts: GoogleAccounts;
  }

  interface Window {
    google?: GoogleGlobal;
  }
}
