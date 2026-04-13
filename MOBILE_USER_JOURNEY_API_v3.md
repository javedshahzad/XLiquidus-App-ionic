# Mobile User Journey — v2026 API Reference

**Base URL**: `https://mobile-api.uat.xliquidus.com`
**Auth**: All endpoints (except where noted `[Anonymous]`) require `Authorization: Bearer <access_token>` obtained via Logto PKCE flow.

---

## Phase 1: Authentication & Provisioning

The user opens the app, authenticates via Logto (PKCE), and registers on the platform.

### 1.1 Validate Token

Confirm the Logto JWT is valid and extract user identity.

```
POST /v2026/auth/token/validate
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "valid": true,
  "tokenType": "user",
  "user": {
    "id": "logto_abc123",
    "email": "alice@example.com",
    "firstName": "Alice",
    "lastName": "Smith",
    "name": "Alice Smith",
    "role": "User"
  }
}
```

---

### 1.2 Get Current User (`/me`)

Check if this Logto user has completed platform registration. The `isRegistered` / `registrationRequired` flags drive the mobile app's routing logic.

```
GET /v2026/auth/me
Authorization: Bearer <access_token>
```

**Alias**: `GET /v2026/auth/profile` returns the same response. Use either endpoint interchangeably.

**Response — Registered User** `200 OK`
```json
{
  "id": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "email": "alice@example.com",
  "name": "Alice Smith",
  "roles": ["User"],
  "isAuthenticated": true,
  "lastLogin": "2026-02-15T18:30:00Z",
  "avatar": "https://ui-avatars.com/api/?name=Alice+Smith&background=random",
  "isRegistered": true,
  "registrationRequired": false,
  "message": null
}
```

**Response — Unregistered User** `200 OK`
```json
{
  "id": "logto_abc123",
  "email": "alice@example.com",
  "name": "Alice Smith",
  "roles": [],
  "isAuthenticated": true,
  "lastLogin": "2026-02-15T18:30:00Z",
  "avatar": "https://ui-avatars.com/api/?name=Alice+Smith&background=random",
  "isRegistered": false,
  "registrationRequired": true,
  "message": "Please complete your registration to access all features."
}
```

**Mobile App Logic**:
- If `isRegistered == true` → proceed to Lobby (Phase 2)
- If `registrationRequired == true` → show registration form, call `POST /register`

---

### 1.2b Auth Status

Quick health-check that confirms the user's JWT is valid and returns basic identity info.

```
GET /v2026/auth/status
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "isAuthenticated": true,
  "userId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "email": "alice@example.com",
  "roles": ["User"]
}
```

---

### 1.3 Register

Create the platform user account. Requires a valid Logto JWT — the `sub` claim is used as the Logto user ID, and `email` is read from the JWT.

```
POST /v2026/auth/register
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "phoneNumber": "+15551234567",
  "country": "US",
  "city": "New York",
  "preferredLanguage": "en",
  "preferredCurrency": "USD",
  "acceptTerms": true,
  "acceptPrivacyPolicy": true
}
```

**Response** `201 Created`
```json
{
  "success": true,
  "message": "Registration successful. Your account is being set up.",
  "userId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "logtoUserId": "logto_abc123",
  "email": "alice@example.com",
  "name": "Alice Smith",
  "createdAt": "2026-02-15T18:30:00Z",
  "requiresEmailVerification": false,
  "metadata": {
    "source": "mobile_app",
    "registrationMethod": "logto_pkce",
    "eventDriven": true
  }
}
```

**Error — Duplicate** `409 Conflict`
```json
{
  "success": false,
  "message": "User account already exists. Please login instead."
}
```

---

### 1.4 Create Account Blueprint

After registration, the app creates a blockchain account (wallet + TigerBeetle ledger accounts).

```
POST /v2026/accounts/blueprint
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "accountType": "standard",
  "networks": ["Ethereum", "Polygon"],
  "currencies": ["ETH", "USDC", "MATIC"],
  "label": "My Primary Wallet"
}
```

