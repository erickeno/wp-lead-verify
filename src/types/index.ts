export type WpIsValid = boolean | null;
export type PhoneWarnings = 'Invalid Input' | 'Not found' | null;
export type LeadToNameMatch = 'Match' | 'No match' | 'No name found' | null;
export type Gender = 'Male' | 'Female' | null;
export type LineType =
  | 'Mobile'
  | 'Landline'
  | 'Fixed VOIP'
  | 'Non-fixed VOIP'
  | 'Premium'
  | 'Tollfree'
  | 'Voicemail'
  | 'Other'
  | 'Unknown'
  | null;

export type AddressWarnings =
  | 'Invalid Input'
  | 'Not found'
  | 'Missing unit / apt / suite number'
  | 'Invalid unit / apt / suite number'
  | 'Input postal code was corrected.Potential impact to AVS code.'
  | null;

export type AgeRanges =
  | '18-24'
  | '25 - 29'
  | '30 - 34'
  | '35 - 39'
  | '40 - 44'
  | '45 - 49'
  | '50 - 54'
  | '55 - 59'
  | '60 - 64'
  | '65 - 69'
  | '70 - 74'
  | '75 - 79'
  | '80 - 84'
  | '85 - 89'
  | '90 +'
  | null;

export type AddressDeliveryPointType =
  | 'Commercial mail drop'
  | 'Multi unit'
  | 'Single unit'
  | 'PO box'
  | 'PO box throwback'
  | 'Unknown address type';

export type EmailWarnings =
  | 'The mailbox is invalid or does not exist'
  | 'General syntax error'
  | 'Invalid domain syntax'
  | 'Invalid username syntax'
  | 'Address is too long'
  | 'Invalid top - level - domain(TLD) in address'
  | 'Domain does not exist'
  | null;

export interface Lead {
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
  readonly address?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: string;
}

export interface WpFormat {
  readonly firstname: string;
  readonly lastname: string;
  readonly phone: string;
  readonly email_address: string;
  readonly 'address.postal_code'?: string;
  readonly 'address.street_line_1'?: string;
  readonly 'address.city'?: string;
  readonly 'address.state_code'?: string;
}

export type ResponseErrors = Array<{
  message: string;
  content: Array<string | null>;
}>;

export interface ValidateResponse {
  readonly status: string;
  readonly errors: ResponseErrors | null;
}

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
  warnings: PhoneWarnings[];
  readonly is_valid: true | false | null;
  readonly phone_contact_score: number;
  readonly phone_to_name: LeadToNameMatch;
  readonly subscriber_name: string;
  readonly subscriber_age_range: string;
  readonly subscriber_gender: Gender;
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
  readonly line_type: LineType;
  readonly carrier: string;
  readonly is_commercial: boolean | null;
}

export interface WpAddressResponse {
  readonly error: WpErrorResponse | null;
  readonly warnings: ReadonlyArray<AddressWarnings>;
  readonly is_valid: WpIsValid;
  readonly diagnostics: ReadonlyArray<string>;
  readonly address_contact_score: number;
  readonly is_active: WpIsValid;
  readonly address_to_name: LeadToNameMatch;
  readonly resident_name: string;
  readonly resident_age_range: AgeRanges;
  readonly resident_gender: Gender;
  readonly type: AddressDeliveryPointType;
  readonly is_commercial: WpIsValid;
  readonly resident_phone: string | null;
}

export interface WpEmailResponse {
  readonly error: WpErrorResponse | null;
  readonly warnings: ReadonlyArray<EmailWarnings>;
  readonly is_valid: WpIsValid;
  readonly diagnostics: ReadonlyArray<string>;
  readonly email_contact_score: number;
  readonly is_disposable: WpIsValid;
  readonly email_to_name: LeadToNameMatch;
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
