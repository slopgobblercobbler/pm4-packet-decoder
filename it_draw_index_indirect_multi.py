def decode_it_draw_index_indirect_multi(header, payload):
    return {'offset': payload[0], 'base': payload[1], 'count': payload[2], 'stride': payload[3]}
