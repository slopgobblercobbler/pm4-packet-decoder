import json
import os
import unittest

class TestItLoadShReg(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_load_sh_reg.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_load_sh_reg(self):
        self.assertEqual(self.data['opcode_id'], "0x5F")
        self.assertTrue(self.data['supports_dma_load'])

if __name__ == '__main__':
    unittest.main()
