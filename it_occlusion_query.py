def decode_it_occlusion_query(header, payload):
    return {'addr': payload[0], 'data': payload[1]}