**Response** `202 Accepted`
```json
{
  "blueprintId": "bp_account_logto_abc123_1708022400",
  "userId": "logto_abc123",
  "accountType": "standard",
  "label": "My Primary Wallet",
  "state": "kyc_completed",
  "stateDescription": "KYC verification completed",
  "isMultiSig": false,
  "multiSigTier": null,
  "created": "2026-02-15T18:30:00Z",
  "correlationId": "corr-uuid-here",
  "message": "Account creation initiated. Check status endpoint for progress."
}
```

**Poll Status**
```
GET /v2026/accounts/blueprint/{blueprintId}/status
```

---

## Phase 2: Lobby & Dashboard

After registration, the user lands on the Lobby. This phase shows their portfolio balance and featured marketplace listings.

### 2.1 Get Portfolio Balance

Aggregated value of all fiat accounts + token holdings, converted to the user's preferred currency.

```
GET /v2026/portfolio/balance?currency=USD
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "totalValueUSD": 12547.83,
  "totalValue": 12547.83,
  "currency": "USD",
  "exchangeRate": 1.0,
  "assetCount": 4,
  "assets": [
    {
      "asset": "USD",
      "assetType": "fiat",
      "name": "Fiat Account",
      "balance": 5000.00,
      "priceUSD": 1.0,
      "valueUSD": 5000.00,
      "valueInCurrency": 5000.00,
      "change24h": null,
      "accountId": "acct-uuid-here"
    },
    {
      "asset": "ETH",
      "assetType": "token",
      "name": "Ethereum",
      "balance": 2.5,
      "priceUSD": 2500.00,
      "valueUSD": 6250.00,
      "valueInCurrency": 6250.00,
      "change24h": 3.2,
      "network": "Ethereum",
      "tokenId": "token-uuid"
    },
    {
      "asset": "USDC",
      "assetType": "token",
      "name": "USD Coin",
      "balance": 1200.00,
      "priceUSD": 1.00,
      "valueUSD": 1200.00,
      "valueInCurrency": 1200.00,
      "change24h": 0.01,
      "network": "Polygon"
    },
    {
      "asset": "MATIC",
      "assetType": "token",
      "name": "Polygon",
      "balance": 122.29,
      "priceUSD": 0.80,
      "valueUSD": 97.83,
      "valueInCurrency": 97.83,
      "change24h": -1.5,
      "network": "Polygon"
    }
  ],
  "lastUpdated": "2026-02-15T18:35:00Z"
}
```

