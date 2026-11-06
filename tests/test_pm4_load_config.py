import json
import os
import unittest

class TestPm4LoadConfig(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_load_config_reg.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_load_config(self):
        self.assertEqual(self.data['opcode'], "IT_LOAD_CONFIG_REG")
        self.assertEqual(self.data['base_address_bits'], 48)

if __name__ == '__main__':
    unittest.main()
