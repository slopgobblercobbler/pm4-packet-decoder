def decode_it_mem_write(header, payload):
    return {'addr_lo': payload[0], 'addr_hi': payload[1], 'data': payload[2:]}
