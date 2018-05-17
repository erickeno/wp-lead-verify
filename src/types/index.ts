export interface Lead {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
}

export interface WpFormat {
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;
  readonly email_address: string;
  readonly 'address.postal_code': string;
  readonly 'address.street_line_1': string;
  readonly 'address.city': string;
  readonly 'address.state_code': string;
}

export interface ValidateLeadResponse {
  readonly status: string;
  readonly errors: ReadonlyArray<string> | null;
}

export type WpIsValid = boolean | null;

export interface WpErrorResponse {
  readonly message: string;
  readonly name: string;
}

export interface WpRequest {
  readonly 'address.country_code': string;
  readonly 'address.postal_code': string;
  readonly phone: string;
  readonly name: string;
  readonly api_key: string;
  readonly 'address.city': string;
  readonly 'address.street_line_1': string;
  readonly email_address: string;
  readonly 'address.state_code': string;
}

export interface WpPhoneResponse {
  readonly error: WpErrorResponse | null;
  readonly warnings: ReadonlyArray<string>;
  readonly is_valid: true | false | null;
  readonly phone_contact_score: number;
  readonly phone_to_name: string | null;
  readonly subscriber_name: string;
  readonly subscriber_age_range: string;
  readonly subscriber_gender: string | null;
  readonly subscriber_address: {
    readonly street_line_1: string;
    readonly street_line_2: string | null;
    readonly city: string;
    readonly postal_code: string;
    readonly state_code: string;
    readonly country_name: string;
    readonly country_code: string;
  };
  readonly country_code: string;
  readonly is_prepaid: boolean | null;
  readonly line_type: string | null;
  readonly carrier: string;
  readonly is_commercial: boolean | null;
}

export interface WpAddressResponse {
  readonly error: WpErrorResponse | null;
  readonly warnings: ReadonlyArray<string>;
  readonly is_valid: WpIsValid;
  readonly diagnostics: ReadonlyArray<string>;
  readonly address_contact_score: number;
  readonly is_active: WpIsValid;
  readonly address_to_name: string | null;
  readonly resident_name: string;
  readonly resident_age_range: string;
  readonly resident_gender: string | null;
  readonly type: string;
  readonly is_commercial: WpIsValid;
  readonly resident_phone: string | null;
}

export interface WpEmailResponse {
  readonly error: WpErrorResponse | null;
  readonly warnings: ReadonlyArray<string>;
  readonly is_valid: WpIsValid;
  readonly diagnostics: ReadonlyArray<string>;
  readonly email_contact_score: number;
  readonly is_disposable: WpIsValid;
  readonly email_to_name: string | null;
  readonly registered_name: string | null;
}

export interface Geolocation {
  readonly postal_code: string;
  readonly city_name: string;
  readonly subdivision: string;
  readonly country_name: string;
  readonly country_code: string;
  readonly continent_code: string;
}
export interface WpIpAddressResponse {
  readonly ip_address_checks: {
    readonly error: WpErrorResponse | null;
    readonly warnings: ReadonlyArray<string>;
    readonly is_valid: WpIsValid;
    readonly is_proxy: WpIsValid;
    readonly geolocation: Geolocation;
    readonly distance_from_address: number;
    readonly distance_from_phone: number;
    readonly connection_type: string | null;
  };
}

export interface WpLeadResponse {
  readonly request: WpRequest;
  readonly phone_checks: WpPhoneResponse;
  readonly address_checks: WpAddressResponse;
  readonly email_address_checks: WpEmailResponse;
  readonly ip_address_checks: WpIpAddressResponse;
}
