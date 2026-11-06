def decode_it_set_uconfig_reg(header, payload):
    base_reg = payload[0] & 0xFFFF
    return {'reg': base_reg, 'values': payload[1:]}
