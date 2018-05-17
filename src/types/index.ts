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
