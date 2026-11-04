import json
import os
import unittest

class TestDispatchDirect(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_dispatch_direct.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_offsets(self):
        self.assertEqual(self.data['thread_groups_x_offset'], 0)
        self.assertEqual(self.data['thread_groups_y_offset'], 4)
        self.assertEqual(self.data['thread_groups_z_offset'], 8)

if __name__ == '__main__':
    unittest.main()
