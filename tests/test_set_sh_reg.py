import json
import os
import unittest

class TestSetShReg(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_set_sh_reg.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_sh_reg(self):
        self.assertEqual(self.data['IT_SET_SH_REG'], 0x76)
        self.assertEqual(self.data['SH_REG_BASE'], 0x2C00)

if __name__ == '__main__':
    unittest.main()
