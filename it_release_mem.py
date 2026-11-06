def decode_it_release_mem(header, payload):
    return {'event_type': payload[0] & 0x3F, 'event_index': (payload[0] >> 8) & 0xF}
