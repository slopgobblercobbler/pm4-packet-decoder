def decode_it_dispatch_direct(header, payload):
    return {'dim_x': payload[0], 'dim_y': payload[1], 'dim_z': payload[2]}
