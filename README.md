# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Repo url

* [Azure](https://dev.azure.com/usscyberinc/_git/UC%20XL%20Mobile%20App)

### What is in this

* Ionic 6
* Angular 14
* Capacitor integration



# This is the real key store. you can find it in project root name xliquidus.keystore file.

``
keytool -list -v -keystore xliquidus.keystore -alias xliquidus -storepass xliquidus -keypass xliquidus
``

* keystore=xliquidus.keystore
* keypass=xliquidus
* alias=xliquidus
* password=xliquidus


#### Capacitor OAuth 2 client plugin
* [Capacitor OAuth 2 client plugin](https://github.com/moberwasserlechner/capacitor-oauth2)
## How to install

For Capacitor v4
```bash
npm i @byteowls/capacitor-oauth2
npx cap sync
```
For Capacitor v3 use `3.0.1`
```bash
npm i @byteowls/capacitor-oauth2@3.0.1
npx cap sync
```
For Capacitor v2 use `2.1.0`
```bash
npm i @byteowls/capacitor-oauth2@2.1.0
npx cap sync
```
#### iOS

Open `Info.plist` in XCode by clicking right on that file -> Open as -> Source Code. Note: XCode does not "like" files opened and changed externally.
Please add these lines in you `Info.plist` files to get working login in ios.

```xml
	<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLSchemes</key>
			<array>
				<!-- msauth.BUNDLE_ID -->
				<string>msauth.com.usscyber.xl</string>
			</array>
		</dict>
	</array>
```