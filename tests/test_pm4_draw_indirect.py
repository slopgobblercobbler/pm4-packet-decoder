import json
import os
import unittest

class TestPm4DrawIndirect(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_draw_indirect.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_draw(self):
        self.assertEqual(self.data['opcode'], "IT_DRAW_INDIRECT")
        self.assertEqual(self.data['args_size_dwords'], 4)

if __name__ == '__main__':
    unittest.main()
