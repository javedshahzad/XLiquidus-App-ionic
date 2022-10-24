enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}

enum localStorageKeys {
    access_token = "access_token",
    communicationAccessKey = "communicationAccessKey"
}

enum CookieKeys {
}

export class AppEnum {
    public EntityOfLocalStorageKeys: typeof localStorageKeys = localStorageKeys;
    public EntityOfCookieKeys: typeof CookieKeys = CookieKeys;
    public EntityOfLogLevel: typeof LogLevel = LogLevel;

}
