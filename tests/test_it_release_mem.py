import json
import os
import unittest

class TestItReleaseMem(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_release_mem.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_release_mem(self):
        self.assertEqual(self.data['opcode_id'], "0x3F")
        self.assertEqual(self.data['cache_flush_and_inv_cb'], "0x01")

if __name__ == '__main__':
    unittest.main()
