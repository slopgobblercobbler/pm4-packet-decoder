def decode_it_copy_data(header, payload):
    return {'src_sel': payload[0] & 0xF, 'dst_sel': (payload[0] >> 8) & 0xF}
