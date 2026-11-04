import json
import os
import unittest

class TestType0Packets(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_type0_packets.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_masks(self):
        self.assertEqual(self.data['PM4_TYPE_0_HEADER_MASK'], 0xC0000000)
        self.assertEqual(self.data['PM4_TYPE_0_COUNT_SHIFT'], 16)

if __name__ == '__main__':
    unittest.main()
