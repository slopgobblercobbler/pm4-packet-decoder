import json
import os
import unittest

class TestPm4ContextControl(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_context_control.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_context_ctrl(self):
        self.assertEqual(self.data['opcode'], 0x28)
        self.assertEqual(self.data['name'], 'IT_CONTEXT_CONTROL')

if __name__ == '__main__':
    unittest.main()
