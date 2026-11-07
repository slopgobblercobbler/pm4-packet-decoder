def decode_it_clear_state(header, payload):
    return {'clear_mode': payload[0] if payload else 0}
