// PM4 Command Processor Ring Buffer Allocation & Bounds
export class PM4RingBuffer {
    constructor(capacityDwords = 65536) {
        this.capacity = capacityDwords;
        this.readPtr = 0;
        this.writePtr = 0;
    }

    spaceAvailable() {
        if (this.writePtr >= this.readPtr) {
            return this.capacity - (this.writePtr - this.readPtr) - 1;
        }
        return (this.readPtr - this.writePtr) - 1;
    }

    canWrite(numDwords) {
        return this.spaceAvailable() >= numDwords;
    }

    advanceWrite(numDwords) {
        if (!this.canWrite(numDwords)) {
            throw new Error('RingBuffer overflow');
        }
        this.writePtr = (this.writePtr + numDwords) % this.capacity;
    }
}
