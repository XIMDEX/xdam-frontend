export interface Settings {
    token: string;
    base_url: string;
    endpoints: { SettingsEdpoint };
}

export interface SettingsEndpoint {
    get?: string;
    post?: string;
    delete: string;
}