**Other Portfolio Endpoints**:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2026/portfolio/tokens` | List token holdings |
| GET | `/v2026/portfolio/assets` | List all assets |
| GET | `/v2026/portfolio/balance/{tokenId}` | Single token balance |
| GET | `/v2026/portfolio/history?limit=50` | Transaction history |
| GET | `/v2026/portfolio/performance` | Performance metrics |
| GET | `/v2026/portfolio/currencies` | Supported display currencies |
| GET | `/v2026/portfolio/fx-rates` | Current FX rates from USD |

---

### 2.2 Get Featured Market Listings

Curated primary-market listings for the lobby dashboard. No auth required.

```
GET /v2026/market/featured?limit=10
```
`[Anonymous]`

**Response** `200 OK`
```json
{
  "listings": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "QuantumGold Token",
      "description": "Asset-backed gold token, 1:1 with physical reserves",
      "marketType": "Primary",
      "assetType": "Token",
      "price": 55.00,
      "currency": "USD",
      "status": "Active",
      "sellerName": "QuantumSkyLink",
      "imageUrl": "https://cdn.example.com/qgold.png",
      "createdAt": "2026-02-10T12:00:00Z"
    }
  ],
  "totalCount": 42,
  "page": 1,
  "pageSize": 10
}
```

---

### 2.3 Deposit Funds

Before purchasing, the user may need to fund their account.

**Fiat Deposit (Card)**
```
POST /v2026/deposits/blueprint
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "type": "fiat",
  "amount": 500.00,
  "currency": "USD",
  "paymentMethod": "card",
  "provider": "square"
}
```

**Response** `202 Accepted`
```json
{
  "blueprintId": "bp_fiat_deposit_logto_abc123_1708022500",
  "type": "fiat",
  "state": "initiated",
  "statusUrl": "/v2026/deposits/blueprint/bp_fiat_deposit_logto_abc123_1708022500/status",
  "amount": 500.00,
  "currency": "USD",
  "paymentMethod": "card",
  "provider": "square",
  "instructions": {
    "message": "Fiat deposit initiated. Payment processing will begin shortly.",
    "nextStep": "Poll the status URL for payment link or checkout session details."
  },
  "message": "Deposit initiated. Processing in progress.",
  "createdAt": "2026-02-15T18:40:00Z"
}
```

**Crypto Deposit**
```json
{
  "type": "crypto",
  "amount": 1.0,
  "asset": "ETH",
  "network": "ethereum"
}
```

**Poll Deposit Status**
```
GET /v2026/deposits/blueprint/{blueprintId}/status
```

**Response** `200 OK`
```json
{
  "blueprintId": "bp_fiat_deposit_logto_abc123_1708022500",
  "type": "fiat",
  "state": "completed",
  "amount": 500.00,
  "currency": "USD",
  "paymentMethod": "card",
  "provider": "square",
  "fees": {
    "platformFeeUSD": 5.00,
    "providerFeeUSD": 14.50,
    "totalFeesUSD": 19.50,
    "netCreditedAmount": 480.50
  },
  "payment": {
    "paymentId": "sq_pay_abc123",
    "status": "COMPLETED",
    "amountProcessed": 500.00,
    "receiptUrl": "https://squareup.com/receipt/preview/abc123",
    "processedAt": "2026-02-15T18:41:30Z",
    "settledAt": "2026-02-15T18:41:45Z"
  },
  "isComplete": true,
  "createdAt": "2026-02-15T18:40:00Z",
  "lastUpdatedAt": "2026-02-15T18:41:45Z"
}
```

Valid payment methods: `card`, `apple_pay`, `google_pay`, `pix`

---

## Phase 3: Commerce & Checkout

The user browses, adds items to cart, reviews fees, and checks out.

### 3.1 Search Marketplace

Search across both primary and secondary markets. No auth required.

```
GET /v2026/market/search?query=gold&marketType=Primary&minPrice=10&maxPrice=100&page=1&pageSize=20
```
`[Anonymous]`

**Response** `200 OK`
```json
{
  "primaryResults": {
    "listings": [...],
    "totalCount": 15
  },
  "secondaryResults": {
    "listings": [...],
    "totalCount": 8
  },
  "totalResults": 23,
  "query": "gold",
  "page": 1,
  "pageSize": 20
}
```

**Other Browse Endpoints** `[Anonymous]`:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2026/market/primary/listings?category=tokens&page=1&pageSize=20` | Primary market listings |
| GET | `/v2026/market/primary/listings/{listingId}` | Single primary listing |
| GET | `/v2026/market/secondary/listings?category=tokens&sellerId={guid}` | Secondary market listings |
| GET | `/v2026/market/secondary/listings/{listingId}` | Single secondary listing |
| GET | `/v2026/market/statistics?marketType=Primary&period=24h` | Market stats |

---

### 3.2 Create Cart

```
POST /v2026/cart
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "name": "My Purchase",
  "description": "Gold tokens and collectible",
  "currency": "USD",
  "items": []
}
```

