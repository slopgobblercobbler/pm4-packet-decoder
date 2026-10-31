// js/binary_reader.js - Bounds-checked binary reader for PM4 command packets

export class BinaryReader {
  /**
   * @param {Uint8Array|ArrayBuffer} buffer
   * @param {number} [byteOffset=0]
   * @param {number} [byteLength]
   * @param {boolean} [littleEndian=true]
   */
  constructor(buffer, byteOffset = 0, byteLength, littleEndian = true) {
    if (buffer instanceof ArrayBuffer) {
      this.buffer = new Uint8Array(buffer, byteOffset, byteLength ?? (buffer.byteLength - byteOffset));
    } else if (buffer instanceof Uint8Array) {
      const start = buffer.byteOffset + byteOffset;
      const len = byteLength ?? (buffer.byteLength - byteOffset);
      this.buffer = new Uint8Array(buffer.buffer, start, len);
    } else {
      throw new TypeError("BinaryReader expects Uint8Array or ArrayBuffer");
    }

    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
    this.offset = 0;
    this.littleEndian = littleEndian;
  }

  get length() {
    return this.buffer.byteLength;
  }

  get remaining() {
    return Math.max(0, this.buffer.byteLength - this.offset);
  }

  isEOF() {
    return this.offset >= this.buffer.byteLength;
  }

  seek(newOffset) {
    if (newOffset < 0 || newOffset > this.buffer.byteLength) {
      throw new RangeError(`Seek offset ${newOffset} out of bounds [0, ${this.buffer.byteLength}]`);
    }
    this.offset = newOffset;
  }

  readUint32(littleEndian = this.littleEndian) {
    if (this.offset + 4 > this.buffer.byteLength) {
      throw new RangeError(`Buffer overrun reading uint32 at offset ${this.offset}`);
    }
    const val = this.view.getUint32(this.offset, littleEndian);
    this.offset += 4;
    return val;
  }

  readUint64(littleEndian = this.littleEndian) {
    if (this.offset + 8 > this.buffer.byteLength) {
      throw new RangeError(`Buffer overrun reading uint64 at offset ${this.offset}`);
    }
    const val = this.view.getBigUint64(this.offset, littleEndian);
    this.offset += 8;
    return val;
  }

  readBytes(count) {
    if (this.offset + count > this.buffer.byteLength) {
      throw new RangeError(`Buffer overrun reading ${count} bytes at offset ${this.offset}`);
    }
    const slice = this.buffer.subarray(this.offset, this.offset + count);
    this.offset += count;
    return new Uint8Array(slice);
  }
}
