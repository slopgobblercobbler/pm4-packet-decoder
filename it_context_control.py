def decode_it_context_control(header, payload):
    return {'load_enable': payload[0], 'shadow_enable': payload[1]}
