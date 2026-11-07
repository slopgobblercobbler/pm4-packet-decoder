def decode_it_wait_reg_mem(header, payload):
    return {'function': payload[0] & 0x7, 'mem_space': (payload[0] >> 4) & 0x3, 'addr': (payload[2] << 32) | payload[1]}
