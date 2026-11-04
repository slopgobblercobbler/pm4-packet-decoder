import json
import os
import unittest

class TestSetConfigReg(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_set_config_reg.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_config_reg(self):
        self.assertEqual(self.data['IT_SET_CONFIG_REG'], 0x68)
        self.assertEqual(self.data['CONFIG_REG_BASE'], 0x2000)

if __name__ == '__main__':
    unittest.main()
