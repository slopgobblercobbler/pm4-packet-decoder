import json
import os
import unittest

class TestItStrmoffsetAdd(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_strmoffset_add.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_strmoffset_add(self):
        self.assertEqual(self.data['opcode_id'], "0x33")
        self.assertTrue(self.data['supports_offset_accumulator'])

if __name__ == '__main__':
    unittest.main()
