def decode_it_draw_index_2(header, payload):
    return {'max_size': payload[0], 'index_base': payload[1], 'count': payload[2]}
