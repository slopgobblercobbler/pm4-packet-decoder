import json
import os
import unittest

class TestItContextControl(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_context_control.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_context_control(self):
        self.assertEqual(self.data['opcode_id'], "0x28")
        self.assertTrue(self.data['supports_per_context_mask'])

if __name__ == '__main__':
    unittest.main()
