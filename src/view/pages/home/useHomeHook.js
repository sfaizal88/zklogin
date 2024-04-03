/**
 * 
 * Home hook component
 * @author - NA 
 * @date - 26th March, 2024
 * 
 */
import {padString, toCircomBigIntBytes} from '../../../utils';
import * as jose from 'jose';
// import jose from 'node-jose';

export default function useHomeHook() {
    const jwtSignature =
        "NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ";
    const salt = "a677999396dc49a28ad6c9c242719bb3";

    /* const fetchGooglePublicKey = async () => {
        try {
            // Fetch Google's public keys
            const jwtToken = localStorage.getItem("access_token");
            const response = await fetch('https://www.googleapis.com/oauth2/v3/certs');
            const keys = await response.json();
            
            // Extract the key ID (kid) from the JWT header
            const jwtHeader = jose.JWS.decode(jwtToken).header;
            const kid = jwtHeader.kid;
            // Find the matching key from Google's public keys
            const googlePublicKey = keys[kid];

            // Convert the key to a JWK (JSON Web Key) object
            const jwk = await jose.JWK.asKey(googlePublicKey);
            console.log("jwk: ", jwk);
        } catch (error) {
            console.error('Error fetching Google public key:', error);
        }
    } */

    const generateInput = async () => {
        const JWKS = jose.createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
        // fetchGooglePublicKey();
        const jwtToken = localStorage.getItem("access_token");
        const { payload, protectedHeader } = await jose.jwtVerify(jwtToken, JWKS);
        console.log("payload: ", payload);
        console.log("protectedHeader: ", protectedHeader);
        /*const signatureBigInt = BigInt(
            "0x" + Buffer.from(jwtSignature, "base64").toString("hex")
        );
        const pubKeyData = pki.publicKeyFromPem(publicKeyPem.toString());
        const pubkeyBigInt = BigInt(pubKeyData.n.toString());

        const input = {
            jwt: padString(jwt, 512),
            signature: toCircomBigIntBytes(signatureBigInt),
            pubkey: toCircomBigIntBytes(pubkeyBigInt),
            salt: padString(salt, 32),
        };
        setInputResult(input); */
    }

    return {
        generateInput
    }
}