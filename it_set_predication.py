def decode_it_set_predication(header, payload):
    return {'addr_lo': payload[0], 'addr_hi': payload[1], 'flags': payload[2]}
