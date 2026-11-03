export interface PM4PacketHeader {
    type: number;
    count: number;
    opcode: number;
    predicate?: boolean;
}

export interface PM4DrawPacket {
    header: PM4PacketHeader;
    indexCount: number;
    instanceCount: number;
    firstIndex: number;
    vertexOffset: number;
}
