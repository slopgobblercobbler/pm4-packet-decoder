def decode_it_index_type(header, payload):
    return {'index_type': payload[0] & 0x7}
