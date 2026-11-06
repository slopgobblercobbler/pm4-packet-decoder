def decode_it_set_sh_reg_offset(header, payload):
    return {'sh_reg': payload[0] & 0xFFFF, 'offset': payload[1]}
