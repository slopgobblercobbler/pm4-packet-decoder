// PM4 Packet Payload Integrity Checksum Generator
export class PM4Checksum {
    static computeXor(dwords) {
        let checksum = 0;
        for (const dw of dwords) {
            checksum ^= (dw >>> 0);
        }
        return checksum >>> 0;
    }
}
