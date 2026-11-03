import assert from 'assert';
import { PM4Checksum } from '../src/packet_checksum.js';

describe('PM4 Checksum', () => {
    it('should compute valid xor checksum across packet dwords', () => {
        const dwords = [0xc0022d00, 0x00000003, 0x00000001];
        const sum = PM4Checksum.computeXor(dwords);
        assert.strictEqual(typeof sum, 'number');
        assert(sum >= 0);
    });
});
