def decode_it_set_uconfig_reg_split(header, payload):
    return {'split_reg': payload[0], 'data': payload[1:]}
