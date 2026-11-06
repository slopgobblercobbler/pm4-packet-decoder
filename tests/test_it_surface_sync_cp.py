import json
import os
import unittest

class TestItSurfaceSyncCp(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_surface_sync_cp.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_surface_sync(self):
        self.assertEqual(self.data['opcode_id'], "0x43")
        self.assertEqual(self.data['cb_clean_and_invalidate'], "0x00000001")

if __name__ == '__main__':
    unittest.main()
