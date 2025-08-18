/**
 * Centralized list of modern API endpoints (paths relative to baseUrl).
 * Legacy endpoints are intentionally excluded from this list.
 *
 * Keys should be stable identifiers used by ApiRegistry.buildUrl(key, params?)
 * Add new endpoints here as the OpenAPI/UAT spec is finalized.
 */

export const endpoints: { [key: string]: string } = {
  // Authentication
  "Auth.Login": "Auth/Login",
  "Auth.RefreshToken": "Auth/RefreshToken",
  "Auth.IsLoginAllowed": "Auth/IsLoginAllowedAsync",
  "Auth.PostSync": "Users/PostSync",

  // Users
  "Users.GetUser": "Users/GetUser",
  "Users.UpdateProfile": "Users/UpdateProfile",
  "Users.GetProfile": "Users/GetProfile",

  // Wallets
  "Wallets.GetBalances": "Wallets/GetBalances",
  "Wallets.GetWallet": "Wallets/GetWallet/{walletId}",
  "Wallets.CreateWallet": "Wallets/Create",
  "Wallets.UpdateWallet": "Wallets/Update/{walletId}",

  // Transactions
  "Transactions.Create": "Transactions/Post",
  "Transactions.GetHistory": "Transactions/History", // supports query params
  "Transactions.GetById": "Transactions/{transactionId}",

  // Markets
  "Markets.GetTicker": "Markets/Ticker/{symbol}",
  "Markets.GetOrderbook": "Markets/Orderbook/{symbol}",
  "Markets.GetMarkets": "Markets/List",

  // Dashboard / Analytics
  "Dashboard.GetSummary": "Dashboard/Summary",
  "Dashboard.GetMetrics": "Dashboard/Metrics",

  // Payments / Card
  "Payments.CreateCharge": "Payments/Charge",
  "Payments.GetChargeStatus": "Payments/Charge/{chargeId}",

  // Notifications
  "Notifications.List": "Notifications",
  "Notifications.MarkRead": "Notifications/MarkRead/{id}",

  // Feature gates / config
  "Config.GetAppConfig": "Config/GetAppConfig",

  // Misc / utility
  "Health.Ping": "health",
  "OpenApi.Spec": "openapi/v1.json"
};
