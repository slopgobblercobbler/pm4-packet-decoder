def decode_it_acquire_mem(header, payload):
    return {'engine': (payload[0] >> 31) & 1, 'flags': payload[0] & 0x7FFFFFFF}
