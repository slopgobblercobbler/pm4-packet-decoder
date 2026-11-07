def decode_it_event_write_eos(header, payload):
    return {'event_type': payload[0] & 0x3F, 'seq_lo': payload[1], 'seq_hi': payload[2]}
