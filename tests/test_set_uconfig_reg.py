import json
import os
import unittest

class TestSetUconfigReg(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_set_uconfig_reg.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_registers(self):
        self.assertEqual(self.data['IT_SET_UCONFIG_REG'], 0x79)
        self.assertEqual(self.data['UCONFIG_REG_BASE'], 0xC000)

if __name__ == '__main__':
    unittest.main()
