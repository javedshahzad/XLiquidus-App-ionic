import {OAuth2AuthenticateOptions, OAuth2Client} from "@byteowls/capacitor-oauth2";

export class B2C_config_setting {
    public TenantName = "uatwsceusscybercom";
    public TenantId = "uatwsceusscybercom.onmicrosoft.com";
    public ClientId = "31b602c2-01ba-4721-b3b8-118c818c38a1"; // "6c37b700-5af6-466b-9891-3af18c4cd22b";
    public SignInPolicy = "B2C_1_xl_si";// "B2C_1A_SIGNUP_SIGNIN";
    public GoogleSignInPolicy = "B2C_1_xl_si_go";
    public MircosoftSignInPolicy = "B2C_1_xl_si_ms";
    public AppleSignInPolicy = "B2C_1_xl_si";
    public GoogleSignUpPolicy = "B2C_1_n_go_so_su";
    public MircosoftSignUpPolicy = "B2C_1_n_ms_so_su";
    public AppleSignUpPolicy = "B2C_1_n_apl_so_su";
    public ResetPasswordPolicy = "B2C_1_xl_rp";
    public EditProfilePolicy = "B2C_1_xl_ep";
    public IosKeyChainGroup = "com.usscyber.xliquidus";
    public Scopes = `https://${this.TenantName}.onmicrosoft.com/0ac094e4-2c68-447d-8688-579dcba5fd80/access_as_user+openid+offline_access+profile`; //`https://${this.TenantName}.onmicrosoft.com/0ac094e4-2c68-447d-8688-579dcba5fd80/access_as_user+openid+offline_access+profile`;
    public AuthorizeVersion = 'oauth2/v2.0/authorize';
    public AuthorityBase = `https://${this.TenantName}.b2clogin.com/${this.TenantId}/`;
    //public AuthorityBase = `https://auth.usscyber.com/${this.TenantId}/`;
    public AuthoritySignInSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.SignInPolicy}`;
    public AuthorityGoogleSignInSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.GoogleSignInPolicy}`;
    public AuthorityMircoSoftSignInSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.MircosoftSignInPolicy}`;
    public AuthorityAppleSignInSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.AppleSignInPolicy}`;
    public AuthorityPasswordReset = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.ResetPasswordPolicy}`;
    public AuthorityEditProfile = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.EditProfilePolicy}`;
    public AuthorityGoogleSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.GoogleSignUpPolicy}`;
    public AuthorityMircoSoftSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.MircosoftSignUpPolicy}`;
    public AuthorityAppleSignUp = `${this.AuthorityBase}${this.AuthorizeVersion}?p=${this.AppleSignUpPolicy}`;

    public redirect_uri = `msal${this.ClientId}${encodeURIComponent('://auth')}`;
    public appleRedirect_uri ='msauth.com.usscyber.xl://auth';
    public responseType = `${encodeURIComponent('id_token token')}`;
    public loginPrompt = 'login';

    public B2CloginUrl = `${this.AuthoritySignInSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.redirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;
    public GoogleloginUrl = `${this.AuthorityGoogleSignInSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.redirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;
    public MicrosoftloginUrl = `${this.AuthorityMircoSoftSignInSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.redirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;
    public AppleloginUrl = `${this.AuthorityAppleSignInSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.appleRedirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;

    public B2CResetPasswordUrl = `${this.AuthorityPasswordReset}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.redirect_uri}&response_mode=form_post`;
    public tokenAuthorityBase = `https://${this.TenantName}.b2clogin.com/${this.TenantId}/${this.SignInPolicy}`;

    public MicrosoftSignupUrl = `${this.AuthorityMircoSoftSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.redirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;
    public GoogleSignupUrl = `${this.AuthorityGoogleSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.redirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;
    public AppleSignupUrl = `${this.AuthorityAppleSignUp}&scope=${this.Scopes}&response_type=${this.responseType}&client_id=${this.ClientId}&redirect_uri=${this.appleRedirect_uri}&prompt=${this.loginPrompt}&nonce=defaultNonce`;
    public getAzureB2cOAuth2Options(): OAuth2AuthenticateOptions {
        return {
            appId: this.ClientId,
            authorizationBaseUrl:`${this.AuthorityBase}${this.AuthorizeVersion}`,
            scope:this.Scopes, // See Azure Portal -> API permission
            accessTokenEndpoint:"",
            resourceUrl: "",
            responseType: "token id_token",
            pkceEnabled: true,
            logsEnabled: true,
            additionalParameters: {
                p: this.AppleSignInPolicy,
                prompt: this.loginPrompt,
                nonce:"defaultNonce"
              },
            ios: {
                pkceEnabled: true,
                responseType: "token id_token",
                redirectUrl: this.appleRedirect_uri,
                }
        };
      }
      public kindeLoginDetails() {
        return {
            appId: `a7ac7503b855436eab5e4a1f87d124c9`,  //`8b1dcb3742824495b941df08b03a02e8`,
            client_id:`a7ac7503b855436eab5e4a1f87d124c9`, //"8b1dcb3742824495b941df08b03a02e8",
            authorizationBaseUrl:`https://usscyberinc.kinde.com/oauth2/auth`, //`https://xlapp.kinde.com/oauth2/auth`,
            scope:"email profile openid offline", // See Azure Portal -> API permission
            accessTokenEndpoint:"",
            resourceUrl: "",
            responseType: "code token id_token",
            redirect_uri:`com.usscyber.xliquiduss.app://kinde_callback`,
            pkceEnabled: true,
            logsEnabled: true,
            //state:`US`,
            additionalParameters: {
                p: this.AppleSignInPolicy,
                prompt: this.loginPrompt,
                nonce:"defaultNonce"
              },
            ios: {
                pkceEnabled: true,
                responseType: "code token id_token",
                redirectUrl: this.appleRedirect_uri,
                },
                android: {
                  responseType: "code token id_token", // if you configured a android app in google dev console the value must be "code"
                  redirectUrl: "com.usscyber.xliquiduss.app://kinde_callback" //"com.usscyber.xliquiduss.app:/" // package name from google dev console
                },
        };
      }
      public kindeLoginDetailsIOS() {
        return {
            appId: `a7ac7503b855436eab5e4a1f87d124c9`,  //`8b1dcb3742824495b941df08b03a02e8`,
            client_id:`a7ac7503b855436eab5e4a1f87d124c9`, //"8b1dcb3742824495b941df08b03a02e8",
            authorizationBaseUrl:`https://usscyberinc.kinde.com/oauth2/auth`, //`https://xlapp.kinde.com/oauth2/auth`,
            scope:"email profile openid offline", // See Azure Portal -> API permission
            accessTokenEndpoint:"",
            resourceUrl: "",
            responseType: "code token id_token",
            redirect_uri:`msauth.com.usscyber.xl://kinde_callback`,
            pkceEnabled: true,
            logsEnabled: true,
            //state:`US`,
            additionalParameters: {
                p: this.AppleSignInPolicy,
                prompt: this.loginPrompt,
                nonce:"defaultNonce"
              },
            ios: {
                pkceEnabled: true,
                responseType: "code token id_token",
                redirectUrl: `msauth.com.usscyber.xl://kinde_callback`,
                },
                android: {
                  responseType: "code token id_token", // if you configured a android app in google dev console the value must be "code"
                  redirectUrl: "com.usscyber.xliquiduss.app://kinde_callback" //"com.usscyber.xliquiduss.app:/" // package name from google dev console
                },
        };
      }

      public LogtoLoginDetails() {
        return {
            client_id:`em5nk725e3ujfr20v740y`,
            appId: `em5nk725e3ujfr20v740y`,  //`8b1dcb3742824495b941df08b03a02e8`,
            authorizationBaseUrl:`https://upfbti.logto.app/oidc/auth`, //`https://xlapp.kinde.com/oauth2/auth`,
            scope:"openid profile", // See Azure Portal -> API permission
            accessTokenEndpoint:"",
            resourceUrl: "",
            responseType: "code token id_token",
            redirect_uri:`com.usscyber.xliquiduss.app://callback`,
            pkceEnabled: false,
            logsEnabled: false,
            state:``,
            additionalParameters: {
                prompt: "consent",
              },
            ios: {
                pkceEnabled: true,
                responseType: "code",
                redirectUrl: this.appleRedirect_uri,
                },
                android: {
                  responseType: "code token id_token", // if you configured a android app in google dev console the value must be "code"
                  redirectUrl: "com.usscyber.xliquiduss.app://callback" //"com.usscyber.xliquiduss.app:/" // package name from google dev console
                },
        };
      }
      public LogtoLoginDetailsIOS() {
        return {
            appId: `6ifq29u6jqfmuryupsy4d`,  //`8b1dcb3742824495b941df08b03a02e8`,
            client_id:`6ifq29u6jqfmuryupsy4d`, //"8b1dcb3742824495b941df08b03a02e8",
            authorizationBaseUrl:`https://nvtiqu.logto.app/oidc/auth`, //`https://xlapp.kinde.com/oauth2/auth`,
            scope:"email profile openid offline", // See Azure Portal -> API permission
            accessTokenEndpoint:"",
            resourceUrl: "",
            responseType: "code token id_token",
            redirect_uri:`msauth.com.usscyber.xl://kinde_callback`,
            pkceEnabled: true,
            logsEnabled: true,
            //state:`US`,
            additionalParameters: {
                p: this.AppleSignInPolicy,
                prompt: this.loginPrompt,
                nonce:"defaultNonce"
              },
            ios: {
                pkceEnabled: true,
                responseType: "code token id_token",
                redirectUrl: `msauth.com.usscyber.xl://kinde_callback`,
                },
                android: {
                  responseType: "code token id_token", // if you configured a android app in google dev console the value must be "code"
                  redirectUrl: "com.usscyber.xliquiduss.app://kinde_callback" //"com.usscyber.xliquiduss.app:/" // package name from google dev console
                },
        };
      }
}