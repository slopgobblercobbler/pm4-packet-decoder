import json
import os
import unittest

class TestPm4SurfaceSync(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_surface_sync.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_sync(self):
        self.assertEqual(self.data['opcode'], "IT_SURFACE_SYNC")
        self.assertEqual(self.data['cb_clean_mask'], "0x02")

if __name__ == '__main__':
    unittest.main()
