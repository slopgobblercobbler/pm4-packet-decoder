import assert from 'assert';
import opcodes from '../src/it_opcodes.json' assert { type: 'json' };

describe('PM4 IT Opcodes', () => {
    it('should verify draw opcode mappings', () => {
        assert.strictEqual(opcodes.IT_DRAW_INDEX_AUTO, 0x2d);
        assert.strictEqual(opcodes.IT_DRAW_INDEX_2, 0x27);
    });

    it('should verify state clear opcode', () => {
        assert.strictEqual(opcodes.IT_CLEAR_STATE, 0x12);
    });
});
