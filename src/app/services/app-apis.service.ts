import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppApiService {

  constructor(private appService: AppService) {}

  /* ===== EXISTING ENDPOINTS (UNCHANGED) ===== */
  getCoins(userId: string) {
    return this.appService.getDataByHttp(`api/dashboard/user/${userId}/coins`);
  }

  getWallet(userId: string) {
    return this.appService.getDataByHttp(`api/dashboard/user/${userId}/wallet`);
  }

  getBalance(userId: string) {
    return this.appService.getDataByHttp(`api/dashboard/user/${userId}/balance`);
  }

  searchMarkets(query: string, page = 1, pageSize = 20) {
    const params = `?query=${query}&marketType=1&category=&minPrice=1&maxPrice=500&page=${page}&pageSize=${pageSize}`;
    return this.appService.getDataByHttp(`api/markets/search${params}`);
  }

  get_2026_market_search(query: string, page = 1, pageSize = 20) {
    //query=gold&marketType=Primary&minPrice=10&maxPrice=100&page=1&pageSize=20
    const params = `?query=${query}&marketType=Primary&category=&minPrice=1&maxPrice=500&page=${page}&pageSize=${pageSize}`;
    return this.appService.getDataByHttp(`v2026/market/search${params}`);
  }

  validateToken() {
    return this.appService.postDataByHttp('v2026/auth/token/validate', {});
  }

  getMe() {
    return this.appService.getDataByHttp('v2026/auth/me');
  }

  /* ===== AUTO-GENERATED WITH PATH PARAM INJECTION ===== */
  get_version() {
    return this.appService.getDataByHttp(`/version`);
  }

  get_api_docs() {
    return this.appService.getDataByHttp(`api/docs`);
  }

  get_test_auth_status() {
    return this.appService.getDataByHttp(`/test/auth-status`);
  }

  get_test_user_context() {
    return this.appService.getDataByHttp(`/test/user-context`);
  }

  post_test_inject_context(payload: any) {
    return this.appService.postDataByHttp(`/test/inject-context`, payload);
  }

  post_api_auth_refresh(payload: any) {
    return this.appService.postDataByHttp(`api/auth/refresh`, payload);
  }

  get_api_auth_users_userId(userId: any) {
    return this.appService.getDataByHttp(`api/auth/users/${userId}`);
  }

  get_api_auth_me() {
    return this.appService.getDataByHttp(`api/auth/me`);
  }

  post_api_auth_register(payload: any) {
    return this.appService.postDataByHttp(`api/auth/register`, payload);
  }

  get_api_auth_public() {
    return this.appService.getDataByHttp(`api/auth/public`);
  }

  get_api_auth_protected() {
    return this.appService.getDataByHttp(`api/auth/protected`);
  }

  post_api_auth_token_validate(payload: any) {
    return this.appService.postDataByHttp(`api/auth/token/validate`, payload);
  }

  get_api_auth_user_profile() {
    return this.appService.getDataByHttp(`api/auth/user/profile`);
  }

  post_api_auth_user_sync(payload: any) {
    return this.appService.postDataByHttp(`api/auth/user/sync`, payload);
  }

  post_api_auth_logout(payload: any) {
    return this.appService.postDataByHttp(`api/auth/logout`, payload);
  }

  get_api_auth_status() {
    return this.appService.getDataByHttp(`api/auth/status`);
  }

  post_api_auth_exchange(payload: any) {
    return this.appService.postDataByHttp(`api/auth/exchange`, payload);
  }

  get_api_customer_markets() {
    return this.appService.getDataByHttp(`api/customer-markets`);
  }

  get_api_customer_markets_marketId(marketId: any) {
    return this.appService.getDataByHttp(`api/customer-markets/${marketId}`);
  }

  get_api_customer_markets_marketId_trading_pairs(marketId: any) {
    return this.appService.getDataByHttp(`api/customer-markets/${marketId}/trading-pairs`);
  }

  get_api_customer_markets_trading_pairs_symbol(symbol: any) {
    return this.appService.getDataByHttp(`api/customer-markets/trading-pairs/${symbol}`);
  }

  get_api_customer_markets_trading_pairs_tradingPairId_alerts(tradingPairId: any) {
    return this.appService.getDataByHttp(`api/customer-markets/trading-pairs/${tradingPairId}/alerts`);
  }

  post_api_customer_markets_trading_pairs_tradingPairId_alerts(tradingPairId: any, payload: any) {
    return this.appService.postDataByHttp(`api/customer-markets/trading-pairs/${tradingPairId}/alerts`, payload);
  }

  put_api_customer_markets_trading_pairs_tradingPairId_alerts_alertId(tradingPairId: any, alertId: any, payload: any) {
    return this.appService.putDataByHttp(`api/customer-markets/trading-pairs/${tradingPairId}/alerts/${alertId}`, payload);
  }

  delete_api_customer_markets_trading_pairs_tradingPairId_alerts_alertId(tradingPairId: any, alertId: any) {
    return this.appService.deleteDataByHttp(`api/customer-markets/trading-pairs/${tradingPairId}/alerts/${alertId}`);
  }

  get_api_customer_markets_subscriptions() {
    return this.appService.getDataByHttp(`api/customer-markets/subscriptions`);
  }

  post_api_customer_markets_subscriptions(payload: any) {
    return this.appService.postDataByHttp(`api/customer-markets/subscriptions`, payload);
  }

  get_api_customer_markets_subscriptions_subscriptionId(subscriptionId: any) {
    return this.appService.getDataByHttp(`api/customer-markets/subscriptions/${subscriptionId}`);
  }

  get_api_customer_markets_markets_marketId_subscription_plans(marketId: any) {
    return this.appService.getDataByHttp(`api/customer-markets/markets/${marketId}/subscription-plans`);
  }

  get_api_customer_markets_markets_marketId_subscription_plans_planId(marketId: any, planId: any) {
    return this.appService.getDataByHttp(`api/customer-markets/markets/${marketId}/subscription-plans/${planId}`);
  }

  put_api_customer_markets_subscriptions_subscriptionId_cancel(subscriptionId: any, payload: any) {
    return this.appService.putDataByHttp(`api/customer-markets/subscriptions/${subscriptionId}/cancel`, payload);
  }

  get_api_customer_markets_GetCurrentMarketProfile() {
    return this.appService.getDataByHttp(`api/customer-markets/GetCurrentMarketProfile`);
  }

  post_api_customer_markets_PostCreateMarketProfile(payload: any) {
    return this.appService.postDataByHttp(`api/customer-markets/PostCreateMarketProfile`, payload);
  }

  get_api_dashboard_user_userId_coins(userId: any) {
    return this.appService.getDataByHttp(`api/dashboard/user/${userId}/coins`);
  }

  get_api_dashboard_user_userId_wallet(userId: any) {
    return this.appService.getDataByHttp(`api/dashboard/user/${userId}/wallet`);
  }

  get_api_dashboard_user_userId_balance(userId: any) {
    return this.appService.getDataByHttp(`api/dashboard/user/${userId}/balance`);
  }

  get_api_dashboard_news() {
    return this.appService.getDataByHttp(`api/dashboard/news`);
  }

  get_Global_GetGenders() {
    return this.appService.getDataByHttp(`Global/GetGenders`);
  }

  get_Global_GetLanguages() {
    return this.appService.getDataByHttp(`Global/GetLanguages`);
  }

  get_Global_GetCryptoCurrencies() {
    return this.appService.getDataByHttp(`Global/GetCryptoCurrencies`);
  }

  get_Global_GetSearchTypes() {
    return this.appService.getDataByHttp(`Global/GetSearchTypes`);
  }

  get_Global_GetSearchLanguageTypes() {
    return this.appService.getDataByHttp(`Global/GetSearchLanguageTypes`);
  }

  get_Global_GetUserLimits() {
    return this.appService.getDataByHttp(`Global/GetUserLimits`);
  }

  get_Global_GetUserLevels() {
    return this.appService.getDataByHttp(`Global/GetUserLevels`);
  }

  get_Global_GetLimitTypes() {
    return this.appService.getDataByHttp(`Global/GetLimitTypes`);
  }

  get_Global_GetLimitFrequencies() {
    return this.appService.getDataByHttp(`Global/GetLimitFrequencies`);
  }

  get_Global_GetPaymentSources() {
    return this.appService.getDataByHttp(`Global/GetPaymentSources`);
  }

  get_Global_GetBankAccountTypes() {
    return this.appService.getDataByHttp(`Global/GetBankAccountTypes`);
  }

  get_Global_GetQuickActionCartTypes() {
    return this.appService.getDataByHttp(`Global/GetQuickActionCartTypes`);
  }

  get_Global_GetQuickActionServiceTypes() {
    return this.appService.getDataByHttp(`Global/GetQuickActionServiceTypes`);
  }

  get_Global_GetFundingOptions() {
    return this.appService.getDataByHttp(`Global/GetFundingOptions`);
  }

  get_Global_GetSystemStatus() {
    return this.appService.getDataByHttp(`Global/GetSystemStatus`);
  }

  get_Global_GetAppConfig() {
    return this.appService.getDataByHttp(`Global/GetAppConfig`);
  }

  get_Global_GetAppVersion() {
    return this.appService.getDataByHttp(`Global/GetAppVersion`);
  }

  get_Global_GetCountries() {
    return this.appService.getDataByHttp(`Global/GetCountries`);
  }

  get_api_Search() {
    return this.appService.getDataByHttp(`api/Search`);
  }

  get_api_Search_suggestions() {
    return this.appService.getDataByHttp(`api/Search/suggestions`);
  }

  get_api_Search_categories() {
    return this.appService.getDataByHttp(`api/Search/categories`);
  }

  get_api_unified_cart() {
    return this.appService.getDataByHttp(`api/unified-cart`);
  }

  post_api_unified_cart(payload: any) {
    return this.appService.postDataByHttp(`api/unified-cart`, payload);
  }

  get_api_unified_cart_cartId(cartId: any) {
    return this.appService.getDataByHttp(`api/unified-cart/${cartId}`);
  }

  put_api_unified_cart_cartId(cartId: any, payload: any) {
    return this.appService.putDataByHttp(`api/unified-cart/${cartId}`, payload);
  }

  delete_api_unified_cart_cartId(cartId: any) {
    return this.appService.deleteDataByHttp(`api/unified-cart/${cartId}`);
  }

  post_api_unified_cart_cartId_items(cartId: any, payload: any) {
    return this.appService.postDataByHttp(`api/unified-cart/${cartId}/items`, payload);
  }

  delete_api_unified_cart_cartId_items_itemId(cartId: any, itemId: any) {
    return this.appService.deleteDataByHttp(`api/unified-cart/${cartId}/items/${itemId}`);
  }

  post_api_unified_cart_cartId_checkout(cartId: any, payload: any) {
    return this.appService.postDataByHttp(`api/unified-cart/${cartId}/checkout`, payload);
  }

  get_api_markets_primary_listings() {
    return this.appService.getDataByHttp(`api/markets/primary/listings`);
  }

  get_api_markets_primary_listings_listingId(listingId: any) {
    return this.appService.getDataByHttp(`api/markets/primary/listings/${listingId}`);
  }

  post_api_markets_primary_purchase(payload: any) {
    return this.appService.postDataByHttp(`api/markets/primary/purchase`, payload);
  }

  get_api_markets_secondary_listings() {
    return this.appService.getDataByHttp(`api/markets/secondary/listings`);
  }

  post_api_markets_secondary_listings(payload: any) {
    return this.appService.postDataByHttp(`api/markets/secondary/listings`, payload);
  }

  get_api_markets_secondary_listings_listingId(listingId: any) {
    return this.appService.getDataByHttp(`api/markets/secondary/listings/${listingId}`);
  }

  put_api_markets_secondary_listings_listingId(listingId: any, payload: any) {
    return this.appService.putDataByHttp(`api/markets/secondary/listings/${listingId}`, payload);
  }

  delete_api_markets_secondary_listings_listingId(listingId: any) {
    return this.appService.deleteDataByHttp(`api/markets/secondary/listings/${listingId}`);
  }

  post_api_markets_secondary_purchase(payload: any) {
    return this.appService.postDataByHttp(`api/markets/secondary/purchase`, payload);
  }

  get_api_markets_search() {
    return this.appService.getDataByHttp(`api/markets/search`);
  }

  get_api_markets_orders() {
    return this.appService.getDataByHttp(`api/markets/orders`);
  }

  get_api_markets_orders_orderId(orderId: any) {
    return this.appService.getDataByHttp(`api/markets/orders/${orderId}`);
  }

  get_api_markets_statistics() {
    return this.appService.getDataByHttp(`api/markets/statistics`);
  }

  get_api_markets_my_listings() {
    return this.appService.getDataByHttp(`api/markets/my-listings`);
  }

  get_api_users_userId(userId: any) {
    return this.appService.getDataByHttp(`api/users/${userId}`);
  }

  put_api_users_userId(userId: any, payload: any) {
    return this.appService.putDataByHttp(`api/users/${userId}`, payload);
  }

  get_api_users_me() {
    return this.appService.getDataByHttp(`api/users/me`);
  }

  put_api_users_me(payload: any) {
    return this.appService.putDataByHttp(`api/users/me`, payload);
  }

  post_api_users_userId_change_password(userId: any, payload: any) {
    return this.appService.postDataByHttp(`api/users/${userId}/change-password`, payload);
  }

  post_api_users_me_change_password(payload: any) {
    return this.appService.postDataByHttp(`api/users/me/change-password`, payload);
  }

  get_api_wallets_balances() {
    return this.appService.getDataByHttp(`api/wallets/balances`);
  }

  get_api_wallets_walletId_balance(walletId: any) {
    return this.appService.getDataByHttp(`api/wallets/${walletId}/balance`);
  }

  get_api_wallets_transactions() {
    return this.appService.getDataByHttp(`api/wallets/transactions`);
  }

  get_api_wallets_walletId_transactions(walletId: any) {
    return this.appService.getDataByHttp(`api/wallets/${walletId}/transactions`);
  }

  get_api_wallets_transactions_transactionId(transactionId: any) {
    return this.appService.getDataByHttp(`api/wallets/transactions/${transactionId}`);
  }

  post_api_wallets_transfer(payload: any) {
    return this.appService.postDataByHttp(`api/wallets/transfer`, payload);
  }

  post_api_wallets_withdraw(payload: any) {
    return this.appService.postDataByHttp(`api/wallets/withdraw`, payload);
  }

  post_api_wallets_deposit(payload: any) {
    return this.appService.postDataByHttp(`api/wallets/deposit`, payload);
  }

  post_api_wallets_deposit_pre_validate(payload: any) {
    return this.appService.postDataByHttp(`api/wallets/deposit/pre-validate`, payload);
  }

  post_v2026_accounts_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/accounts/blueprint`, payload);
  }
  post_v2026_create_cart(payload: any) {
    return this.appService.postDataByHttp(`v2026/cart`, payload);
  }
  get_v2026_get_cart() {
    return this.appService.getDataByHttp(`v2026/cart`);
  }
   post_v2026_add_cart_items(payload: any,cartId:any) {
    return this.appService.postDataByHttp(`v2026/cart/${cartId}/items`, payload);
  }

  get_v2026_accounts_blueprint_blueprintId_status(blueprintId: any) {
    return this.appService.getDataByHttp(`v2026/accounts/blueprint/${blueprintId}/status`);
  }

  get_v2026_accounts_blueprints() {
    return this.appService.getDataByHttp(`v2026/accounts/blueprints`);
  }

  post_v2026_accounts_upgrade(payload: any) {
    return this.appService.postDataByHttp(`v2026/accounts/upgrade`, payload);
  }

  post_v2026_auth_register(payload: any) {
    return this.appService.postDataByHttp(`v2026/auth/register`, payload);
  }

  get_v2026_auth_me() {
    return this.appService.getDataByHttp(`v2026/auth/me`);
  }

  post_v2026_auth_profile(payload: any) {
    return this.appService.postDataByHttp(`v2026/auth/profile`, payload);
  }

  put_v2026_auth_profile(payload: any) {
    return this.appService.putDataByHttp(`v2026/auth/profile`, payload);
  }

  post_v2026_auth_refresh(payload: any) {
    return this.appService.postDataByHttp(`v2026/auth/refresh`, payload);
  }

  post_v2026_auth_logout(payload: any) {
    return this.appService.postDataByHttp(`v2026/auth/logout`, payload);
  }

  post_v2026_auth_token_validate(payload: any) {
    return this.appService.postDataByHttp(`v2026/auth/token/validate`, payload);
  }

  get_v2026_auth_status() {
    return this.appService.getDataByHttp(`v2026/auth/status`);
  }

  post_v2026_deposits_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/deposits/blueprint`, payload);
  }

  get_v2026_deposits_blueprint_blueprintId_status(blueprintId: any) {
    return this.appService.getDataByHttp(`v2026/deposits/blueprint/${blueprintId}/status`);
  }

  get_v2026_portfolio_balance(currency) {
    return this.appService.getDataByHttp(`v2026/portfolio/balance?currency=${currency}`);
  }

  get_v2026_portfolio_tokens() {
    return this.appService.getDataByHttp(`v2026/portfolio/tokens`);
  }
  get_v2026_market_featured(page) {
    return this.appService.getDataByHttp(`v2026/market/featured?limit=${page}`);
  }

  get_v2026_portfolio_assets() {
    return this.appService.getDataByHttp(`v2026/portfolio/assets`);
  }

  get_v2026_portfolio_balance_tokenId(tokenId: any) {
    return this.appService.getDataByHttp(`v2026/portfolio/balance/${tokenId}`);
  }

  get_v2026_portfolio_history() {
    return this.appService.getDataByHttp(`v2026/portfolio/history`);
  }

  get_v2026_portfolio_performance() {
    return this.appService.getDataByHttp(`v2026/portfolio/performance`);
  }

  get_v2026_portfolio_currencies() {
    return this.appService.getDataByHttp(`v2026/portfolio/currencies`);
  }

  get_v2026_portfolio_fx_rates() {
    return this.appService.getDataByHttp(`v2026/portfolio/fx-rates`);
  }

  post_v2026_swaps_quote(payload: any) {
    return this.appService.postDataByHttp(`v2026/swaps/quote`, payload);
  }

  post_v2026_swaps_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/swaps/blueprint`, payload);
  }

  get_v2026_swaps_blueprint_blueprintId_status(blueprintId: any) {
    return this.appService.getDataByHttp(`v2026/swaps/blueprint/${blueprintId}/status`);
  }

  post_v2026_sweeps_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/sweeps/blueprint`, payload);
  }

  get_v2026_sweeps_blueprint_blueprintId_status(blueprintId: any) {
    return this.appService.getDataByHttp(`v2026/sweeps/blueprint/${blueprintId}/status`);
  }

  get_v2026_sweeps_by_tx_txHash(txHash: any) {
    return this.appService.getDataByHttp(`v2026/sweeps/by-tx/${txHash}`);
  }

  post_v2026_transfers_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/transfers/blueprint`, payload);
  }

  get_v2026_transfers_blueprint_blueprintId_status(blueprintId: any) {
    return this.appService.getDataByHttp(`v2026/transfers/blueprint/${blueprintId}/status`);
  }

  post_v2026_withdrawals_crypto_quote(payload: any) {
    return this.appService.postDataByHttp(`v2026/withdrawals/crypto/quote`, payload);
  }

  post_v2026_withdrawals_crypto_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/withdrawals/crypto/blueprint`, payload);
  }

  post_v2026_withdrawals_crypto_blueprint_blueprintId_confirm(blueprintId: any, payload: any) {
    return this.appService.postDataByHttp(`v2026/withdrawals/crypto/blueprint/${blueprintId}/confirm`, payload);
  }

  post_v2026_withdrawals_fiat_blueprint(payload: any) {
    return this.appService.postDataByHttp(`v2026/withdrawals/fiat/blueprint`, payload);
  }

  get_v2026_withdrawals_blueprint_blueprintId_status(blueprintId: any) {
    return this.appService.getDataByHttp(`v2026/withdrawals/blueprint/${blueprintId}/status`);
  }

  /* ===== NEW v2026 MARKET ENDPOINTS ===== */

