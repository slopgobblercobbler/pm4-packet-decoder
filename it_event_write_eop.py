def decode_it_event_write_eop(header, payload):
    return {'event_type': payload[0] & 0x3F, 'addr_lo': payload[1], 'addr_hi': payload[2]}
