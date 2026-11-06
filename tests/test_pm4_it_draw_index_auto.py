import json
import os
import unittest

class TestPm4DrawIndexAuto(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_draw_index_auto.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_draw_spec(self):
        self.assertEqual(self.data['opcode'], 0x2D)
        self.assertEqual(self.data['name'], 'IT_DRAW_INDEX_AUTO')

if __name__ == '__main__':
    unittest.main()
