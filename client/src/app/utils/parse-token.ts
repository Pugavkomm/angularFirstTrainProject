import {jwtDecode} from 'jwt-decode';

interface TokenParsedData {
  exp: number;
  token_type: 'access' | 'refresh'
}

export function parseToken(token: string): TokenParsedData {
  return jwtDecode<TokenParsedData>(token )
}

