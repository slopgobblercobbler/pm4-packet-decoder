def decode_it_draw_index_auto(header, payload):
    return {'count': payload[0], 'control': payload[1]}
