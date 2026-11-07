def decode_it_cond_write(header, payload):
    return {'poll_space': payload[0], 'func': payload[1]}
