{ "tx": { "_attributes": { "sourceAccount": { "_switch": { "name": "publicKeyTypeEd25519", "value": 0 }, "_arm": "ed25519", "_armType": { "_length": 32, "_padding": 0 }, "_value": { "type": "Buffer", "data": [129, 115, 236, 239, 109, 34, 66, 138, 224, 207, 174, 245, 105, 213, 247, 107, 102, 157, 0, 8, 164, 58, 34, 206, 169, 96, 55, 238, 118, 245, 204, 8] } }, "fee": 100, "seqNum": { "low": 847, "high": 17397369, "unsigned": true }, "memo": { "_switch": { "name": "memoNone", "value": 0 }, "_arm": {}, "_armType": {} }, "ext": { "_switch": 0, "_arm": {}, "_armType": {} }, "operations": [{ "_attributes": { "body": { "_switch": { "name": "createPassiveOffer", "value": 4 }, "_arm": "createPassiveOfferOp", "_value": { "_attributes": { "selling": { "_switch": { "name": "assetTypeCreditAlphanum4", "value": 1 }, "_arm": "alphaNum4", "_value": { "_attributes": { "assetCode": "SDA\u0000", "issuer": { "_switch": { "name": "publicKeyTypeEd25519", "value": 0 }, "_arm": "ed25519", "_armType": { "_length": 32, "_padding": 0 }, "_value": { "type": "Buffer", "data": [93, 118, 216, 193, 15, 228, 109, 182, 168, 7, 221, 174, 179, 233, 68, 101, 120, 113, 74, 166, 205, 128, 69, 36, 43, 33, 121, 71, 96, 121, 118, 168] } } } } }, "buying": { "_switch": { "name": "assetTypeCreditAlphanum4", "value": 1 }, "_arm": "alphaNum4", "_value": { "_attributes": { "assetCode": "BCNY", "issuer": { "_switch": { "name": "publicKeyTypeEd25519", "value": 0 }, "_arm": "ed25519", "_armType": { "_length": 32, "_padding": 0 }, "_value": { "type": "Buffer", "data": [68, 220, 4, 224, 3, 199, 42, 110, 136, 61, 239, 9, 159, 25, 172, 130, 144, 163, 152, 163, 109, 118, 41, 33, 19, 198, 121, 215, 17, 255, 77, 230] } } } } }, "amount": { "low": 93000000, "high": 0, "unsigned": false }, "price": { "_attributes": { "n": 107527, "d": 1000000 } } } } } } }] } }, "source": "GCAXH3HPNUREFCXAZ6XPK2OV65VWNHIABCSDUIWOVFQDP3TW6XGAQNDY", "fee": 100, "_memo": { "_switch": { "name": "memoNone", "value": 0 }, "_arm": {}, "_armType": {} }, "sequence": "74721130891445071", "operations": [{ "type": "createPassiveOffer", "selling": { "code": "SDA", "issuer": "GBOXNWGBB7SG3NVIA7O25M7JIRSXQ4KKU3GYARJEFMQXSR3APF3KRI6S" }, "buying": { "code": "BCNY", "issuer": "GBCNYBHAAPDSU3UIHXXQTHYZVSBJBI4YUNWXMKJBCPDHTVYR75G6NFHD" }, "amount": "9.3", "price": "0.107527" }], "signatures": [{ "_attributes": { "hint": { "type": "Buffer", "data": [118, 245, 204, 8] }, "signature": { "type": "Buffer", "data": [128, 171, 172, 65, 27, 131, 157, 226, 213, 107, 109, 8, 78, 190, 209, 35, 175, 145, 83, 72, 247, 129, 198, 186, 38, 59, 208, 79, 126, 111, 55, 253, 108, 64, 172, 112, 88, 109, 98, 17, 136, 113, 145, 222, 193, 14, 218, 208, 159, 22, 144, 55, 115, 231, 49, 219, 82, 166, 155, 171, 223, 17, 218, 12] } } }] }