// Primary market listings (with query params)
get_v2026_market_primary_listings(category: string = 'tokens', page: number = 1, pageSize: number = 20) {
  return this.appService.getDataByHttp(
    `v2026/market/primary/listings?category=${category}&page=${page}&pageSize=${pageSize}`
  );
}

// Single primary listing
get_v2026_market_primary_listings_listingId(listingId: any) {
  return this.appService.getDataByHttp(
    `v2026/market/primary/listings/${listingId}`
  );
}

// Secondary market listings (with query params)
get_v2026_market_secondary_listings(category: string = 'tokens', sellerId?: string) {
  let url = `v2026/market/secondary/listings?category=${category}`;
  if (sellerId) {
    url += `&sellerId=${sellerId}`;
  }
  return this.appService.getDataByHttp(url);
}

// Single secondary listing
get_v2026_market_secondary_listings_listingId(listingId: any) {
  return this.appService.getDataByHttp(
    `v2026/market/secondary/listings/${listingId}`
  );
}

// Market statistics
get_v2026_market_statistics(marketType: string = 'Primary', period: string = '24h') {
  return this.appService.getDataByHttp(
    `v2026/market/statistics?marketType=${marketType}&period=${period}`
  );
}
getFirstCartId() {
  return this.get_v2026_get_cart().pipe(
    map((carts: any) => carts.data && carts.data.length ? carts.data[0] : null)
  );
}
}