**Response** `201 Created`
```json
{
  "id": "cart-uuid-123",
  "status": "Created",
  "message": "Cart created successfully",
  "timestamp": "2026-02-15T18:45:00Z",
  "cart": {
    "id": "cart-uuid-123",
    "userId": "logto_abc123",
    "name": "My Purchase",
    "currency": "USD",
    "totalValue": 0.00,
    "items": [],
    "status": "Active",
    "createdAt": "2026-02-15T18:45:00Z"
  },
  "isCheckoutReady": false,
  "checkoutIssues": []
}
```

---

### 3.3 Add Items to Cart

```
POST /v2026/cart/{cartId}/items
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request — Primary Market Item**
```json
{
  "listingId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "marketType": 1,
  "quantity": 10,
  "pricePerUnit": 55.00,
  "currency": "USD"
}
```

**Request — Secondary Market Item (P2P)**
```json
{
  "listingId": "f9e8d7c6-b5a4-3210-fedc-ba0987654321",
  "marketType": 2,
  "quantity": 1,
  "pricePerUnit": 120.00,
  "currency": "USD",
  "sellerId": "seller-uuid-here",
  "useEscrow": true,
  "notes": "Please include certificate of authenticity"
}
```

`marketType`: `1` = Primary, `2` = Secondary

**Response** `200 OK` — returns the updated `CartResponse` with all items and market breakdown.

---

### 3.4 Get Checkout Estimate

Preview the full fee breakdown **before** executing checkout. Does not charge anything.

```
POST /v2026/cart/{cartId}/checkout/estimate
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "cartId": "cart-uuid-123",
  "totalItems": 2,
  "subtotal": 670.00,
  "fees": {
    "platformFee": 16.75,
    "escrowFee": 1.20,
    "networkFee": 0.00,
    "processingFee": 19.43,
    "totalFees": 37.38,
    "currency": "USD"
  },
  "grandTotal": 707.38,
  "currency": "USD",
  "isCheckoutReady": true,
  "issues": [],
  "estimatedAt": "2026-02-15T18:50:00Z"
}
```

**Fee Rates**:
- Platform Fee: 2.5% of subtotal
- Escrow Fee: 1% of secondary-market items only
- Processing Fee: 2.9% of subtotal (payment provider)
- Network Fee: blockchain gas (when applicable)

---

### 3.5 Execute Checkout

```
POST /v2026/cart/{cartId}/checkout
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "paymentMethodId": "wallet_usd",
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD58",
  "paymentCurrency": "USD",
  "notes": "Gift order",
  "savePaymentMethod": false,
  "expressCheckout": false,
  "escrowPreferences": {
    "autoReleaseOnDelivery": true,
    "maxEscrowDays": 7,
    "disputeResolution": "Platform"
  }
}
```

**Response** `200 OK`
```json
{
  "id": "cart-uuid-123",
  "status": "CheckedOut",
  "message": "Checkout completed successfully",
  "transactionId": "txn-uuid-456",
  "timestamp": "2026-02-15T18:52:00Z",
  "cart": { ... },
  "marketBreakdown": {
    "primaryMarket": {
      "itemCount": 1,
      "subtotal": 550.00,
      "items": [...]
    },
    "secondaryMarket": {
      "itemCount": 1,
      "subtotal": 120.00,
      "sellerGroups": [
        {
          "sellerId": "seller-uuid",
          "sellerName": "CryptoTrader99",
          "items": [...],
          "escrowStatus": "Locked"
        }
      ]
    },
    "fees": {
      "platformFee": 16.75,
      "escrowFee": 1.20,
      "networkFee": 0.00,
      "processingFee": 19.43,
      "totalFees": 37.38,
      "currency": "USD"
    }
  },
  "isCheckoutReady": false,
  "checkoutIssues": [],
  "warnings": []
}
```

---

### 3.6 Other Cart Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2026/cart` | List all user's carts |
| GET | `/v2026/cart/{cartId}` | Get cart with full breakdown |
| PUT | `/v2026/cart/{cartId}` | Update cart (name, currency) |
| DELETE | `/v2026/cart/{cartId}/items/{itemId}` | Remove item from cart |
| DELETE | `/v2026/cart/{cartId}` | Abandon cart |

