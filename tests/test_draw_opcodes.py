import json
import os
import unittest

class TestDrawOpcodes(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_draw_opcodes.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_draw_opcodes(self):
        self.assertEqual(self.data['IT_DRAW_INDEX_AUTO'], 0x2D)
        self.assertEqual(self.data['IT_DRAW_INDIRECT'], 0x24)

if __name__ == '__main__':
    unittest.main()
