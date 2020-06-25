export const storeAccessToken = 'InternetBanking.Regera.AccessToken';
export const storeRefreshToken = 'InternetBanking.Regera.RefreshToken';
export const storeAccount = 'InternetBanking.Regera.Account';

export const accessToken = localStorage.getItem(storeAccessToken);
export const refreshToken = localStorage.getItem(storeRefreshToken);
export const account = localStorage.getItem(storeAccount);