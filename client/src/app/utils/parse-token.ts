import {jwtDecode} from 'jwt-decode';

interface TokenParsedData {
  exp: number;
  token_type: 'access' | 'refresh'
}

export function parseToken<T = TokenParsedData>(token: string): T {
  return jwtDecode<T>(token)
}