**Convenience Routes** (operate on the user's active cart without requiring a `cartId`):

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v2026/cart/items` | Add item to the active cart |
| POST | `/v2026/cart/checkout` | Checkout the active cart |

These convenience routes automatically resolve the user's current active cart, making them ideal for simple single-cart flows in the mobile app.

---

### 3.7 Order History

```
GET /v2026/market/orders?marketType=Primary&status=Completed&page=1&pageSize=20
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "orders": [
    {
      "id": "order-uuid-789",
      "marketType": "Primary",
      "status": "Completed",
      "totalAmount": 550.00,
      "currency": "USD",
      "itemCount": 1,
      "createdAt": "2026-02-15T18:52:00Z",
      "completedAt": "2026-02-15T18:52:30Z"
    }
  ],
  "totalCount": 12,
  "page": 1,
  "pageSize": 20
}
```

**Get Single Order**:
```
GET /v2026/market/orders/{orderId}
```

---

### 3.8 Direct Purchase (No Cart)

For quick single-item purchases without using the cart.

**Primary Market**
```
POST /v2026/market/primary/purchase
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "listingId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "quantity": 5,
  "paymentMethodId": "wallet_usd",
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD58"
}
```

**Secondary Market**
```
POST /v2026/market/secondary/purchase
```

---

## Phase 4: Merchant Onboarding

A user becomes a verified seller by paying the onboarding fee and completing KYC.

### 4.1 Browse Available Markets

```
GET /v2026/merchant/markets
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
[
  {
    "id": "market-uuid-1",
    "name": "Digital Assets Market",
    "description": "Trade tokenized digital assets",
    "category": "Digital",
    "isSubscribed": false,
    "features": ["Basic Trading", "Limit Orders"],
    "logoUrl": "https://cdn.example.com/market-digital.png"
  },
  {
    "id": "market-uuid-2",
    "name": "Collectibles Market",
    "description": "Buy and sell verified collectibles",
    "category": "Collectibles",
    "isSubscribed": false,
    "features": ["Escrow Protection", "Authentication"],
    "logoUrl": "https://cdn.example.com/market-collectibles.png"
  }
]
```

---

### 4.2 View Subscription Plans

```
GET /v2026/merchant/markets/{marketId}/plans
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
[
  {
    "id": "plan-basic",
    "name": "Basic Seller",
    "description": "List up to 10 items per month",
    "price": 25.00,
    "currency": "USD",
    "billingPeriod": "Monthly",
    "features": ["10 listings/month", "Standard support"],
    "isPopular": false
  },
  {
    "id": "plan-pro",
    "name": "Pro Seller",
    "description": "Unlimited listings with analytics",
    "price": 99.00,
    "currency": "USD",
    "billingPeriod": "Monthly",
    "features": ["Unlimited listings", "Analytics dashboard", "Priority support"],
    "isPopular": true
  }
]
```

---

### 4.3 Start Onboarding (Pay Fee)

Creates a `FiatDepositBlueprint` for the subscription plan price. The user pays, then completes KYC to become verified.

```
POST /v2026/merchant/onboard
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "marketId": "market-uuid-1",
  "subscriptionPlanId": "plan-pro",
  "paymentMethod": "card",
  "currency": "USD"
}
```

**Response** `202 Accepted`
```json
{
  "blueprintId": "bp_fiat_deposit_logto_abc123_1708023000",
  "state": "initiated",
  "statusUrl": "/v2026/deposits/blueprint/bp_fiat_deposit_logto_abc123_1708023000/status",
  "onboardingFee": 99.00,
  "currency": "USD",
  "marketId": "market-uuid-1",
  "subscriptionPlanId": "plan-pro",
  "message": "Onboarding fee payment initiated. Complete payment and KYC to become a verified seller.",
  "createdAt": "2026-02-15T19:00:00Z"
}
```

**Next Steps**:
1. Poll `statusUrl` for payment completion
2. Complete KYC (Phase 4.5 below)
3. Create market profile (Phase 4.4)

---

### 4.4 Create Market Profile

```
POST /v2026/merchant/profile
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "marketId": "market-uuid-1",
  "displayName": "Alice's Token Shop",
  "description": "Premium digital assets and tokens",
  "preferredCurrency": "USD",
  "tradingPreferences": {
    "enableAlerts": true,
    "maxRiskLevel": "Medium"
  }
}
```

**Response** `201 Created`
```json
{
  "userId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "marketId": "market-uuid-1",
  "displayName": "Alice's Token Shop",
  "description": "Premium digital assets and tokens",
  "status": "Active",
  "preferredCurrency": "USD",
  "createdAt": "2026-02-15T19:05:00Z"
}
```

**Get Profile**:
```
GET /v2026/merchant/profile
```

---

### 4.5 KYC — Check Status

```
GET /v2026/kyc/status
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "userId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "status": "pending",
  "level": "Enhanced",
  "isCompleted": false,
  "completedDate": null,
  "expiryDate": null,
  "requiredDocuments": ["government_id", "proof_of_address", "selfie"],
  "submittedDocuments": [],
  "pendingDocuments": ["government_id", "proof_of_address", "selfie"],
  "nextStep": "Submit government-issued photo ID"
}
```

---

### 4.6 KYC — View Requirements

```
GET /v2026/kyc/requirements
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
[
  {
    "id": "req-uuid-1",
    "type": "government_id",
    "title": "Government-Issued Photo ID",
    "description": "Passport, driver's license, or national ID card",
    "status": "Pending",
    "isRequired": true,
    "dueDate": "2026-03-15T00:00:00Z",
    "priority": "High",
    "requiredActions": ["Upload front of document", "Upload back of document"]
  },
  {
    "id": "req-uuid-2",
    "type": "proof_of_address",
    "title": "Proof of Address",
    "description": "Utility bill or bank statement from the last 3 months",
    "status": "Pending",
    "isRequired": true,
    "dueDate": "2026-03-15T00:00:00Z",
    "priority": "High",
    "requiredActions": ["Upload document"]
  },
  {
    "id": "req-uuid-3",
    "type": "selfie",
    "title": "Selfie Verification",
    "description": "Live selfie for facial recognition matching",
    "status": "Pending",
    "isRequired": true,
    "dueDate": "2026-03-15T00:00:00Z",
    "priority": "Medium",
    "requiredActions": ["Take live selfie"]
  }
]
```

---

### 4.7 KYC — Submit Document

```
POST /v2026/kyc/documents
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "documentType": "government_id",
  "fileName": "passport_front.jpg",
  "contentType": "image/jpeg",
  "content": "<base64-encoded-bytes>",
  "metadata": {
    "side": "front",
    "documentCountry": "US"
  }
}
```

**Response** `200 OK`
```json
{
  "documentId": "doc-uuid-123",
  "status": "Submitted",
  "message": "Document submitted successfully. Review typically takes 1-2 business days.",
  "submittedAt": "2026-02-15T19:10:00Z",
  "referenceNumber": "KYC-2026-00456"
}
```

---

### 4.8 KYC — Check Document Status

```
GET /v2026/kyc/documents/{documentId}
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "documentId": "doc-uuid-123",
  "documentType": "government_id",
  "status": "Approved",
  "submittedAt": "2026-02-15T19:10:00Z",
  "reviewedAt": "2026-02-15T20:30:00Z",
  "reviewNotes": null,
  "issues": []
}
```

---

### 4.9 KYC — Dashboard Summary

```
GET /v2026/kyc/summary
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "userId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "overallStatus": "InProgress",
  "complianceScore": 65,
  "totalRequirements": 3,
  "completedRequirements": 1,
  "pendingRequirements": 2,
  "alertsCount": 0,
  "lastUpdated": "2026-02-15T20:30:00Z",
  "quickActions": ["Upload proof of address", "Complete selfie verification"]
}
```

---

### 4.10 KYC — Alerts

```
GET /v2026/kyc/alerts
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
[
  {
    "id": "alert-uuid-1",
    "userId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
    "type": "document_expiring",
    "severity": "Warning",
    "title": "ID Document Expiring Soon",
    "message": "Your government ID expires in 30 days. Please upload a renewed document.",
    "isRead": false,
    "createdAt": "2026-02-15T12:00:00Z",
    "readAt": null,
    "actionRequired": "Upload renewed government ID",
    "actionUrl": "/v2026/kyc/documents"
  }
]
```

**Mark Alert as Read**:
```
PUT /v2026/kyc/alerts/{alertId}/read
```

---

### 4.11 Other Merchant Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2026/merchant/markets/{marketId}` | Get specific market details |
| POST | `/v2026/merchant/subscriptions` | Create a subscription |
| PUT | `/v2026/merchant/subscriptions/{id}/cancel` | Cancel a subscription |

