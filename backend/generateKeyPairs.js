/**
 * This module will generate a public and private keypair and save to the secrets directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function genKeyPair() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  // Create the public key file
  fs.writeFileSync(__dirname + "/secrets" + "/pub_key.pem", keyPair.publicKey);

  // Create the private key file
  fs.writeFileSync(
    __dirname + "/secrets" + "/priv_key.pem",
    keyPair.privateKey
  );
}

// Generate the keypair
genKeyPair();
