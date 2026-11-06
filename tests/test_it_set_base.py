import json
import os
import unittest

class TestItSetBase(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_set_base.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_set_base(self):
        self.assertEqual(self.data['opcode_id'], "0x11")
        self.assertTrue(self.data['supports_64bit_gpu_va'])

if __name__ == '__main__':
    unittest.main()
