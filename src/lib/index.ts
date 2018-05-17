import Axios, { AxiosInstance } from 'axios';
import {
  Lead,
  ResponseErrors,
  ValidateResponse,
  ValidationType,
  WpFormat,
  WpLeadResponse
} from '../types';

/**
 * Validate a lead to ensure that the name,
 * email, phone and address match
 *
 * @export
 * @class WhitePages
 */
export class WhitePagesLeadVerify {
  public readonly url: string;
  private readonly axios: AxiosInstance;

  /**
   * Creates an instance of WhitePages.
   * @param {string} key whitepages pro api key
   * @memberof WhitePages
   */
  constructor(private readonly key: string) {
    this.url = 'https://proapi.whitepages.com/3.3/lead_verify.json?';
    this.axios = Axios.create({ baseURL: this.url });
  }

  public get apiUrl(): string {
    return this.url;
  }

  /**
   * process the lead and sure it's valid through certain crietria
   *
   * @param {Lead} leads data to be processed
   * @returns {(Promise<{ status: string; errors: string[] | null }>)}
   * @memberof WhitePages
   */
  public async validate(
    leads: Lead,
    type: ValidationType = 'all'
  ): Promise<ValidateResponse> {
    try {
      const formated = this.convertToWpFormat(leads);
      const data = await this.getRequest(formated);
      const phoneChecks = data.phone_checks;
      const emailChecks = data.email_address_checks;
      const addressChecks = data.address_checks;
      const errors: ResponseErrors = [];

      if (
        type === 'all' ||
        (type === 'email' && emailChecks.is_valid === false) ||
        emailChecks.is_disposable ||
        emailChecks.email_contact_score === 4
      ) {
        errors.push({
          message: 'invalid email',
          content: Array.from(emailChecks.warnings)
        });
      }

      /**
       * validate phone
       */
      if (
        type === 'all' ||
        (type === 'phone' && phoneChecks.is_valid === false) ||
        phoneChecks.is_commercial ||
        phoneChecks.line_type === 'Tollfree' ||
        phoneChecks.phone_contact_score === 4
      ) {
        errors.push({
          message: 'invalid phone number',
          content: Array.from(phoneChecks.warnings)
        });
      }

      /**
       * validate address
       */
      if (
        type === 'all' ||
        (type === 'address' && addressChecks.is_valid === false) ||
        !addressChecks.is_active ||
        addressChecks.is_commercial ||
        addressChecks.address_contact_score === 4
      ) {
        errors.push({
          message: 'invalid address',
          content: Array.from(addressChecks.warnings)
        });
      }
      if (errors.length > 0) {
        return Promise.resolve({ status: 'error', errors });
      }

      return Promise.resolve({ status: 'success', errors: null });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * convert the lead data to the format required by wp to process
   *
   * @private
   * @param {Lead} lead
   * @returns {WpFormat}
   * @memberof WhitePages
   */
  private convertToWpFormat(lead: Lead): WpFormat {
    return {
      firstname: lead.firstName,
      lastname: lead.lastName,
      phone: lead.phone,
      email_address: lead.email,
      'address.postal_code': lead.zip,
      'address.street_line_1': lead.address,
      'address.city': lead.city,
      'address.state_code': lead.state
    };
  }

  /**
   * run the get request using axios
   *
   * @private
   * @param {WpFormat} params object of param to be passed
   * @returns {Promise<WpLeadResponse>}
   * @memberof WhitePages
   */
  private async getRequest(params: WpFormat): Promise<WpLeadResponse> {
    try {
      const res = await this.axios({
        method: 'get',
        params: { ...params, ...{ api_key: this.key } }
      });

      return res.data;
    } catch (err) {
      return err;
    }
  }
}
