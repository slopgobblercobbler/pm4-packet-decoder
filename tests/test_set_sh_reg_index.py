import json
import os
import unittest

class TestSetShRegIndex(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_set_sh_reg_index.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_indexed_reg(self):
        self.assertEqual(self.data['IT_SET_SH_REG_INDEX'], 0x9B)

if __name__ == '__main__':
    unittest.main()
