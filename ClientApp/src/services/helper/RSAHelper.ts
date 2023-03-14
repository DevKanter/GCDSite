
import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root',
})
export class RSAHelper {
  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCx8BzelTE4ifNLNEeiMvMsJlPv
  uGgUUo8VyRgIv74CkN/xJ/MHgNicVkxNLg4Zmww5Qc0/xUwRdwLZUNjMQUihrETy
  MAJtJrntUdyCx98FdzuFiqQlICsaDsp/H8mxkvFEJh5flfZHzFaRVNW99f29Al+q
  1FigbMuRR6e5MwY2ZwIDAQAB
  -----END PUBLIC KEY-----`;

  constructor() { }

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }
}
