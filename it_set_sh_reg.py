def decode_it_set_sh_reg(header, payload):
    base_reg = payload[0] & 0xFFFF
    return {'sh_reg': base_reg, 'values': payload[1:]}