---

## Phase 5: Asset Listing & Escrow

A verified seller lists assets on the secondary market.

### 5.1 Get Listing Fee Quote

Before creating a listing, check fees. Returns the exact cost breakdown.

```
POST /v2026/market/listings/quote
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "amount": 500.00,
  "assetType": "Token",
  "currency": "USD",
  "paymentMethod": "wallet"
}
```

**Response** `200 OK`
```json
{
  "transactionAmount": 500.00,
  "currency": "USD",
  "totalFee": 17.50,
  "netProceeds": 482.50,
  "feeBreakdown": [
    { "feeType": "Platform Fee", "amount": 10.00 },
    { "feeType": "Listing Fee", "amount": 5.00 },
    { "feeType": "Payment Processing", "amount": 2.50 },
    { "feeType": "Network Fee", "amount": 0.00 }
  ],
  "quotedAt": "2026-02-15T19:30:00Z"
}
```

---

### 5.2 Create Secondary Listing

Requires seller permissions (verified via onboarding).

```
POST /v2026/market/secondary/listings
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request**
```json
{
  "title": "100 QuantumGold Tokens",
  "description": "Selling my QuantumGold allocation at a small premium",
  "assetType": "Token",
  "tokenId": "token-uuid-qgold",
  "quantity": 100,
  "pricePerUnit": 57.50,
  "currency": "USD",
  "acceptedPaymentMethods": ["wallet", "card"],
  "expiresInDays": 30
}
```

**Response** `201 Created`
```json
{
  "id": "listing-uuid-new",
  "title": "100 QuantumGold Tokens",
  "marketType": "Secondary",
  "assetType": "Token",
  "price": 57.50,
  "quantity": 100,
  "currency": "USD",
  "status": "Active",
  "sellerId": "d4f5a6b7-c8d9-4e0f-a1b2-c3d4e5f6a7b8",
  "sellerName": "Alice's Token Shop",
  "createdAt": "2026-02-15T19:35:00Z",
  "expiresAt": "2026-03-17T19:35:00Z"
}
```

**Error — Not a Seller** `403 Forbidden`
```
User does not have seller permissions. Please complete seller onboarding.
```

---

### 5.3 Manage My Listings

```
GET /v2026/market/my-listings
Authorization: Bearer <access_token>
```

**Response** `200 OK`
```json
{
  "listings": [
    {
      "id": "listing-uuid-new",
      "title": "100 QuantumGold Tokens",
      "price": 57.50,
      "quantity": 100,
      "status": "Active",
      "views": 24,
      "createdAt": "2026-02-15T19:35:00Z"
    }
  ],
  "totalCount": 1
}
```

---

### 5.4 Update / Delete Listing

**Update**
```
PUT /v2026/market/secondary/listings/{listingId}
Authorization: Bearer <access_token>
Content-Type: application/json
```

```json
{
  "pricePerUnit": 56.00,
  "description": "Price reduced — quick sale!"
}
```

**Delete**
```
DELETE /v2026/market/secondary/listings/{listingId}
Authorization: Bearer <access_token>
```

Returns `204 No Content` on success. Returns `403 Forbidden` if the user doesn't own the listing.

---

## Complete Route Map

| Phase | Prefix | Endpoints | Auth |
|-------|--------|-----------|------|
| **1 — Auth** | `v2026/auth` | `POST /register`, `GET /me`, `GET /profile` (alias), `POST /profile`, `PUT /profile`, `POST /refresh`, `POST /logout`, `POST /token/validate`, `GET /status` | JWT |
| **1 — Accounts** | `v2026/accounts` | `POST /blueprint`, `GET /blueprint/{id}/status`, `GET /blueprints`, `POST /upgrade` | JWT |
| **2 — Portfolio** | `v2026/portfolio` | `GET /balance`, `GET /tokens`, `GET /assets`, `GET /balance/{tokenId}`, `GET /history`, `GET /performance`, `GET /currencies`, `GET /fx-rates` | JWT |
| **2 — Deposits** | `v2026/deposits` | `POST /blueprint`, `GET /blueprint/{id}/status` | JWT |
| **2+3 — Market** | `v2026/market` | `GET /featured`, `GET /search`, `GET /primary/listings`, `GET /primary/listings/{id}`, `POST /primary/purchase`, `GET /secondary/listings`, `GET /secondary/listings/{id}`, `POST /secondary/listings`, `PUT /secondary/listings/{id}`, `DELETE /secondary/listings/{id}`, `POST /secondary/purchase`, `GET /orders`, `GET /orders/{id}`, `GET /statistics`, `GET /my-listings`, `POST /listings/quote` | Mixed |
| **3 — Cart** | `v2026/cart` | `GET /`, `GET /{cartId}`, `POST /`, `PUT /{cartId}`, `POST /{cartId}/items`, `DELETE /{cartId}/items/{itemId}`, `POST /{cartId}/checkout/estimate`, `POST /{cartId}/checkout`, `DELETE /{cartId}`, `POST /items` (convenience), `POST /checkout` (convenience) | JWT |
| **4 — Merchant** | `v2026/merchant` | `POST /onboard`, `GET /profile`, `POST /profile`, `GET /markets`, `GET /markets/{id}`, `GET /markets/{id}/plans`, `POST /subscriptions`, `PUT /subscriptions/{id}/cancel` | JWT |
| **4 — KYC** | `v2026/kyc` | `GET /status`, `GET /requirements`, `POST /documents`, `GET /documents/{id}`, `GET /summary`, `GET /alerts`, `PUT /alerts/{id}/read` | JWT |

**Total**: 52 endpoints across 7 route groups covering all 5 user journey phases.

---

## Error Responses

All endpoints return errors in this shape:

```json
{
  "error": "Human-readable error message"
}
```

| HTTP Status | Meaning |
|-------------|---------|
| `400` | Bad request — invalid input |
| `401` | Unauthorized — missing or invalid JWT |
| `403` | Forbidden — insufficient permissions (e.g., not a verified seller) |
| `404` | Not found — resource doesn't exist |
| `409` | Conflict — duplicate (e.g., re-registration) |
| `500` | Internal server error |

---

## Authentication Flow

```
1. Mobile app opens Logto login (PKCE)
2. User authenticates → receives access_token + refresh_token
3. App calls GET /v2026/auth/me with Bearer token
4. If isRegistered == false → POST /v2026/auth/register
5. All subsequent calls include Authorization: Bearer <access_token>
6. On token expiry → POST /v2026/auth/refresh with refresh_token
```

**Logto Configuration**:
- Tenant: `5r5a7r.logto.app`
- Client ID: `m3xhdl1g7y90m1cj41il3`
- Resource/Audience: `https://mobile.dev.quantumskylink.com`
